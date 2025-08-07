/*-------------------------
BOILERPLATE CODE TO SET UP SERVER  
-------------------------------*/
// Load the Express framework to handle web server functions
import express from "express";
// Load pg module to connect with the PostgreSQL database
import pg from "pg";
// Load configuration values (like database credentials) from an external file
import config from "./config.js";
// Create a connection pool to the PostgreSQL database using credentials from config
const db = new pg.Pool({
  connectionString: config.databaseUrl, // The address and password for the database
  ssl: true, // Use secure encrypted connection
});
// Initialize an Express application (your web server)
const app = express();
// This ensures incoming and outgoing data is in JSON format
app.use(express.json());
// Choose a port for the server to listen on
const port = 3000;
// Start the server and log a message to indicate it's running
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
//////////////////////////////////////////////////////////

/* -------------------------
HELPER FUNCTIONS
--------------------------*/

// GET ALL USERS
async function getAllUsers() {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}

//////////////////////////////////////////////////////////////

//GET NEWEST USER
async function getNewestUser() {
  const result = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
  );
  return result.rows;
}
/////////////////////////////////////////////////////

// ADD ONE USER
async function addOneUser(user) {
  const { name, country_name, email, bio } = user;
  await db.query(
    "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4)",
    [name, country_name, email, bio]
  );
}
///////////////////////////////////////////////////////

//UPDATE COUNTRY COUNT
//async function that takes one argument: countryName (e.g., "Japan").
async function updateCountryCount(countryName) {
  //Calls the database using db.query (PostgreSQL connection).await waits for the query to finish and get the result.
  const result = await db.query(
    //Tries to insert a new row with: country_name = the provided name count = 1 (viewed for the first time)

    //If the country_name already exists (i.e. there’s a conflict on that column):Instead of throwing an error, it updates the existing row, increasing the count by 1.

    //After insert or update, this returns the new count value.
    `INSERT INTO country_counts (country_name, count)
      VALUES ($1, 1)
      ON CONFLICT (country_name)
      DO UPDATE SET count = country_counts.count + 1
      RETURNING count`,
    [countryName]
  );
  //Extracts the count from the result and returns it.
  return result.rows[0].count;
}
/////////////////////////////////////////////////////////////

// Get all saved countries
async function getAllSavedCountries() {
  const result = await db.query("SELECT * FROM saved_countries");
  return result.rows;
}
////////////////////////////////////////////////////////

// SAVE ONE COUNTRY (if not already saved)
async function saveOneCountry(countryName) {
  await db.query(
    "INSERT INTO saved_countries (country_name) VALUES ($1) ON CONFLICT (country_name) DO NOTHING",
    [countryName]
  );
}

/* -------------------------
API ENDPOINTS
---------------------------*/

//GET ALL USERS
app.get("/get-all-users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});
////////////////////////////////////////////////////////////////

// GET NEWEST USER
//When a client (like your frontend app) makes a GET request to that URL, this function runs.
app.get("/get-newest-user", async (req, res) => {
  //Calls an async helper function called getNewestUser().This function  runs a SQL query await waits for the result
  const user = await getNewestUser();
  //Sends the user data back to the client as JSON
  res.json(user);
});
////////////////////////////////////////////////////////

//ADD ONE USER
//This creates a POST endpoint at /add-one-user.When a client (like a form or frontend app) sends a POST request to that URL, this function will run.
app.post("/add-one-user", async (req, res) => {
  //req.body contains the data sent by the client (like name, email, etc.).This line stores that user data in a variable called user.
  const user = req.body;
  //This calls the helper function called addOneUser .It passes the user data to that function to save it
  await addOneUser(user);
  // After the user is added, this sends a success message back to the client.
  res.send("Success! User has been added.");
});
////////////////////////////////////////////////////////////////////

// UPDATE ONE COUNTRY COUNT
// This endpoint listens for POST requests at /update-one-country-count
// It expects a JSON body with { "country_name": "France" } or any valid country
app.post("/update-one-country-count", async (req, res) => {
  const { country_name } = req.body;
  // This checks if country_name is missing, undefined, null, or an empty string ("").The ! means “not”, so this condition is true when country_name is not provided.
  if (!country_name) {
    //return res.status(400).json({ error: "country_name is required" });If the check above passes (meaning country_name is missing), then:	It immediately stops the function using return.	It sends back an HTTP 400 Bad Request status code.	The response is JSON that says: { error: "country_name is required" }.
    return res.status(400).json({ error: "country_name is required" });
  }
  // Call the helper function to increment or insert the count
  const newCount = await updateCountryCount(country_name);
  // Send back the updated count in the response
  res.json({ newCount });
});
////////////////////////////////////////////////////////

// GET ALL SAVED COUNTRIES
app.get("/get-all-saved-countries", async (req, res) => {
  const countries = await getAllSavedCountries();
  res.json(countries);
});

///////////////////////////////////////////////////////

// SAVE ONE COUNTRY
app.post("/save-one-country", async (req, res) => {
  const { country_name } = req.body;
  await saveOneCountry(country_name);
  res.send("Success! The country is saved.");
});

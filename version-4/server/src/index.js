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

/* -------------------------
HELPER FUNCTIONS
--------------------------*/

// GET ALL USERS
async function getAllUsers() {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}

//----------------------------------------------------------

//GET NEWEST USER
async function getNewestUser() {
  const result = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
  );
  return result.rows;
}
//------------------------------------------------------------

// ADD ONE USER
async function addOneUser(user) {
  const { name, country_name, email, bio } = user;
  await db.query(
    "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4)",
    [name, country_name, email, bio]
  );
}

//------------------------------------------------------
// Update or insert country count using ON CONFLICT
// This function updates the view count for a country.
// If the country doesn't exist, it inserts it with count = 1.
// If it already exists, it increments the count by 1.
async function updateCountryCount(countryName) {
  const result = await db.query(
    `INSERT INTO country_counts (country_name, count)
      VALUES ($1, 1)
      ON CONFLICT (country_name)
      DO UPDATE SET count = country_counts.count + 1
      RETURNING count
      `,
    [countryName]
  );

  return result.rows[0].count;
}

//-----------------------------------

//------------------------------------------------

/* -------------------------
API ENDPOINTS
---------------------------*/

//GET ALL USERS
app.get("/get-all-users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});
//-------------------------------------------

// GET NEWEST USER
app.get("/get-newest-user", async (req, res) => {
  const user = await getNewestUser();
  res.json(user);
});

// Add one user
app.post("/add-one-user", async (req, res) => {
  const user = req.body;
  await addOneUser(user);
  res.send("Success! User has been added.");
});

// This endpoint listens for POST requests at /update-one-country-count
// It expects a JSON body with { "country_name": "France" } or any valid country
app.post("/update-one-country-count", async (req, res) => {
  const { country_name } = req.body;
  // Validate input
  if (!country_name) {
    return res.status(400).json({ error: "country_name is required" });
  }
  // Call the helper function to increment or insert the count
  const newCount = await updateCountryCount(country_name);
  // Send back the updated count in the response
  res.json({ newCount });
});

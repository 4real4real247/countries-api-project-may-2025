import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import { Routes, Route, Link } from "react-router-dom"; // React Router components for navigation
import Home from "./pages/Home"; // Home component for displaying country list
import SavedCountries from "./pages/SavedCountries"; // SavedCountries component for showing saved countries
import CountryDetail from "./pages/CountryDetail"; // CountryDetail component to show detailed info about a country
import localData from "../localData"; // Local backup data to use in case of API failure
import "./App.css"; // Import styling for the app

function App() {
  const [countries, setCountries] = useState([]); // State for storing the list of countries, initially empty
  const [darkMode, setDarkMode] = useState(false); // State for tracking dark mode false = light mode
  const [isLoading, setIsLoading] = useState(true); // State to show it's loading status (true = loading)
  const [error, setError] = useState(null); // State for storing any errors, initially null

  // Function to toggle between dark and light mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev); // Toggle the value of darkMode state

  // useEffect hook to run side effects (fetching countries) when the component mounts
  useEffect(() => {
    setIsLoading(true); // When the component first loads, this line sets the isLoading state to true. It's  that data is being fetched, so the UI can show a loading spinner or message.

    // Start fetching data from the API
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region"
    ) // this sends a request to the API to get a list of all countries the fetch makes the next work responcee
      //Once the request is completed, it checks if the response from the API is OK
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch countries"); // If the response is not OK, throw an error and it wil go to .catch block later
        return res.json(); // if its ok data is parsed as json
      })
      .then((data) => {
        // This block takes the raw data  and processes each country using .map() and take out only the info asked for
        const formattedData = data.map((country) => ({
          id: country.cca3, // Get country ID (cca3 code)
          name: country.name.common, // Get country name (common name)
          population: country.population?.toLocaleString() || "N/A", // Format population or set as 'N/A' if undefined
          region: country.region || "N/A", // Get region or 'N/A' if undefined
          capital: country.capital?.[0] || "N/A", // Get capital city or 'N/A' if undefined
          flag: country.flags?.svg || "", // Get flag URL or empty string if undefined
        }));

        // Sort the countries alphabetically based on their name
        formattedData.sort((a, b) => a.name.localeCompare(b.name));

        // formatteddata after sorted is then set to the countries state, which will update the UI with the country list.
        setCountries(formattedData);
        setError(null); // Any previous errors are cleared by setting setError(null).
      })
      //if an error happpens during the fetch  (e.g., network failure, API downtime), then the .catch block gets it .
      .catch((err) => {
        console.error("Using local data:", err); // Log the error to the console
        setError(err.message); //  the error message is stored in the error state
        setCountries(
          [...localData].sort((a, b) => a.name.localeCompare(b.name)) // In case of failure, it uses localdata  as a fallback. The data is sorted alphabetically before being set to the countries state.
        );
      })
      .finally(() => setIsLoading(false)); // The .finally() makes sure that, whether the fetch was successful or failed, the isLoading state will be set to false after the process completes.
  }, []); // Empty  array  only runs once after component mounts

  return (
    // Render the app with different styles based on darkMode state
    <div className={darkMode ? "app dark" : "app light"}>
      {/* Header with links and theme toggle */}
      <header className="header">
        {/* Link to the homepage with the site logo */}
        <Link to="/" className="logo">
          Where in the world?
        </Link>

        {/* Link to the Saved Countries page */}
        <Link to="/saved" className="saved-link">
          Saved Countries
        </Link>

        {/* Button to toggle dark mode */}
        <button
          onClick={toggleDarkMode} // Toggle dark mode on button click
          className="theme-toggle" // CSS class for styling the button
          aria-label="Toggle dark mode" // Accessibility label for the button
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}{" "}
          {/* Change button text based on darkMode state */}
        </button>
      </header>

      {/* This part of the code handles the conditional rendering of different UI elements based on the state (isLoading and error).*/}

      {isLoading ? (
        <div className="loading">Loading countries...</div> // Show loading message while fetching data
      ) : error ? (
        <div className="error">Error: {error}. Using local backup data.</div> // Show error message if API fetch fails
      ) : (
        // If data has loaded, render routes (Home, SavedCountries, CountryDetail)
        <Routes>
          {/* Define route for homepage */}
          <Route path="/" element={<Home countries={countries} />} />
          {/* Define route for saved countries page */}
          <Route
            path="/saved"
            element={<SavedCountries darkMode={darkMode} />}
          />
          {/* Define route for country detail page */}
          <Route
            path="/country-detail/:country_name"
            element={<CountryDetail countries={countries} />}
          />
        </Routes>
      )}
    </div>
  );
}

// Export the App component as the default export
export default App;

//  STEP 1: Import tools and files we need to build the app
import { useEffect, useState } from "react"; // React tools to handle data and actions
import { Routes, Route, Link } from "react-router-dom"; // Tools to switch between pages
import Home from "./pages/Home"; // Home page component
import SavedCountries from "./pages/SavedCountries"; // Page to show saved countries
import CountryDetail from "./pages/CountryDetail"; // Page to show details about one country
import localData from "../localData"; // Local backup country data if API fails
import "./App.css"; // Styles for the app

function App() {
  //  STEP 2: Create a state variable to store country data
  const [countries, setCountries] = useState([]); // Start with an empty list

  //  STEP 3: Get country data from the REST Countries API when the app loads
  useEffect(() => {
    //  Try to fetch data from the internet
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json()) // Convert the response to usable data
      .then((data) => {
        //  Format the data so we only keep what we need
        const formattedData = data.map((country) => ({
          id: country.cca3, // Unique ID for each country
          name: country.name.common, // Common name of the country (e.g., "France")
          population: country.population.toLocaleString(), // Format number with commas
          region: country.region, // Continent like "Europe", "Asia", etc.
          capital: country.capital?.[0] || "N/A", // Use first capital or "N/A"
          flag: country.flags?.svg || "", // Get the flag image or leave blank
        }));

        // Sort countries alphabetically
        formattedData.sort((a, b) => a.name.localeCompare(b.name));

        //  Save the clean data into our state
        setCountries(formattedData);
      })
      .catch((err) => {
        //  If there’s a problem (like no internet), use local backup data
        console.error("Using fallback local data due to error:", err);
        setCountries(
          [...localData].sort((a, b) => a.name.localeCompare(b.name)) // Sort local data too
        );
      });
  }, []); // Run this code once when the app first opens

  // 📱 STEP 4: Set up what the app shows on the screen
  return (
    <div>
      {/*  Navigation bar */}
      <header className="header">
        {/*  Link to Home Page */}
        <Link to="/" className="logo">
          Where in the world?
        </Link>

        {/*  Link to Saved Countries Page */}
        <Link to="/saved" className="saved-link">
          Saved Countries
        </Link>
      </header>

      {/*  Show different pages depending on the URL */}
      <Routes>
        {/*  Home Page shows all countries */}
        <Route path="/" element={<Home countries={countries} />} />

        {/*  Saved Countries Page */}
        <Route path="/saved" element={<SavedCountries />} />

        {/*  Country Detail Page - shows info for one selected country */}
        <Route
          path="/country-detail/:countryName"
          element={<CountryDetail countries={countries} />}
        />
      </Routes>
    </div>
  );
}

// 🚀 Make this component available to use in other files
export default App;

//     ├── src/
//     │   ├── pages/
//     │   │   ├── Home.jsx
//     │   │   │    Shows a list of all countries using cards. Receives country data from App.
//     │   │   │
//     │   │   ├── SavedCountries.jsx
//     │   │   │    Displays a list of user-saved countries. You could use localStorage here.
//     │   │   │
//     │   │   └── CountryDetail.jsx
//     │   │        Shows detailed info about one selected country. Uses the `:countryName` route param.
//     │   │   └── (still need to do)   Button.jsx -
//     │   │    need button when clicked will send countryDetail  to savedCountrys  page
//     |   |
//     │   ├── components/
//     │   │   ├── CountryCard.jsx
//     │   │   │    Reusable card to show a country's flag, name, region, capital, etc.
//     │   │
//     │   ├── App.jsx
//     │   │    Main app logic: fetches data from REST Countries API, sets up routes, and renders pages.
//     │   │
//     │   ├── localData.js
//     │   │    A static array of fallback countries used if the API fails (offline mode).
// i did use ai for puesduocoding  and my file structure because it is so very helpful for me to see the file connections and help me to understand my code when i come back to it

//  Import tools and files we need to build the app

import { useEffect, useState } from "react"; // React tools to handle data and actions
import { Routes, Route, Link } from "react-router-dom"; // Tools to switch between pages
import Home from "./pages/Home"; // Home page component
import SavedCountries from "./pages/SavedCountries"; // Page to show saved countries
import CountryDetail from "./pages/CountryDetail"; // Page to show details about one country
import localData from "../localData"; // Local backup country data if API fails
import "./App.css"; // Styles for the app

function App() {
  //   Create a state variable to store country data
  const [countries, setCountries] = useState([]); // Start with an empty list array This will eventually be an array of countries, but right now it starts empty

  //night and day  mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  //  Get country data from the Countries API when the app loads
  useEffect(() => {
    //  Try to fetch data from the internet
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json()) // Convert the response to usable data
      .then((data) => {
        //  Format the data so i only keep what i needed to show and have less error and i used ternary operators ?  so that it will show blank if thre is no data avalbiabe
        const formattedData = data.map((country) => ({
          id: country.cca3, // Unique ID for each country
          name: country.name.common, // Common name of the country
          population: country.population.toLocaleString(), // Format number with commas
          region: country.region, // Continent
          capital: country.capital?.[0] || "N/A", // Use first capital or "N/A"
          flag: country.flags?.svg || "", // Get the flag image or leave blank
        }));

        // Sort countries alphabetically
        formattedData.sort((a, b) => a.name.localeCompare(b.name));

        //  this saves the sorted formattedData
        setCountries(formattedData);
      })
      .catch((err) => {
        //  If there’s a problem (like no internet) use local backup and i also sorted it here to
        console.error("Using fallback local data due to error:", err);
        setCountries(
          [...localData].sort((a, b) => a.name.localeCompare(b.name))
        );
      });
  }, []); // Run this code once when the app first opens

  //  Set up what the app shows on the screen and wrap light and dark mode in the whole app also
  return (
    <div className={darkMode ? "app dark" : "app light"}>
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
        {/*light and dark*/}
        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
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

//  Make this component available to use in other files
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

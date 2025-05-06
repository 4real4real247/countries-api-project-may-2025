import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";
import "./App.css";

// Define the main App structure
function App() {
  return (
    <div>
      {/* Navigation Header */}
      <header className="header">
        {/* link to home */}
        <Link to="/" className="logo">
          Where in the world?
        </Link>
        {/* link to saved page */}
        <Link to="/saved" className="saved-link">
          Saved Countries
        </Link>
      </header>
      {/* Setup routes for pages, Render Home at "/", Render SavedCountries at "/saved", Render CountryDetail with dynamic id */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<SavedCountries />} />
        <Route path="/country/:id" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;

//my structure
// index.html (HTML page)
// ├── main.jsx (mount React app)
//     └── App.jsx (routes + header)
//         ├── Home.jsx (shows country cards)
//         │     └── CountryCardList.jsx (maps and renders)
//         │            └── CountryCard.jsx (one card)
//         ├── SavedCountries.jsx
//         └── CountryDetail.jsx (not done yet)

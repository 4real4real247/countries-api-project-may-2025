import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SavedCountries({ darkMode, countries }) {
  // This stores user input from the profile form.
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryFrom: "",
    bio: "",
  });
  // Keeps track of whether the user has submitted the profile. Used to show either the form or the “Welcome” message.
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Holds a list of countries the user has saved, with full data from the frontend.
  const [savedCountries, setSavedCountries] = useState([]);

  // Tracks how many times each country was viewed.
  const [viewCounts, setViewCounts] = useState({});

  // Allows us to know when the URL changes. Useful to reload data when route changes.
  const location = useLocation();

  // Makes a GET request to fetch the latest user.
  // If successful, fills out the form with the fetched data.
  // If user has a name, sets formSubmitted to true (shows welcome instead of form).
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/get-newest-user");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        const user = data[0] ?? {};
        setFormData({
          fullName: user.name ?? "",
          email: user.email ?? "",
          countryFrom: user.country_name ?? "",
          bio: user.bio ?? "",
        });
        setFormSubmitted(Boolean(user.name));
      } catch (err) {
        console.error("Error loading newest user:", err);
      }
    }
    loadUser();
  }, []);

  // Load saved countries and view counts from backend API on mount and when route changes.
  // For each saved country, look up the full data from the frontend countries array.
  useEffect(() => {
    async function loadSaved() {
      try {
        const res = await fetch("/api/get-all-saved-countries");
        const data = await res.json();
        console.log("Saved countries from backend:", data);

        // For each saved country, find the full country data from the frontend
        // 1. Add null/undefined check for countries
        const countriesArray = Array.isArray(countries) ? countries : [];

        const savedCountriesWithDetails = data.map(({ country_name }) => {
          // 2. Use optional chaining and nullish coalescing
          const found =
            countriesArray?.find((c) => c.name === country_name) ?? null;

          return found
            ? {
                ...found,
                id: found.id || country_name,
              }
            : {
                id: country_name || Math.random(),
                name: country_name,
                country_name: country_name,
                flag: "",
                capital: "this is not working ",
                population: "N/A",
                region: "N/A",
              };
        });
        //////////////////////////////////////////////////////////
        // View counts (optional, if your backend returns them)
        const counts = data.reduce((acc, { country_name, viewCount }) => {
          if (country_name)
            acc[country_name] = typeof viewCount === "number" ? viewCount : 0;
          return acc;
        }, {});

        setSavedCountries(savedCountriesWithDetails);
        setViewCounts(counts);
        console.log("Saved countries with details:", savedCountriesWithDetails);
        console.log("Mapped viewCounts:", counts);
      } catch (err) {
        console.error("Error loading saved countries", err);
      }
    }
    loadSaved();
  }, [location, countries]);

  // Debug and see state changes in console
  useEffect(() => {
    console.log("SavedCountries state:", savedCountries);
    console.log("ViewCounts state:", viewCounts);
  }, [savedCountries, viewCounts]);

  // Handlers
  // Shows the form again when “Edit Profile” is clicked.
  const handleEditProfile = () => setFormSubmitted(false);

  // When a user types in the form, it updates the formData state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    // Prevents the form from reloading the page.
    e.preventDefault();
    // Sends form data to the backend using a POST request.
    fetch("/api/add-one-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.fullName,
        country_name: formData.countryFrom,
        email: formData.email,
        bio: formData.bio,
      }),
    });
    // Sets formSubmitted to true so the form disappears and welcome message appears.
    setFormSubmitted(true);
  };

  return (
    <div className={`profile-container ${darkMode ? "dark" : "light"}`}>
      {/* Condition: If profile isn’t submitted, show form title and note. */}
      {!formSubmitted && (
        <>
          <h1 className="profile">My Profile</h1>
          <p className="form-note">
            Please fill out your profile to get started
          </p>
        </>
      )}
      {/* If profile is submitted, show welcome message + edit button. If not, show the input form (name, email, etc.) */}
      {formSubmitted ? (
        <div className="welcome-message">
          <h2>Welcome, {formData.fullName}!</h2>
          <button onClick={handleEditProfile} className="edit-button">
            Edit Profile
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="profile-form"
          autoComplete="off"
        >
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              label="Full Name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              label="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="countryFrom"
              value={formData.countryFrom}
              onChange={handleChange}
              placeholder="Country of Origin"
              required
              label="Country of Origin"
            />
          </div>
          <div className="form-group">
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              required
              label="Bio"
            />
          </div>
          <button type="submit" className="submit-button">
            Save Profile
          </button>
        </form>
      )}

      {/* Saved countries section */}
      <div className="saved-countries">
        <h2>Saved Countries</h2>
        {savedCountries.length === 0 ? (
          <p className="empty-state">No saved countries yet!</p>
        ) : (
          <div className="country-card-list">
            {savedCountries.map((country) => (
              <div key={country.id} className="country-card">
                {country.flag && (
                  <img
                    src={country.flag}
                    alt={`${country.name || country.country_name} flag`}
                    className="flag"
                  />
                )}
                <h3>{country.name || country.country_name}</h3>
                <p>
                  <strong>Capital:</strong> {country.capital || "N/A"}
                </p>
                <p>
                  <strong>Population:</strong> {country.population || "N/A"}
                </p>
                <p>
                  <strong>Region:</strong> {country.region || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

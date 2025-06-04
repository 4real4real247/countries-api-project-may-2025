import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SavedCountries({ darkMode }) {
  // Profile state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryFrom: "",
    bio: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Saved countries and view counts
  const [savedCountries, setSavedCountries] = useState([]);
  const [viewCounts, setViewCounts] = useState({});

  // To update on route change
  const location = useLocation();

  // Load data from localStorage on mount and when route changes
  useEffect(() => {
    // Profile
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || {};
    setFormData({
      fullName: savedProfile.fullName || "",
      email: savedProfile.email || "",
      countryFrom: savedProfile.countryFrom || "",
      bio: savedProfile.bio || "",
    });
    setFormSubmitted(!!savedProfile.fullName);

    // Saved countries
    const countries = JSON.parse(localStorage.getItem("savedCountries")) || [];
    setSavedCountries(countries);

    // View counts
    const views = JSON.parse(localStorage.getItem("viewCounts")) || {};
    setViewCounts(views);
  }, [location]);

  // Save form data
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(formData));
    setFormSubmitted(true);
  };

  // Allow editing profile
  const handleEditProfile = () => setFormSubmitted(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`profile-container ${darkMode ? "dark" : "light"}`}>
      {/* Only show "My Profile" and the note if the form is NOT submitted */}
      {!formSubmitted && (
        <>
          <h1 className="profile">My Profile</h1>
          <p className="form-note">
            Please fill out your profile to get started
          </p>
        </>
      )}

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
              aria-label="Full Name"
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
              aria-label="Email"
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
              aria-label="Country of Origin"
            />
          </div>
          <div className="form-group">
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              required
              aria-label="Bio"
            />
          </div>
          <button type="submit" className="submit-button">
            Save Profile
          </button>
        </form>
      )}

      <div className="saved-countries">
        <h2>Saved Countries</h2>
        {savedCountries.length === 0 ? (
          <p className="empty-state">No saved countries yet!</p>
        ) : (
          <div className="country-card-list">
            {savedCountries.map((country) => (
              <div key={country.id || country.name} className="country-card">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="flag"
                  loading="lazy"
                />
                {/* Country name under flag */}
                <h3>{country.name}</h3>
                {/* Capital and other details below name */}
                <p>
                  <strong>Capital:</strong> {country.capital}
                </p>
                <p>
                  <strong>Population:</strong> {country.population}
                </p>
                <p>
                  <strong>Region:</strong> {country.region}
                </p>
                <p>
                  <strong>Viewed:</strong> {viewCounts[country.name] || 0} time
                  {viewCounts[country.name] === 1 ? "" : "s"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

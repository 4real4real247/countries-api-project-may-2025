import { useEffect, useState } from "react";

// This page lets the user fill out a little profile/contact form
export default function SavedCountries({ darkMode }) {
  // These keep track of what the user types into the form
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fullName, setFullName] = useState(
    () => localStorage.getItem("fullName") || ""
  );
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [countryFrom, setCountryFrom] = useState(
    () => localStorage.getItem("countryFrom") || ""
  );
  const [bio, setBio] = useState(() => localStorage.getItem("bio") || "");

  // This runs when the user submits the form
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from reloading

    // Log the form data to the console so we can see it
    console.log("Profile Submitted:", { fullName, email, bio, country });

    // After submitting, clear the form fields so it's empty again
    setFullName("");
    setEmail("");
    setBio("");
    setCountryFrom("");
  };

  return (
    <div className={`profile-container ${darkMode ? "dark" : "light"}`}>
      <h1 className="profile">My Profile</h1>

      {/* name, email, message , country from */}
      <form onSubmit={handleSubmit} className="profile-form">
        {/* Full Name input */}
        <div className="form-group">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email input */}
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Country input*/}
        <div className="form-group">
          <input
            type="text"
            value={countryFrom}
            onChange={(e) => setCountryFrom(e.target.value)}
            placeholder="Country From"
            required
          />
        </div>

        {/* Message textarea */}
        <div className="form-group">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            required
          ></textarea>
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

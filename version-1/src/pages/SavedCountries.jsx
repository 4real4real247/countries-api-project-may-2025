import { useState } from "react";

// This page lets the user fill out a little profile/contact form
export default function SavedCountries() {
  // These keep track of what the user types into the form
  const [fullName, setFullName] = useState(""); // for the name input
  const [email, setEmail] = useState(""); // for the email input
  const [message, setMessage] = useState(""); // for the message input

  // This runs when the user submits the form
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from reloading

    // Log the form data to the console so we can see it
    console.log("Profile Submitted:", { fullName, email, message });

    // After submitting, clear the form fields so it's empty again
    setFullName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {/* Form with 3 fields: name, email, message */}
      <form onSubmit={handleSubmit} className="profile-form">
        {/* Full Name input */}
        <div className="form-group">
          <label>Full Name</label>
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
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Message textarea */}
        <div className="form-group">
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us something..."
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CountryDetail({ countries }) {
  const { country_name } = useParams();

  const selectedCountry = countries.find(
    (country) => country.name === country_name
  );

  const [viewCount, setViewCount] = useState(0);
  const [saved, setSaved] = useState(false);
  //deleated to insert code for a post request on the api not localstorage
  // useEffect(() => {
  //   if (!selectedCountry) return;

  //   const viewData = JSON.parse(localStorage.getItem("viewCounts")) || {};
  //   const currentCount = viewData[selectedCountry.name] || 0;
  //   const updatedCount = currentCount + 1;
  //   viewData[selectedCountry.name] = updatedCount;

  //   localStorage.setItem("viewCounts", JSON.stringify(viewData));
  //   setViewCount(updatedCount);
  // }, [selectedCountry]);

  // useEffect to increment and fetch the latest view count from the backend API
  useEffect(() => {
    if (!selectedCountry) {
      console.log("No selectedCountry found!");
      return;
    }

    // Send a POST request to update the view count for this country
    // You’re telling the app to contact the backend server and send it a message. This message is going to the /api/update-one-country-count route, which is where the server expects to receive updates for view counts.
    fetch("/api/update-one-country-count", {
      //Tell the server this is a POST request (used to send data).
      //You’re not just getting data; you’re sending data to the server (like submitting a form).
      method: "POST",
      //Let the server know that the data you’re sending is in JSON format.“Hey server, I’m sending you data, and it’s written in JSON (which looks like { key: value }).”
      headers: {
        "Content-Type": "application/json",
      },
      //Send the country name as the data body, turned into a string. You’re sending the country’s name to the server It’s wrapped in an object and turned into a string format so the server can read it.
      body: JSON.stringify({
        country_name: selectedCountry.name, // Send the country name as required by the backend
      }),
      //You’re done setting up the message, so now it sends it to the server.
    })
      //Wait for the server to answer. If it replies with an error, throw one. Otherwise, turn the reply into usable data.When the server responds, check if everything went okay. If it didn’t, say there was an error. If it did work, grab the updated view count from the server’s reply.
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update view count");
        return res.json();
      })
      //Take the number you got from the server and save it into viewCount.The backend returns an object with the updated count, e.g., { count: 6 }If the server gave back a number (like 6 views), store that number so you can show it in your app.
      .then((data) => {
        console.log("View count API response:", data);
        setViewCount(data.newCount);
      })
      //If something went wrong at any point, show an error and reset viewCount to 0.If anything broke, show an error in the console so you can debug it later. Then, set the view count to 0 just so your app doesn’t crash or stay stuck.
      .catch((err) => {
        console.error("Error updating view count:", err);
        setViewCount(0); // Optionally set to 0 or keep previous value if error
      });
    //This whole process only happens when a new country is selected in the app. So every time the user clicks on a different country, this view count update gets triggered.
  }, [selectedCountry]);

  ///////////////////////////////////
  //REPLACED with  backend
  // const handleSaveCountry = () => {
  //   if (!selectedCountry) return;

  //   const existing = JSON.parse(localStorage.getItem("savedCountries")) || [];
  //   const alreadyExists = existing.some((c) => c.name === selectedCountry.name);

  //   if (!alreadyExists) {
  //     const updatedList = [...existing, selectedCountry];
  //     localStorage.setItem("savedCountries", JSON.stringify(updatedList));
  //     setSaved(true);
  //   } else {
  //     setSaved(true); // Optional: still show as saved if already present
  //   }
  // };
  ///////////////////////////////////////////////////////

  //Create a piece of state called saveError. Start with no error (null) so it store and show an error message if saving the country fails
  const [saveError, setSaveError] = useState(null);
  //To manage the logic for saving a country to the backend.
  const handleSaveCountry = () => {
    //right away mark the country as “saved” in the UI This is an optimistic update—we assume the save will work and show instant feedback to the user.
    setSaved(true);
    //Clear out any previous error messages So the user doesn’t see an old error when trying again.
    setSaveError(null);
    //////////////////////////////////////////////////////////////////////
    //This is the API endpoint that saves the country.
    fetch("/api/save-one-country", {
      //The backend needs the country ID to know which country to save.
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country_id: selectedCountry.id,
      }),
    })
      // Wait for the backend’s response To check if saving worked or failed.
      .then((res) => {
        //If the server didn’t respond with a success code, throw an error.  only want to continue if the save actually worked
        if (!res.ok) throw new Error("Save failed");
        console.log("Save successful for ID:", selectedCountry.id);
        //Redirect the user to view their saved countries right after saving.
      })
      //If any error happened above, this part runs.
      .catch((err) => {
        //For debugging and to understand what went wrong.
        console.error("Save error:", err);
        // Undo the optimistic update if the save failed. dont want it show saved unless they saved it
        setSaved(false);
        //Show a message to the user that something went wrong.
        setSaveError("Failed to save. Please try again.");
      });
  };
  ///////////////////added backend for saved county/////////////////////

  if (!selectedCountry) {
    return <div>Country not found.</div>;
  }

  return (
    <div className="country-detail-page">
      <img
        src={selectedCountry.flag}
        alt={`${selectedCountry.name} flag`}
        className="detail-flag"
      />
      {/* Country name under the flag */}
      <h1>{selectedCountry.name}</h1>
      {/* Capital and other details below the name */}
      <p>
        <strong>Capital:</strong> {selectedCountry.capital}
      </p>
      <p>
        <strong>Population:</strong> {selectedCountry.population}
      </p>
      <p>
        <strong>Region:</strong> {selectedCountry.region}
      </p>
      <p>
        <strong>Viewed:</strong> {typeof viewCount === "number" ? viewCount : 0}{" "}
        {viewCount === 1 ? "time" : "times"}
      </p>

      <button onClick={handleSaveCountry} className="save-button">
        {saved ? "Country Saved!" : "Save Country"}
      </button>
      {saveError && <div className="error">{saveError}</div>}
    </div>
  );
}

export default CountryDetail;

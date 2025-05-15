import { useEffect, useState } from "react";
import CountryCardList from "../components/CountryCardList";
import localData from "../../localData";

function Home() {
  const [countries, setCountries] = useState([]);
  // Inside the Home component, we create state countries to store country data (starts as empty []).

  // This code uses React's useEffect hook, which allows you to perform side effects in function components. Side effects can include data fetching, subscriptions, or manually changing the DOM.
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        //         When the component first renders (mounts), the code inside useEffect runs once because of the empty dependency array [] at the end.
        // It makes a GET request to the REST Countries API (https://restcountries.com/v3.1/all) using the fetch API.
        // After getting the response, it converts it to JSON format with res.json().

        // The raw country data is transformed into a cleaner format using map():
        // Each country is converted to an object with specific properties (id, name, population, region, capital, and flag) The population is formatted with commas using toLocaleString() For capital, it uses optional chaining (?.) to handle countries without capitals If no capital exists, it defaults to "N/A".After mapping, the countries are sorted alphabetically by name using localeCompare().The formatted data is stored in state using setCountries()
        const formattedData = data.map((country) => ({
          id: country.cca3,
          name: country.name.common,
          population: country.population.toLocaleString(),
          region: country.region,
          capital: country.capital?.[0] || "N/A",
          flag: country.flags?.svg || "",
        }));
        //sorted alphabetically by country name
        formattedData.sort((a, b) => a.name.localeCompare(b.name));
        // stored in countries using setCountries.
        setCountries(formattedData);
      })
      //  If there's any error during the API call (like no internet connection), the catch error:It logs the error to the console
      //  Instead of API data, it uses a fallback called localData (which must be defined elsewhere)
      //  The local data is also sorted alphabetically before being stored
      .catch((err) => {
        console.error("Using fallback data:", err);
        setCountries(
          [...localData].sort((a, b) => a.name.localeCompare(b.name))
        );
      });
    //empty dependency array ([]) means this effect runs only once, when the component mounts
  }, []);

  //A header is shown.CountryCardList component is given the country data to render cards.
  return (
    <div>
      <CountryCardList data={countries} />
    </div>
  );
}

export default Home;

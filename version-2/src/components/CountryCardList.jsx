import CountryCard from "./CountryCard";

// This component shows a list of all the country cards
function CountryCardList({ data }) {
  // Loop through the list of countries and make a card for each
  return (
    <div className="card-list">
      {data.map((country) => (
        // Give each card a unique key so React can track it
        <CountryCard key={country.id || country.name} country={country} />
      ))}
    </div>
  );
}

export default CountryCardList;

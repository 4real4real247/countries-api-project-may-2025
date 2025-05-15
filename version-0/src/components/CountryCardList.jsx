import CountryCard from "./CountryCard";

// Component that displays a list of country cards
function CountryCardList({ data }) {
  // console.log("All Countries:", data);

  return (
    <div className="card-list">
      {data.map((country) => (
        <CountryCard key={country.id || country.name} country={country} />
      ))}
    </div>
  );
}

export default CountryCardList;

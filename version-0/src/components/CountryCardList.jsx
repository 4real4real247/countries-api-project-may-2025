import CountryCard from "./CountryCard";

// Component that displays a list of country cards
function CountryCardList({ data }) {
  // console.log("All Countries:", data);

  return (
    <div className="card-list">
      {/* Loop through each country and render a CountryCard */}
      {data.map((country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
}

export default CountryCardList;

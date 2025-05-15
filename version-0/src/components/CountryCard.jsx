// Component to display one country's info
function CountryCard({ country }) {
  // console.log("Rendering Country:", country);

  const flagUrl = country.flag || ""; // Handle missing flag safely

  return (
    <div className="card">
      {flagUrl ? (
        <img src={flagUrl} alt={`${country.name} flag`} />
      ) : (
        <div className="no-flag">No Flag Available</div>
      )}
      <h2>{country.name}</h2>
      <p>
        <strong>Population:</strong> {country.population}
      </p>
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
    </div>
  );
}

export default CountryCard;
// console.log("Rendering Country:", country);

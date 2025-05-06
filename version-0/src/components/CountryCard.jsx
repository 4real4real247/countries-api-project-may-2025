// Component to display one country's info
function CountryCard({ country }) {
  // console.log("Rendering Country:", country);

  return (
    <div className="card">
      <img src={country.flags.svg} alt={`${country.name.common} flag`} />
      <h2>{country.name.common}</h2>
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

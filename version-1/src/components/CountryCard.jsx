import { Link } from "react-router-dom";

function CountryCard({ country }) {
  const flagUrl = country.flag || "";

  return (
    <Link to={`/country-detail/${country.name}`} className="card-link">
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
    </Link>
  );
}

export default CountryCard;

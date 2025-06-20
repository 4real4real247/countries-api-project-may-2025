import { Link } from "react-router-dom";

function CountryCard({ country }) {
  return (
    <div className="country-card">
      <Link to={`/country-detail/${country.name}`} className="card-link">
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          className="card-flag"
        />
        <div className="card-content">
          <h2 className="card-name">{country.name}</h2>
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
    </div>
  );
}

export default CountryCard;

import localData from "../../localData";
import CountryCardList from "../components/CountryCardList";

// Home page component
function Home() {
  //console.log("Home Loaded"); (for debugging)

  return (
    <div className="container">
      {/* Render list of countries */}
      <CountryCardList data={localData} />
    </div>
  );
}

export default Home;

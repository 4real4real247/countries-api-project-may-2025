import CountryCardList from "../components/CountryCardList";

function Home({ countries }) {
  return (
    <div>
      <CountryCardList data={countries} />
    </div>
  );
}

export default Home;

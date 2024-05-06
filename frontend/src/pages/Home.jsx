import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import RandomQuotes from "../components/RandomQuotes";
import SearchQuotes from "../components/SearchQuotes";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="divider"></div>
      <RandomQuotes />
      <div className="divider"></div>
      <SearchQuotes />
      <div className="divider"></div>
      <Footer />
    </div>
  );
};

export default Home;

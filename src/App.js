import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Coin from "./components/Coin";
import ReactPaginate from "react-paginate";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const coinsPerPage = 10; 

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0); 
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredCoins.length / coinsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * coinsPerPage;
  const displayedCoins = filteredCoins.slice(offset, offset + coinsPerPage);

  return (
    <div>
      <div className="header">
        <h1 className="brand">
          <i className="fas fa-moon"></i> Crypto Hunter
        </h1>
        <form>
          <input
            className="inputField"
            type="text"
            onChange={handleChange}
            placeholder="Search a Coin"
          />
        </form>
      </div>
      <div className="coinsContainer">
        {displayedCoins.map((coin) => (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
       ) )}
      </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page"}
          breakClassName={"break"}
        />
      </div>
      
    </div>
  );
}

export default App;



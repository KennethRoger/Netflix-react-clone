import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import { API_KEY } from "../../../api";

export const SearchContext = React.createContext();

function Home() {
  const [searchResults, setSearchResults] = useState();

  const handleSearch = async (query) => {
    if (query.length > 0) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div>
      <SearchContext.Provider value={{ handleSearch, searchResults }}>
        <Header />
        <Main />
        <Footer />
      </SearchContext.Provider>
    </div>
  );
}

export default Home;

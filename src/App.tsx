import "./App.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import MyTable from "./MyTable";

interface CountryState {
  country: {
    name: string;
    region: string;
    area: number;
  }[];
}

const App: React.FC = () => {
  const [country, setCountry] = useState<CountryState["country"]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // fetch the data from restcountries API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://restcountries.com/v2/all?fields=name,region,area"
      );
      setCountry(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? <p>Loading...</p> : <MyTable country={country} />}
    </div>
  );
};

export default App;

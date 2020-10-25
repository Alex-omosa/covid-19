import React, { Component } from "react";
import Cards from "./components/cards/Cards";
import CountryPicker from "./components/countryPicker/CountyPicker";
import Chart from "./components/charts/Chart";
import styles from "./App.module.css";
import { fetchData } from "./api/index";
import coronaImg from "./images/image.png";
export default class App extends Component {
  state = {
    data: {
      confirmed: { value: 0 },
      deaths: { value: 0 },
      recovered: { value: 0 },
      lastUpdate: 0,
    },
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country });
  };
  render() {
    const { data, country } = this.state;
    if (!data) {
      return "Loading...";
    }
    return (
      <div className={styles.container}>
        <img src={coronaImg} alt="Corona virus" className={styles.img} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

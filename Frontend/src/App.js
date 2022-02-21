import React, { Component } from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: []
    };
  }

  componentDidMount() {
    this.getWeatherData();
  }

  getWeatherData(searchParams) {
    fetch("http://127.0.0.1:3001/weather/search", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(searchParams),
    })
      .then((response) => response.json())
      .then((data) => this.setState({ weatherData: data.results ?? [] }))
      .catch((err) => console.log(err));
  }

  convert24HourTimeTo12Hour(time) {
    return new Date(time).toLocaleString([], { hour12: true });
  }

  render() {
    return (
      <div className="App">
        <EditableSection onChange={this.getWeatherData.bind(this)} />
        <div className="divider" style={{ marginTop: "0px" }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {this.state.weatherData.map((item) => (
            <WeatherCard
              date={this.convert24HourTimeTo12Hour(item.date)}
              location={item.town}
              weather={item.weather}
            />
          ))}
        </div>
        <div className="divider"></div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import cities from './cities.json'
import { fetchWeather } from './components/fetchWeather'
import WeatherCard from './components/weathercard'

class App extends React.Component {
  constructor() {
    super()
    this.data = cities.map((val) => val.name.toLowerCase())
    this.state = {
      suggestions: [],
      cityName: "",
      search: "",
      inputCheck: this.search ? true : false,
      data: []
    }
  }

  handleChange = e => {
    e.persist();
    const value = e.target.value;
    let suggestions = [];
    if(value.length > 0) {
        const regex = new RegExp(`^${value}`, 'i')
        suggestions = this.data.sort().filter(v => regex.test(v))
    }
    this.setState(() => ({suggestions: suggestions, cityName: value}))
  }

  clearSearch = () => {
    this.setState(prev => {
      return {
      suggestions: [],
      cityName: "",
      search: "",
      inputCheck: false,
      data: []
    }})
  }

  setSearch = () => {
    this.setState(prev => {
      return {
      search: prev.cityName
    }})
    if(this.state.search.length > 0)
      this.search();
  }

  setCity = e => {
    const cityName = e.target.innerHTML;
    this.setState({
      cityName: cityName, 
      suggestions: [],
      search: cityName,
      inputCheck: true
    })
  }

  search = async (e) => {
      const data = await fetchWeather(this.state.search);
      this.setState({ data: [data] });
  }

  renderSuggestions = () => {
    const { suggestions } = this.state
    if(suggestions.length === 0) {
        return null
    }
    return (
      <div className="suggestion-list">
        <ul type="none">
          {suggestions.map((val, index) => {
                return( 
                  <li key={index}>
                      <button className="list-item" onClick={e => this.setCity(e)}>{val}</button>
                  </li>) }
          )}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="search-bar">
          <div className="search-header">
            <span className="location-icon">
              <svg viewBox="0 0 576 512" width="100" title="map-marked-alt">
                <path d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z" />
              </svg>
            </span>
            <input type="type" onKeyPress={(e) => {if(e.key === 'Enter' && this.state.inputCheck === true) this.search()}} placeholder="Type city name here" value={this.state.cityName} onChange={e => this.handleChange(e)} />
            <button onClick={this.clearSearch} disabled={this.state.cityName.length>0 ? false : true} >
            <span className="close-icon">
              <svg style={{fill: this.state.cityName.length > 0 ? "#ff5959" : "grey" }} viewBox="0 0 352 512" width="100" title="times">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
              </svg>
            </span>
            </button>
            <button onClick={this.setSearch} disabled={this.state.inputCheck ? false : true} >
              <span className="go-search-icon">
                <svg style={{fill: this.state.inputCheck ? "#7f81d6" : "grey" }} viewBox="0 0 448 512" width="100" title="angle-double-right">
                  <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
                </svg>
              </span>
            </button>
          </div>
          {this.state.suggestions[0] === this.state.cityName ? this.setState(prev => {return {search: prev.cityName, suggestions: [], inputCheck: true}}) : this.renderSuggestions() }
        </div>
        {this.state.data.length > 0
          ? 
          <WeatherCard 
            default = {false}
            city = {this.state.data[0].name}
            minTemp = {this.state.data[0].main.temp_min}
            maxTemp = {this.state.data[0].main.temp_max}
            temp = {this.state.data[0].main.temp}
            humidity = {this.state.data[0].main.humidity}
            description = {this.state.data[0].weather[0].description}
            country = {this.state.data[0].sys.country}
          />
          :
          <WeatherCard 
            default = {true}
          />
        }
        
      </div>
    );
    }
}

export default App;

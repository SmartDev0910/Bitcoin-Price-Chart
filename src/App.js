import React, { Component } from 'react';
import './components/css/App.css';
import PriceOverview from './components/PriceOverview';
import MyLineChart from './components/LineChart';
const fx = require("money");

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPriceUSD: null,
      currentPriceEUR: null,
      thirtyDayPriceUSD: null,
      thirtyDayPriceEUR: null,
      historicalPrice: null
    };
  }
  componentDidMount() {

    //Converts currencies into other currencies ** fx.rates can be updated to handle new currencies, currently hard coded **
        const currencyConversion = (val, baseCurrency, toCurrency) => {
        fx.base = baseCurrency;
          //Available Exchange Rates
        fx.rates = {
        "EUR" : 1.21, // Based on the average exchange rates from 2015 to 2017
        "GBP" : 0.785333, // Based on the average exchange rates from 2015 to 2017
        baseCurrency : 1,
          }
          const total = fx(val).from(baseCurrency).to(toCurrency);
          return Math.round(total);
        }

    // Refetches API data ( triggered in getCurrentPrice() / getHistoricalPrice() )
    const refetchApi = (interval) => {
      setInterval(() => {
          getCurrentPrice();
          getHistoricalPrice();
      }, interval);
    }

    const getCurrentPrice = () => {
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

      fetch(url).then(data => data.json())
      .then(currentPrice => {
        this.setState ({
          currentPriceUSD: currentPrice.bpi.USD.rate_float,
          currentPriceEUR: currentPrice.bpi.EUR.rate_float

        })
      }).catch((error) => {
        console.log(error);
      })
      refetchApi(3000);
    }

    const getHistoricalPrice = () => {
      const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

      fetch(url).then(data => data.json())
      .then(historicalPrice => {
        // Converts last 30 day price object into an array ** index [0] is the 1st day of the 30/31 day cycle **
        const result = Object.keys(historicalPrice.bpi).map((key) => {
          return Math.round([historicalPrice.bpi[key]][0]);
        })
        this.setState ({
          thirtyDayPriceUSD: result[0],
          thirtyDayPriceEUR: currencyConversion(result[0], 'USD', 'EUR'),
          historicalPrice: historicalPrice.bpi
        })
      }).catch((error) => {
        console.log(error);
      })
      refetchApi(90000);
    }
  
    getCurrentPrice();
    getHistoricalPrice();
  }

render() {
    return (
      <div>
        <PriceOverview data={this.state}/>
        <MyLineChart data={this.state.historicalPrice}/>
        <div className="credits">Powered by <a href="https://www.coindesk.com/api/" target="_blank"> Coindesk</a></div>
      </div>
    );
  }


}

export default App;

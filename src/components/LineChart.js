import React, { Component } from 'react';
import './css/LineChart.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const moment = require('moment');
const fx = require("money");

class MyLineChart extends Component {
	render() {

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

		const bpi = this.props.data;
		const data = [];
		
		for(let date in bpi) {
			data.push({
				name: moment(date).format('MMM DD') + " 18'",
				USD: Math.round(bpi[date]),
				EUR: currencyConversion(Math.round(bpi[date]), 'USD', 'EUR'),
				amt: bpi[date]
			})
		}
		return (
			<div className="chartContainer">
		  <LineChart width={750} height={350} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis padding={{ left: 10, right: 10 }} dataKey="name"/>
       <YAxis minTickGap={0} />
       <CartesianGrid horizontal={false} vertical={false} />
       <Line type="monotone" strokeWidth={4} dataKey="USD" stroke="#4792e4" dot={{ fill: '#e8e8e8', stroke: '#4792e4', strokeWidth: 2.5, }}/>
       <Line type="monotone" strokeWidth={4} dataKey="EUR" stroke="#A8A8A8" dot={{ fill: '#e8e8e8', stroke: '#a8a8a8', strokeWidth: 2.5, }}/>
			  <Tooltip/>
       <Legend />
      </LineChart>
      </div>
		)
	}

}

export default MyLineChart;
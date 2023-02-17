import React, { Component } from 'react';
import './css/PriceOverview.css';
import './css/NavigationBar.css';
import bitcoinLogo from './assets/bitcoin.svg';
import USAFlag from './assets/usa-flag.svg';
import EuroFlag from './assets/euro_flag.svg';
import ArrowUp from './assets/arrow-positive.svg';
import ArrowDown from './assets/arrow-negative.svg';

class PriceOverview extends Component {

	constructor(props) {
	    super(props);
		    this.state = {
		    	USDActive: true,
	     		EURActive: false,
	     		percentageArrow: true // true shows positive arrow | false shows negative arrow
	    	}
	}	

	render() {

		let data = this.props.data;
		let currentPriceUSD = Math.round(data.currentPriceUSD);
		let currentPriceEUR = Math.round(data.currentPriceEUR);
		let thirtyDayPriceUSD = data.thirtyDayPriceUSD;
		let thirtyDayPriceEUR = data.thirtyDayPriceEUR;
	
		// console.log('EUR', currentPriceEUR, thirtyDayPriceEUR);
		// console.log('USD', currentPriceUSD, thirtyDayPriceUSD);

		//Calculate the difference between the current and 30 day price 
		const findPriceDifference = (current, past) => { return current - past };

		let USDDifference = findPriceDifference(currentPriceUSD, thirtyDayPriceUSD);
		let EURDifference = findPriceDifference(currentPriceEUR, thirtyDayPriceEUR);

		//Calculate percetage changed over the past 30 days 
        const percentageChanged = (currentPrice, thirtyDayPrice) => { return  ((currentPrice - thirtyDayPrice) / thirtyDayPrice)*100 };

        let percentageChangedUSD = Math.round(percentageChanged(currentPriceUSD, thirtyDayPriceUSD));
        let percentageChangedEUR = Math.round(percentageChanged(currentPriceEUR, thirtyDayPriceEUR));

        //Determine the up or down percentage arrow
        const percentageArrowUSD = () => {
			if(percentageChangedUSD < 0) {
			  this.setState ({ percentageArrow: false })
			} else {
				this.setState ({ percentageArrow: true })
			}
		}
		const percentageArrowEUR = () => {
			if(percentageChangedEUR < 0) {
			  this.setState ({ percentageArrow: false })
			} else {
				this.setState ({ percentageArrow: true })
			}
		}

		//Upates this.state to show prices in EUR
		const changeCurrencyEUR = () => {
			if(this.state.USDActive === true) {
				this.setState ({
					USDActive: false
				})
			}
			percentageArrowEUR();
		}

		//Upates this.state to show prices in USD
		const changeCurrencyUSD = () => {
			if(this.state.USDActive === false) {
				this.setState ({
					USDActive: true
				})
			}
			percentageArrowUSD();
		}
		
	    return (
	     <div>
	     	<div className="navigationBar">
	    		<div className="navContents">
		    		<div className="siteTitle"><img src={bitcoinLogo} alt="btc logo"/><h4>30-Day Price Tracker</h4></div>
		    		<div className="navBtns">
		    			<button onClick={changeCurrencyUSD} type="button">USD</button>
		    			<button onClick={changeCurrencyEUR} type="button">EUR</button>
		    			{ this.state.USDActive === true ? <img src={USAFlag} alt='USA Flag'/> : <img src={EuroFlag} alt='Euro Flag'/> }
		    		</div>
	    		</div>
	    	</div>
	    	<div className="heading"><img src={bitcoinLogo} alt="btc logo"/> <h3>Current Price</h3> </div>

		      <div className="overviewBar">
		      	<div className="currentPrice panel">
		      		{this.state.USDActive === true ? <div className="price">${currentPriceUSD}</div> : <div className="price">€{currentPriceEUR}</div> }
		      		<div className="subHeading">Updated a Minute Ago</div>
		      	</div>
		      	<div className="monthChange panel">
		      		{ this.state.USDActive === true ? <div className="price">${USDDifference}</div> : <div className="price">€{EURDifference}</div> }
		      		<div className="subHeading">Change Since Last Month</div>
		      	</div>
		      	<div className="percentageChanged panel">
		      	  <div className="percentageView">
		      		{ this.state.USDActive === true ? <div className="price">{percentageChangedUSD}%</div> : <div className="price">{percentageChangedEUR}%</div> }
		      		{ this.state.percentageArrow === true ? <img src={ArrowUp} alt='up arrow'/> : <img src={ArrowDown} alt='down arrow'/> }
		      	  </div>
		      		<div className='subHeading'>Percentage Changed</div>
		      	</div>
		      </div>
	     </div>
	    );
 	}	
}



export default PriceOverview;
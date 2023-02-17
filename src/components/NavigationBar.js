import React, { Component } from 'react';
import './css/NavigationBar.css';
import bitcoinLogo from './assets/bitcoin.svg';

class NavigationBar extends Component {

	render() {
	    return (
	    	<div className="navigationBar">
	    		<div className="navContents">
		    		<div className="siteTitle"><img src={bitcoinLogo} alt="btc logo"/><h4>30-Day Price Tracker</h4></div>
		    		<div className="navBtns">
		    			<button type="button">USD</button>
		    			<button type="button">EUR</button>
		    			<button type="button">GBP</button>
		    		</div>
	    		</div>
	    	</div>
	    )
	}
}

export default NavigationBar;
import React, {Component} from 'react';
import {Provider} from 'mobx-react';

import NoCamera from './NoCamera';
import Translate from '../stores/Translate';

function hasGetUserMedia(){
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    		  navigator.mozGetUserMedia || navigator.msGetUserMedia); 
}

class Main extends Component{
	constructor(){
		super();

		this.state = {
			hasUserMedia: false
		};
	}

	componentDidMount(){
		if(!hasGetUserMedia()) return;
	}
	
	render(){
        const translate = new Translate();
		if(!this.state.hasUserMedia){
			return(
                <Provider translate={translate}>
				    <NoCamera />
                </Provider>
			);
		} else{
            return(
                <Camera />
            );
        }
	}
}

export default Main;
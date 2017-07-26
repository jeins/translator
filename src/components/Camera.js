import React, {Component} from 'react';
import NoCamera from './NoCamera';

function hasGetUserMedia(){
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    		  navigator.mozGetUserMedia || navigator.msGetUserMedia); 
}

class Camera extends Component{
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
		if(!this.state.hasUserMedia){
			return(
				<NoCamera />
			);
		}
	}
}

export default Camera;
import React, {Component} from 'react';
import NoCamera from './NoCamera';

class Camera extends Component{
	constructor(){
		super();
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
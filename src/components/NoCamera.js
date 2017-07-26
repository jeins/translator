import React, {Component} from 'react';

class NoCamera extends Component{
	constructor(){
		super();
	}

	render() {
		return (
			<h1>
				Your device doesnt have support for browser NoCamera
				<br />
				<br />
				Please try it on your desktop, Android or iOS device.
			</h1>
		)
	}
}

export default NoCamera;
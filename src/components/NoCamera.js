import React, {Component} from 'react';
import {inject} from 'mobx-react';

@inject('translate')
class NoCamera extends Component{
	constructor(props){
		super(props);

		this.props.translate.text = 'makan';
		let data = this.props.translate.exec();
		console.log(data);
	}

	render() {
		return (
			<h1 className="error-no-camera">
				Your device doesnt have support for browser camera!
				<br />
				<br />
				Please try it on your desktop, Android or iOS device.
			</h1>
		)
	}
}

export default NoCamera;
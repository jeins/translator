import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

@inject('translate')
@observer
class NoCamera extends Component{
	state = {};

	constructor(props){
		super(props);
		this.translate = this.props.translate;
	}

	componentDidMount(){
		this.translate.queryText = 'tidur';
		this.translate.exec();
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
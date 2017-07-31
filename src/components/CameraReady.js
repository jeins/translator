import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

@inject('translate')
@observer
class CameraReady extends Component{
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
			<p>Hello World</p>
		)
	}
}

export default CameraReady;
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { observer, inject } from 'mobx-react';

import CameraService from '../services/CameraService';
import CameraReady from './CameraReady';

function hasGetUserMedia() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

@observer
class Main extends Component {
	constructor() {
		super();

		this.camera = new CameraService();
		this.camera.setDefaultProps();
	}

	render() {
		return (
			<CameraReady camera={this.camera} />
		)
	}
}

export default Main;
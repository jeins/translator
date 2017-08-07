import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { observer, inject } from 'mobx-react';

import CameraService from '../services/CameraService';
import StartCamera from './StartCamera';

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
			<div>
				<svg
					id="loading"
					className={this.camera.isSnapping ? 'active' : ''}
					width="65px"
					height="65px"
					viewBox="0 0 66 66"
				>
					<circle />
				</svg>
				
				<StartCamera camera={this.camera} />
			</div>
		)
	}
}

export default Main;
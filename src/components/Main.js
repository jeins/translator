import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { observer, inject } from 'mobx-react';

import CameraService from '../services/CameraService';
import Translate from '../services/Translate';
import ImageDetector from '../services/ImageDetector';
import StartCamera from './StartCamera';

function hasGetUserMedia() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

@observer
class Main extends Component {
	constructor() {
		super();

        this.imageDetector = new ImageDetector();
        this.translate = new Translate();
		this.camera = new CameraService();

		this.camera.setDefaultProps();
	}

	render() {
		if(this.translate.error || this.imageDetector.error){
			return (
				<h1 className="error-no-camera">
					Google API error! coba diperbaiki dulu...
				</h1>
			)
		} else {
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

				<StartCamera camera={this.camera} translate={this.translate} imageDetector={this.imageDetector} />
			</div>
		)
		}
	}
}

export default Main;
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import {observer, inject} from 'mobx-react';

import Translate from '../services/Translate';
import CameraService from '../services/CameraService';
import CameraReady from './CameraReady';
import ErrorNoCamera from './ErrorNoCamera';

@observer
class Main extends Component {
	constructor() {
		super();

		this.state = {
			hasUserMedia: true
		};

		this.camera = new CameraService();
	}

	componentDidMount() {
		this.camera
			.setEnumerateDevices()
			.then((source) => {
				if (!this.hasUserMedia() || !source) {
					this.setState({hasUserMedia: false});
				} else{
					this.camera.activateCamera();
				}
			});
	}

	hasUserMedia() {
		const fn = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		return fn ? fn.bind(navigator) : null;
	}

	render() {
		const translate = new Translate();
		
		if (!this.state.hasUserMedia) {
			return (
				<ErrorNoCamera />
			);
		} else {
			return (
				<Provider translate={translate}>
					<CameraReady />
				</Provider>
			);
		}
	}
}

export default Main;
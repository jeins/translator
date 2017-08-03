import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import ErrorNoCamera from './ErrorNoCamera';
import ImageCapture from './ImageCapture';

@inject('camera')
@observer
class CameraReady extends Component {
	state = {};

	constructor(props) {
		super(props);

		this.camera = this.props.camera;
	}

	componentDidMount() {
		this.requestUserMedia();
		this.setFullScreen();
	}

	componentWillUnmount() {
		if (this.camera.hasUserMedia) {
			if (this.stream.stop) {
				this.stream.stop();
			} else {
				if (this.stream.getVideoTracks) {
					this.stream.getVideoTracks().map(track => track.stop());
				}

				if (this.stream.getAudioTracks) {
					this.stream.getAudioTracks().map(track => track.stop());
				}
			}

			window.URL.revokeObjectURL(this.camera.objUrl);
		}
	}

	requestUserMedia() {
		let me = this;

		navigator.getUserMedia = navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;

		if (this.camera.audioSource && this.camera.videoSource) {
			this.setSelectedMediaSource();
		} else if ('mediaDevices' in navigator) {
			navigator.mediaDevices.enumerateDevices()
				.then((devices) => {
					me.findBestSource(devices);
					me.setSelectedMediaSource();
				})
				.catch((error) => {
					console.error(`${error.name}: ${error.message}`);
				});
		} else {
			MediaStreamTrack.getSources((sources) => {
				sources.forEach((source) => {
					if (source.kind === 'audio') {
						me.camera.audioSource = source;
					} else if (source.kind === 'video') {
						me.camera.videoSource = source;
					}
				});

				me.setSelectedMediaSource();
			});
		}
	}

	findBestSource(sources) {
		let source = null;

		if (this.camera.sourceSupport && sources) {
			if (this.camera.sourceEnumSupport) {
				for (let i = 0; i < sources.length; i++) {
					const candidate = sources[i];

					if (candidate.kind === 'videoinput') {
						if (typeof candidate.getCapabilities === 'function') {
							const capabilities = candidate.getCapabilities()

							if (capabilities && capabilities.facingMode === 'environment') {
								source = candidate
								break
							}
						}

						if (/facing back/i.test(candidate.label)) {
							source = candidate
							break
						}
					}
				}
			} else {
				source = sources.find(s => s.facing === 'environment');
				if (!source) {
					source = sources.find(s => s.kind === 'video')
				}
			}
		}

		this.camera.videoSource = source;
	}

	setSelectedMediaSource() {
		const constraints = {
			video: this.camera.videoSource ? {
				optional: [{ sourceId: this.camera.sourceEnumSupport ? this.camera.videoSource.deviceId : this.camera.videoSource.id }]
			} : true,
			audio: false
		};

		if (this.camera.allowAudio) {
			constraints.audio = {
				optional: [{ sourceId: this.camera.audioSource }]
			};
		}

		navigator.getUserMedia(constraints,
			(stream) => {
				const src = window.URL.createObjectURL(stream);

				this.stream = stream;
				this.camera.hasUserMedia = true;
				this.camera.objUrl = src;

				const canvas = document.getElementById('canvas');
				const videoEl = document.getElementById('video');

				videoEl.srcObject = stream;
				this.camera.video = videoEl;
				this.camera.canvas = canvas;
				this.camera.ctx = canvas.getContext('2d');
				this.camera.cameraReady = true;

				this.camera.onUserMedia();
			},
			(error) => {
				console.error(`${error.name}: ${error.message}`);
			}
		);
	}

	setFullScreen() {
		if (document.body.requestFullscreen) {
			document.body.requestFullscreen()
		} else if (document.body.webkitRequestFullscreen) {
			document.body.webkitRequestFullscreen()
		} else if (document.body.mozRequestFullScreen) {
			document.body.mozRequestFullScreen()
		} else if (document.body.msRequestFullscreen) {
			document.body.msRequestFullscreen()
		}
	}

	render() {
		console.log(this.camera.hasUserMedia)
		if (!this.camera.hasUserMedia) {
			return (
				<div>
					<ErrorNoCamera />
				</div>
			);
		} else {
			return (
				<div>
					<video
						id="video"
						autoPlay
						src={this.camera.objUrl}
					></video>
					<canvas
						id="canvas"
						width="640"
						height="640">
					</canvas>
					<ImageCapture camera={this.camera} />
				</div>
			);
		}
	}
}

export default CameraReady;
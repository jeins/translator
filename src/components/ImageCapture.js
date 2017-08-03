import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { findDOMNode } from 'react-dom';

import Translate from '../services/Translate';
import ImageDetector from '../services/ImageDetector';

@observer
class ImageCapture extends Component {
    constructor(props) {
        super(props);

        this.imageDetector = new ImageDetector();
        this.translate = new Translate();

        this.camera = this.props.camera;
        this.state = { isStart: true };
    }

    captureImage() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const videoWidth = this.camera.video.videoWidth;
        const videoHeight = this.camera.video.videoHeight;

        if (windowWidth >= this.camera.breakPoint) {
            const cropSize = Math.min(windowWidth, windowHeight) * this.camera.targetPct;
            const sourceSize = (cropSize / Math.max(windowWidth, windowHeight)) * videoWidth;

            this.camera.ctx.drawImage(
                this.camera.video,
                Math.round(((windowWidth / 2 - (cropSize / 2)) / windowWidth) * windowWidth),
                Math.round(((windowHeight * this.camera.targetTop - (cropSize / 2)) / windowHeight) * windowHeight),
                sourceSize, sourceSize,
                0, 0,
                this.camera.canvasSize, this.camera.canvasSize
            );
        } else {
            this.camera.ctx.drawImage(
                this.camera.video,
                (videoWidth - videoHeight) / 2,
                0,
                videoHeight, videoHeight,
                0, 0,
                this.camera.canvasSize, this.camera.canvasSize
            );
        }

        let capturedImage = this.camera.canvas.toDataURL(this.camera.screenshotFormat, 1).replace('data:image/jpeg;base64,', '');
        this.getTextFromCapturedImage(capturedImage);
    }

    getTextFromCapturedImage(capturedImage) {
        this.imageDetector.exec(capturedImage)
            .then(
            ({ data }) => {
                let labelAnnotations = data.responses[0].labelAnnotations;
                this.imageDetector.bestResult = labelAnnotations.slice(0, 3);

                this.translate.exec(this.imageDetector.bestResult[0].description);

                this.setState({ isStart: false });
            }, (error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div id="main">
                {!this.state.isStart && <div className="row"><h2>{this.translate.resultText[0].text}</h2><h4>{this.translate.resultText[0].lang}</h4></div>}
                <div className='capture-btn' onClick={() => this.captureImage()}></div>
                {this.state.isStart && this.camera.cameraReady && <h5 className="first-message">aplikasi siap, silakan coba foto object!</h5>}
            </div>
        )
    }
}

export default ImageCapture;
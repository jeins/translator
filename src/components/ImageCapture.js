import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { findDOMNode } from 'react-dom';

@observer
class ImageCapture extends Component {
    constructor(props) {
        super(props);

        this.imageDetector = this.props.imageDetector;
        this.translate = this.props.translate;
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
        this.camera.isSnapping = true;
        this.imageDetector.exec(capturedImage)
            .then(
            ({ data }) => {
                let labelAnnotations = data.responses[0].labelAnnotations;
                this.imageDetector.bestResult = labelAnnotations.slice(0, 3);
                
                this.translate.resultText = {};
                this.translate.exec(this.imageDetector.bestResult[0].description)
                    .then((result) => {
                        this.camera.isSnapping = false;
                        this.setState({ isStart: false });
                    }, (error) => {
                        console.error(error);
                        this.camera.isSnapping = false;
                    })
            }, (error) => {
                console.error(error);
                this.camera.isSnapping = false;
            });
    }

    render() {
        if(this.camera.isSnapping) {
            return (<div></div>)
        }
        return (
            <div id="main">
                {!this.state.isStart && 
                    <div>
                        <div className="row">
                            <h2><span>[Deutsch]:</span><br/> {this.translate.resultText.de}</h2>
                        </div>

                        <div className="row">                                        
                            <h2><span>[Bahasa]:</span><br/> {this.translate.resultText.id}</h2>
                        </div>
                    </div>
                }
                <div className='capture-btn' onClick={() => this.captureImage()}></div>
                {this.state.isStart && this.camera.cameraReady && <h5 className="first-message">aplikasi siap, silakan coba foto object!</h5>}
            </div>
        )
    }
}

export default ImageCapture;
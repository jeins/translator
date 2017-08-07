import axios from 'axios';
import { observable, action, toJS } from 'mobx';
import { apiUrls } from '../config';

class ImageDetector {
    @observable bestResult;
    @observable error = false;

    @action
    async exec(capturedImage) {
        try {
            let request = {
                requests: [{
                    image: {
                        content: capturedImage
                    },
                    features: { type: 'LABEL_DETECTION', maxResults: 5 }
                }]
            };

            return await axios.post(apiUrls.cloudVision, request);
        } catch (err) {
            this.error = true;
            this.camera.isSnapping = false;
            console.error(err);
        }
    }

    @action
    async execFromImageUri(imageUri) {
        try {
            let request = {
                requests: [{
                    image: {
                        source: {
                            imageUri: imageUri
                        }
                    },
                    features: { type: 'LABEL_DETECTION', maxResults: 5 }
                }]
            };

            return await axios.post(apiUrls.cloudVision, request);
        } catch (err) {
            this.error = true;
            console.error(err);
        }
    }
}

export default ImageDetector;
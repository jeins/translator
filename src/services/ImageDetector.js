import axios from 'axios';
import { observable, action, toJS } from 'mobx';
import { apiUrls } from '../config';

class ImageDetector {
    @observable bestResult;

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
                            imageUri: "https://storage.googleapis.com/translator99/demo-image.jpg"
                        }
                    },
                    features: { type: 'LABEL_DETECTION', maxResults: 5 }
                }]
            };

            return await axios.post(apiUrls.cloudVision, request);
        } catch (err) {
            console.error(err);
        }
    }
}

export default ImageDetector;
import axios from 'axios';
import { observable, action, toJS } from 'mobx';
import { apiUrls } from '../config';

class Translate {
    @observable sourceLanguage = 'en';
    @observable targetLanguages = ['de', 'id'];
    @observable resultText = {};
    @observable error = false;

    @action
    async exec(queryText) {
        try {
            return await Promise.all(this.targetLanguages.map(async (targetLang) => {
                let request = {
                    q: queryText,
                    source: this.sourceLanguage,
                    target: targetLang
                };

                let { data } = await axios.post(apiUrls.translate, request);
                this.resultText[targetLang] = data.data.translations[0].translatedText;
            }));
        } catch (err) {
            this.error = true;
            this.camera.isSnapping = false;
            console.error(err);
        }
    }
}

export default Translate;
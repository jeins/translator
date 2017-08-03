import axios from 'axios';
import { observable, action, toJS } from 'mobx';
import { apiUrls } from '../config';

class Translate {
    @observable sourceLanguage = 'en';
    @observable targetLanguages = ['de', 'id'];
    @observable resultText = [];

    @action
    async exec(queryText) {
        try {
            for (let targetLang of this.targetLanguages) {
                let request = {
                    q: queryText,
                    source: this.sourceLanguage,
                    target: targetLang
                };

                let { data } = await axios.post(apiUrls.translate, request);
                this.resultText.push({
                    lang: targetLang,
                    text: data.data.translations[0].translatedText
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
}

export default Translate;
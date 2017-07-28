import axios from 'axios';
import {observable, action, toJS} from 'mobx';
import {apiUrls} from '../config';

class Translate{
    @observable sourceLanguage = 'id';
    @observable targetLanguage = 'de';
    @observable text;    
    @observable langMap = {
        indonesia: 'id',
        english: 'en',
        germany: 'de'
    };

    @action
    async exec(){
        try{
            let request = {
                q: this.text,
                source: this.sourceLanguage,
                target: this.targetLanguage
            };
            
            let {data} = await axios.post(apiUrls.translate, request);
console.log(data.data);
            return data.data.translations[0].translatedText;
        } catch(err){
            console.error(err);

            return null;
        }
    }

    @action
	speak(text, lang, cb) {
		const {speachSynthesis, SpeechSynthesisUtterance} = window;
		let speechSupport = speechSynthesis && SpeechSynthesisUtterance;

		if(!speechSupport){
			cb();
			return;
		}

		const message = new SpeechSynthesisUterance;
		message.txt = txt;
		message.lang = voice
    }
}

export default Translate;
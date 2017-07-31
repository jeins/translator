import axios from 'axios';
import {observable, action, toJS} from 'mobx';
import {apiUrls} from '../config';

class Translate{
    @observable sourceLanguage = 'id';
    @observable targetLanguage = 'de';
    @observable queryText;    
    @observable resultText;
    @observable langMap = {
        indonesia: 'id',
        english: 'en',
        germany: 'de'
    };

    @action
    async exec(){
        try{
            let request = {
                q: this.queryText,
                source: this.sourceLanguage,
                target: this.targetLanguage
            };
            
            let {data} = await axios.post(apiUrls.translate, request);
            this.resultText = data.data.translations[0].translatedText;
        } catch(err){
            console.error(err);
        }
    }
}

export default Translate;
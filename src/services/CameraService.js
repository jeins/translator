import {observable, action, toJS} from 'mobx';

const { MediaStreamTrack } = window;
const sourceEnumSupport = navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
const streamTrackSupport = MediaStreamTrack && MediaStreamTrack.getSources;
const sourceSupport = sourceEnumSupport || streamTrackSupport;

class CameraService{
	@observable source;
	@observable test = "asd";

	@action
	async setEnumerateDevices() {
		let sources = await navigator.mediaDevices.enumerateDevices();
		return this.findCameraSource(sources);
	}

	@action
	findCameraSource(sources){
		let source = null;

		if(sources && sourceSupport){
			if(sourceEnumSupport){
				for(let i=0; i<sources.length; i++){
					const tmpSrc = sources[i];

					if(tmpSrc.kind === 'videoinput'){
						if(typeof tmpSrc.getCapabilities === 'function'){
							let capabilities = tmpSrc.getCapabilities();

							if(capabilities && capabilities.facingMode === 'environment'){
								source = tmpSrc;
								break;
							}
						}

						if(/facing back/i.test(tmpSrc.label)){
							source = tmpSrc;
							break;
						}
					}
				}
			} else{
				source = sources.find(s => s.facing === 'environment');
				if(!source){
					source = sources.find(s => s.kind === 'video'); 
				}
			}
		}

		return source;
	}
}

export default CameraService;
import {observable, action, toJS} from 'mobx';

const { MediaStreamTrack } = window;
const sourceEnumSupport = navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
const streamTrackSupport = MediaStreamTrack && MediaStreamTrack.getSources;
const sourceSupport = sourceEnumSupport || streamTrackSupport;

class CameraService{
	@observable source;

	@action
	activateCamera(){
		let videoSrc = {
			optional: [{sourceId: sourceEnumSupport ? this.source.deviceId : this.source.id}]
		};
		let constraints = {
			audio: false,
			video: this.source ? videoSrc : true
		};
		
		navigator.getUserMedia(constraints, (stream) => {
			if(sourceEnumSupport && !this.source){
				setTimeout(()=>{
					stream.getTracks().forEach(track => track.stop());
					this.setEnumerateDevices();
				}, 1);

				return;
			}
			
			const canvas = document.getElementById('canvas');
			const videoEl = document.getElementById('video');

			videoEl.srcObject = stream;
		}, () => alert("error"));
	}

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
						/*
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
						}*/
						source = tmpSrc;
						break;
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
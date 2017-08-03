import {observable, action, toJS} from 'mobx';

const { MediaStreamTrack } = window;
const csSourceEnumSupport = navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
const csStreamTrackSupport = MediaStreamTrack && MediaStreamTrack.getSources;
const csSourceSupport = csSourceEnumSupport || csStreamTrackSupport;

class CameraService{
	@observable hasUserMedia = false;
	@observable allowAudio;
	@observable muted;
	@observable className;
	@observable height;
	@observable width;
	@observable onUserMedia: () => {};
	@observable screenshotFormat;
	@observable audioSource;
	@observable videoSource;
	@observable objUrl;
	@observable sourceSupport = csSourceSupport;
	@observable streamTrackSupport = csStreamTrackSupport;
	@observable sourceEnumSupport = csSourceEnumSupport;

	@action
	setDefaultProps(){
		this.allowAudio = false;
		this.muted = true;
		this.className = '';
		this.height = 640;
		this.width = 640;
		this.screenshotFormat = 'image/jpeg';
		this.audioSource = null;
		this.videoSource = null;
		this.objUrl = null;
	}
}

export default CameraService;
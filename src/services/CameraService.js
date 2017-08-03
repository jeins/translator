import {observable, action, toJS} from 'mobx';

const { MediaStreamTrack } = window;
const csSourceEnumSupport = navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
const csStreamTrackSupport = MediaStreamTrack && MediaStreamTrack.getSources;
const csSourceSupport = csSourceEnumSupport || csStreamTrackSupport;

class CameraService{
	@observable hasUserMedia = false;
	@observable allowAudio;
	@observable height;
	@observable width;
	@observable onUserMedia: () => {};
	@observable screenshotFormat;
	@observable videoSource;
	@observable objUrl;
	@observable breakPoint;
	@observable canvasSize;
	@observable targetPct;
	@observable targetTop;
	@observable video;
	@observable canvas;
	@observable ctx;
	@observable cameraReady;
	@observable sourceSupport = csSourceSupport;
	@observable streamTrackSupport = csStreamTrackSupport;
	@observable sourceEnumSupport = csSourceEnumSupport;

	@action
	setDefaultProps(){
		this.allowAudio = false;
		this.height = 640;
		this.width = 640;
		this.screenshotFormat = 'image/jpeg';
		this.audioSource = null;
		this.videoSource = null;
		this.objUrl = null;
		this.breakPoint = 800;
		this.canvasSize = 640;
		this.targetPct = 0.7;
		this.targetTop = 0.4;
		this.cameraReady = false;
	}
}

export default CameraService;
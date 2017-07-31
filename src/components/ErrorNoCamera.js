import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

@observer
class ErrorNoCamera extends Component{
	render() {
		return (
			<h1 className="error-no-camera">
				Your device doesnt have support for browser camera!
				<br />
				<br />
				Please try it on your desktop, Android or iOS device.
			</h1>
		)
	}
}

export default ErrorNoCamera;
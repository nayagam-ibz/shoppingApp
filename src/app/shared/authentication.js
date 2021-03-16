import React from 'react';
import SignIn from '../shared/auth/signin';
import SignUp from '../shared/auth/signup';

class Authentication extends React.Component {
	state = {auth: true};

	changeRegistration = () => {
		this.setState({auth: false});
	};

	changeLogin = () => {
		this.setState({auth: true});
	};

	onClose = (res) => {
		this.props.sheetClose(res);
	};

	render() {
		if (this.state.auth) {
			return (
				<SignIn
					changeRegistration={this.changeRegistration}
					onClose={this.onClose}
				/>
			);
		} else {
			return <SignUp changeLogin={this.changeLogin} onClose={this.onClose} />;
		}
	}
}

export default Authentication;


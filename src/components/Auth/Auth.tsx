import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';

interface State {
	isSignedIn: boolean | null;
}
class Auth extends Component<any, State> {
	constructor(props: any) {
		super(props);
		// The component's Local state.
		this.state = {
			isSignedIn: null, // Local signed-in state.
		};
	}

	// Listen to the Firebase Auth state and set the local state.
	componentDidMount() {
		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
	}

	// Make sure we un-register Firebase observers when the component unmounts.
	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	unregisterAuthObserver(): void {}

}

export default Auth;

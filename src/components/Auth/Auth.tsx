import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
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

	// render() {
	// 	console.log(this.state.isSignedIn);
	// 	if (this.state.isSignedIn === undefined) {
	// 		return <div> loading ...</div>;
	// 	} else if (this.state.isSignedIn === false) {
	// 		return (
	// 			<div>
	// 				<h1>My App</h1>
	// 				<p>Please sign-in:</p>
	// 				<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
	// 			</div>
	// 		);
	// 	} else {
	// 		const user = firebase.auth()?.currentUser;
	// 		return (
	// 			<main role="main" className="main" style={{ width: '40vw', margin: 'auto' }}>
	// 				<AppBar layout={"default"}/>
	// 				<ItemList />
	// 			</main>
	// 		);
	// 	}
	// }
}

export default Auth;

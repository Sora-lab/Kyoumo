import React from 'react';
// Components
import Container from './Container';
import Auth from './Auth/Auth';

// firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'firebase/auth';
class App extends Auth {
	// Configure FirebaseUI.
	uiConfig = {
		// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		// We will display Google and Facebook as auth providers.
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
		],
		callbacks: {
			// Avoid redirects after sign-in.
			signInSuccessWithAuthResult: () => false,
		},
	};
	render() {
		<Auth />;
		if (this.state.isSignedIn) {
			return (
				<main role="main" className="main">
					<Container />
				</main>
			);
		} else if(this.state.isSignedIn === null){
			return (
				<main role="main" className="main">
					<p>loading....</p>
					<div style={{marginTop: '50px'}}><div className='bounce-6 bounce-ball'></div></div>
				</main>
			);
		} else {
      return (
				<main role="main" className="main">
					<h1>My App</h1>
					<p>Please sign-in:</p>
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
				</main>
			);
    }
	}
}
export default App;

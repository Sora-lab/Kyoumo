import React from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

// initial query  = today, +- 1day
// calender scroll

export interface Item {
	title: string;
	note?: string;
	start?: number;
	end?: number;
	type?: string;
}

class QueryItems {
	db = firebase.firestore();
	userId = firebase.auth()?.currentUser?.uid;
	// items = this.db
	// 	.collection('users')
	// 	.doc(this.userId)
	// 	.collection('items');

	query = this.db
		.collection('users')
		.doc(this.userId)
		.collection('items')
    .where('end', '>', 0);
    
	constructor() {}

	getByDays(start: number, end: number) {}

	getByTitle(title: string) {}
}

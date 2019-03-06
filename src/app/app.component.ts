import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	ngOnInit() {
		firebase.initializeApp({
			apiKey: "AIzaSyBRWnsbUuzKbDCbYpqk9g_b9qamXxbV5N0",
   			authDomain: "my-ng-recipe-book-b0167.firebaseapp.com"
		})
	}
}

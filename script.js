/* 
    How to use firebase:
    1. Connect to firebase. (api keys) X
    2. CRUD
        - Create X
        - Read
        - Update
        - Delete
    3. Display data.
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, onValue, update, push, child } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "",
//     databaseURL: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: ""
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Selects the form element and the result element
const form = document.getElementById('form');
const results = document.getElementById('results');

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Created directory object and add it to firebase
function addData(name, url, author, github) {
    const directory = {
        name: name.value,
        url: url.value,
        author: author.value,
        github_link: github.value
    }

    // Get a key for a new directory
    const newPostKey = push(child(ref(database), 'sites')).key;

    const updates = {};

    // Add directory object into updates object.
    updates['/sites' + newPostKey] = directory;

    // Update database with updates
    return update(ref(database), updates);
};

// Create Element
function createElement(db) {
    const element = document.createElement('p');
    element.innerText = `name: ${db.name} url: ${db.url} github: ${db.github_link}`
    results.append(element)
}

// retrieves data from firebase
function showData() {
    const reference = ref(database, '/');
    onValue(reference, function(snapshot) {
        snapshot.forEach(childSnapshot => {
            createElement(childSnapshot.val())
        })
    })
}

// Show users on screen
window.onload = showData;

// Store form data into firebase database
form.onsubmit = function() {
    
    const siteName = document.getElementById('siteName');
    const siteUrl = document.getElementById('siteUrl');
    const siteAuthor = document.getElementById('siteAuthor');
    const githubUrl = document.getElementById('githubUrl');

    addData(siteName, siteUrl, siteAuthor, githubUrl);

    return false;
}
    

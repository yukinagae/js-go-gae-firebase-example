var backendHostUrl = 'https://backend-dot-[Your PROJECT ID].appspot.com';

// Obtain the following from the "Add Firebase to your web app" dialogue
// Initialize Firebase
// TODO: replace the below
var config = {
    apiKey: "[Your Web API Key]",
    authDomain: "[Your PROJECT ID].firebaseapp.com",
    databaseURL: "https://[Your PROJECT ID].firebaseio.com",
    projectId: "[Your PROJECT ID]",
    storageBucket: "gs://[Your PROJECT ID].appspot.com",
    messagingSenderId: "[Your Sender ID]"
};

// This is passed into the backend to authenticate the user.
var userIdToken = null;
var user = null;
var userID = null;
var data = null;

// Firebase log-in
function configureFirebaseLogin() {

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $('#logged-out').hide();

            user.getIdToken().then(function(idToken) {
                userIdToken = idToken;

                $('#user').text(user.displayName);
                $('#email').text(user.email);
                $('#key').text(userIdToken);
                $('#logged-in').show();

                fetcUserInfoViaGoBackend()
            });

        } else {
            $('#logged-in').hide();
            $('#logged-out').show();

        }
    });
}

// Firebase log-in widget
function configureFirebaseLoginWidget() {
    var uiConfig = {
        'signInSuccessUrl': '/',
        'signInOptions': [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url
        'tosUrl': '<your-tos-url>',
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
}

function fetcUserInfoViaGoBackend() {
    $.ajax(backendHostUrl + '/', {
        headers: {
            'Authorization': 'Bearer ' + userIdToken
        }
    }).then(function(_data) {
        var data = _data;
        console.log(data)
        $('#data').text(data);
    });
}


// Sign out a user
var signOutBtn = $('#sign-out');
signOutBtn.click(function(event) {
    event.preventDefault();

    firebase.auth().signOut().then(function() {
        console.log("Sign out successful");
    }, function(error) {
        console.log(error);
    });
});

configureFirebaseLogin();
configureFirebaseLoginWidget();

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

var verifyPhoneBtn = $('#verify-phone');
verifyPhoneBtn.click(function(event) {
    var phoneNumber = document.getElementById("phone").value;
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
        }).catch(function(error) {
            console.log(error)
        });
})

var verifyCodeBtn = $('#verify-code');
verifyCodeBtn.click(function(event) {
    var code = document.getElementById("code").value;
    confirmationResult.confirm(code).then(function(result) {
        var user = result.user;
        console.log(user)
        alert(user)
    }).catch(function(error) {
        console.log(error)
    });
})
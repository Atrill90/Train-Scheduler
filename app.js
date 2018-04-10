$(document).ready(function () {


    // Initialize Firebase
    let config = {
        apiKey: "AIzaSyDluehKne05wwPpXBIF371rROE04UlfxBA",
        authDomain: "train-scheduler-6b300.firebaseapp.com",
        databaseURL: "https://train-scheduler-6b300.firebaseio.com",
        projectId: "train-scheduler-6b300",
        storageBucket: "",
        messagingSenderId: "583999577906"
    };
    firebase.initializeApp(config);

    let database = firebase.database();

    $("#submit").on("click", function (e) {
        e.preventDefault();
       
        trainName = $("#nameInput").val().trim();
        trainDest = $("#destinationInput").val().trim();
        trainTime = $("#timeInput").val().trim();
        nextTrain = $("#frequencyInput").val().trim();



    });
});
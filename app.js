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
        console.log(trainName);
        console.log(trainDest);
        console.log(trainTime);
        console.log(nextTrain);
        database.ref().push({

            name: trainName,
            destination: trainDest,
            firstDeparture: trainTime,
            nextTrain: nextTrain,
        });


    });

    database.ref().on("child_added", function (childSnapshot, ) {
        let newTRow = $("<tr>");
        let trainHolder = $("<td>");
        let trainDestHolder = $("<td>");
        let trainTimeHolder = $("<td>");
        let nextTrainHolder = $("<td>");

        newTRow.append(trainHolder, trainDestHolder, trainTimeHolder, nextTrainHolder,);
        $("#stats").append(newTRow);

        let trainName = "";
        let trainRole = "";
        let trainSD = "";
        let nextTrain = "";


        $(trainHolder).html(childSnapshot.val().name);
        $(trainDestHolder).html(childSnapshot.val().destination);
        $(trainTimeHolder).html(childSnapshot.val().firstDeparture);
        $(nextTrainHolder).html(childSnapshot.val().nextTrain);
    });
});
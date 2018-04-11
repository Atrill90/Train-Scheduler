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
        
        database.ref().push({

            name: trainName,
            destination: trainDest,
            firstDeparture: trainTime,
            nextTrain: nextTrain,
        });
        $("#nameInput").val("");
        $("#destinationInput").val("");
        $("#timeInput").val("");
        $("#frequencyInput").val("");
    });

    database.ref().on("child_added", function (childSnapshot, ) {
        let newTRow = $("<tr>");
        let trainHolder = $("<td>");
        let trainDestHolder = $("<td>");
        let trainTimeHolder = $("<td>");
        let nextTrainHolder = $("<td>");
        let nextArr = $("<td>");
        let nextTrainT = $("<td>");
        
        newTRow.append(trainHolder, trainDestHolder, trainTimeHolder, nextTrainHolder,nextArr,nextTrainT);
        $("#stats").append(newTRow);

        let trainName = childSnapshot.val().name;
        let trainDest = childSnapshot.val().destination;
        let trainFD = childSnapshot.val().firstDeparture;
        let trainFreq = parseInt(childSnapshot.val().nextTrain);
        let trainFDMinutes = moment(trainFD,"hh/mm");
        let timeDiff = moment().diff(trainFDMinutes, "minutes");
        let remainder = Math.abs(timeDiff%trainFreq);
        let tMinutesTillTrain = trainFreq - remainder;
        let nextTrainTimeMin = moment().add(tMinutesTillTrain,"minutes").format("hh:mm");

       

        $(trainHolder).html(trainName);
        $(trainDestHolder).html(trainDest);
        $(trainTimeHolder).html(trainFD);
        $(nextTrainHolder).html(trainFreq + " minutes");
        $(nextArr).html(tMinutesTillTrain + " minutes");
        $(nextTrainT).html(nextTrainTimeMin)
    });
   
    
});







//Starting time >>>>> Compare it to the currrent time >>>>>> 
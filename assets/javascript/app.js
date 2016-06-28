var config = {
	apiKey: "AIzaSyDlzy2PV20pFZAZpXUeu-GO5SfD5ESnHes",
	authDomain: "rockpaperscissor-eecdd.firebaseapp.com",
	databaseURL: "https://rockpaperscissor-eecdd.firebaseio.com",
	storageBucket: "rockpaperscissor-eecdd.appspot.com",
};

firebase.initializeApp(config);

var db = firebase.database().ref();

var player1Wins = 0;
var player1Losses = 0;
var player2Wins = 0;
var player2Losses = 0;
var user1Ready;
var user2Ready;
var user1Choose;
var user2Choose;
var time = 3;
var counter;

function reset(){
	$('#resultArea').empty();
	// _____Need to Fix_____
	$('#status').empty();
	$('#p1Rock').empty();
	$('#p1Paper').empty();
	$('#p1Scissor').empty();
	$('#status').empty();
	$('#p2Rock').empty();
	$('#p2Paper').empty();
	$('#p2Scissor').empty();
	// _____Need to Fix_____
}

db.set({
	playerOne: {
		name : "",
		wins : player1Wins,
		losses : player1Losses,
		choice : ""
	},
	playerTwo : {
		name : "",
		wins : player2Wins,
		losses : player2Losses,
		choice : ""
	},
});

var enterPlayer1 = db.child('playerOne').child('name');
var enterPlayer2 = db.child('playerTwo').child('name');

$('#startButton').on('click', function() {
var userName = $('#userNameInput').val();
	if (!user1Ready && !user2Ready) {
		enterPlayer1.set(userName);
		$('#userSection').empty().append("<h2>" + "Hi " + userName + "! " + "You are player 1." + "</h2>");
	} else if (user1Ready && !user2Ready) {
		enterPlayer2.set(userName);
		$('#userSection').empty().html("<h2>" + "Hi " + userName + "! " + "You are player 2." + "</h2>");
	} else if (!user1Ready && user2Ready) {
		enterPlayer1.set(userName);
	}
	$('#userNameInput').val("");
	return false;
});

db.on('value', function(snapshot) {
	var dbValue = snapshot.val();
	user1Ready = dbValue.playerOne.name;
	user2Ready = dbValue.playerTwo.name;
	user1Choose = dbValue.playerOne.choice;
	user2Choose = dbValue.playerTwo.choice;

	if (user1Ready) {
		$('#player1NameDisplay').empty().html(user1Ready);
		$('#player1Score').html("Wins: " + dbValue.playerOne.wins + " " + "Losses: " + dbValue.playerOne.losses);
	}
	if (user1Ready && user2Ready) {
		$('#player2NameDisplay').empty().html(user2Ready);
		$('#player2Score').html("Wins: " + dbValue.playerTwo.wins + " " + "Losses: " + dbValue.playerTwo.losses);

		// _____Need to Fix_____
		$('#status').html("Waiting for " + user1Ready + " to choose.");
		$('#p1Rock').html("Rock").val("Rock");
		$('#p1Paper').html("Paper").val("Paper");
		$('#p1Scissor').html("Scissor").val("Scissor");
		$('#status').html("Waiting for " + user2Ready + " to choose.");
		$('#p2Rock').html("Rock").val("Rock");
		$('#p2Paper').html("Paper").val("Paper");
		$('#p2Scissor').html("Scissor").val("Scissor");
		// _____Need to Fix_____
	}

	if (user1Choose) {
		$('#rpsZone1').empty().html("<h2>" + user1Choose + "</h2>");
	}
	if (user1Choose && user2Choose) {
		$('#rpsZone2').empty().html("<h2>" + user2Choose + "</h2>");
		if ((user1Choose == "Rock") && (user2Choose == "Scissor")){
			dbValue.playerOne.wins++;
			dbValue.playerTwo.losses++;
			$('#resultArea').append("<h2>" + user1Ready + " Wins!" + "</h2>");
		}else if ((user1Choose == "Rock") && (user2Choose == "Paper")){
			dbValue.playerOne.losses++;
			dbValue.playerTwo.wins++;
			$('#resultArea').append("<h2>" + user2Ready + " Wins!" + "</h2>");
		}else if ((user1Choose == "Scissor") && (user2Choose == "Rock")){
			dbValue.playerOne.losses++;
			dbValue.playerTwo.wins++;
			$('#resultArea').append("<h2>" + user2Ready + " Wins!" + "</h2>");
		}else if ((user1Choose == "Scissor") && (user2Choose == "Paper")){
			dbValue.playerOne.wins++;
			dbValue.playerTwo.losses++;
			$('#resultArea').append("<h2>" + user1Ready + " Wins!" + "</h2>");
		}else if ((user1Choose == "Paper") && (user2Choose == "Rock")){
			dbValue.playerOne.wins++;
			dbValue.playerTwo.losses++;
			$('#resultArea').append("<h2>" + user1Ready + " Wins!" + "</h2>");
		}else if ((user1Choose == "Paper") && (user2Choose == "Scissor")){
			dbValue.playerOne.losses++;
			dbValue.playerTwo.wins++;
			$('#resultArea').append("<h2>" + user2Ready + " wins!" + "</h2>");
		}else if (user1Choose == user2Choose){
			$('#resultArea').append("<h2>" + "Tie Game!" + "</h2>");
		}
		setTimeout(reset, 3 *1000);
	}
}, function(errorObject){
	console.error(errorObject);
});


$('.rpsSelection').on('click', function(){
	var playerChoice = $(this).val();
	console.log(playerChoice);
	if (!user1Choose && !user2Choose) {
			db.child('playerOne').child('choice').set(playerChoice);
	} else if (user1Choose && !user2Choose) {
			db.child('playerTwo').child('choice').set(playerChoice);
	}
});
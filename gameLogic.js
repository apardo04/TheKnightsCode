import wixData from 'wix-data';

let curQuestion = 0;
let quesArr = [];
let p0c = false;
let p1c = false;
let p0h = 3;
let p1h = 3;
let firstP = -1;
let p0Temp = "nothing";
let p1Temp = "nothing";
$w.onReady(async function () {
	//TODO: write your page related code here...
	setTimeout(()=>{$w('#input1').focus();},100);

	let res = await wixData.query('beginnerQuestions').find();
	for(let x in res.items){
		quesArr.push(res.items[x]);	
		//console.log(res.items[x]);	
	}
	console.log(quesArr);
	setQuestion();
	//console.log(quesArr);
	
});

export function input1_keyPress(event) {
	setTimeout( checkKeyValue, 100);
}

async function checkKeyValue() {
	let val = $w('#input1').value;
	console.log("val = " + val);
	
	if (!p0c && (val === 'w' || val === 's' || val === 'x')){
		console.log("player 0 enter answer");
		console.log("player 0 entered "+val);
		p0c = true;
		if(firstP === -1){
			firstP = 0;
		}		
		if (val === 'w') {
			p0Temp = '1';
		}
		else if (val === 's') {
			p0Temp = '2';
			console.log("inside val === s WTF!!! p0Temp = " + p0Temp);
		}
		else if (val === 'x') {
			p0Temp = '3';
		}
		console.log("p0temp still = " + p0Temp);
	}
	else if(!p1c && (val === 'u' || val === 'j' || val === 'm')){
		console.log("player 1 enter answer");
		console.log("player 1 entered "+val);
		p1c = true;
		if(firstP === -1){
			firstP = 1;
		}		
		if (val === 'u') {
			p1Temp = '1';
		}
		else if (val === 'j') {
			p1Temp = '2';
		}
		else if (val === 'm') {
			p1Temp = '3';
		}
	}
	
	if(p0c && p1c){
		console.log("firstP = " + firstP)
		if (firstP === 0){
			if (checkAnswer(p0Temp)){
				console.log("checked P0");
				playerAttack(0);
			}
			else if (checkAnswer(p1Temp)){
					console.log("checked P1");
					playerAttack(1);
				
			}
		}
		else if (firstP === 1) {
			if (checkAnswer(p1Temp)){
				console.log("checked P1");
				playerAttack(1);
			}
			else if (checkAnswer(p0Temp)){
					console.log("checked P0");
					playerAttack(0);				
			}
		}
		checkWinner();
		console.log("reset start");
		curQuestion++;
		questionPopulateAnimation();
		p0c=false;
		p1c=false;
		firstP = -1;
		console.log("reset complete");
		p0Temp = "nothing";
		p1Temp = "nothing";
	}
	$w('#input1').value = '';
}

export function input1_blur(event) {
	$w('#input1').focus();
}

export function readyBtn_click(event) {
	$w('#readyBtn').hide();

	

	$w('#vectorImage1').show();
	$w('#vectorImage2').show();
	$w('#vectorImage3').show();
	$w('#vectorImage4').show();
	$w('#vectorImage5').show();
	$w('#vectorImage6').show();

	$w('#text21').show();
	$w('#text22').show();
	$w('#text23').show();
	$w('#text24').show();
	$w('#text25').show();
	$w('#text26').show();
	
	questionPopulateAnimation();
	
	$w('#answer1Text').show();
	$w('#answer2Text').show();
	$w('#answer3Text').show();
	
}

function setQuestion(){
	console.log(quesArr[curQuestion]);
	$w('#question').text = quesArr[curQuestion]['title'];
	$w('#answer1Text').text = quesArr[curQuestion]['answer1'];
	$w('#answer2Text').text = quesArr[curQuestion]['answer2'];
	$w('#answer3Text').text = quesArr[curQuestion]['answer3'];
}

function checkAnswer(a){
	console.log(a+": pass answer");
	console.log(quesArr[curQuestion]['correctAnswer']+": correct answer");
	if (a === quesArr[curQuestion]['correctAnswer']){
		console.log(quesArr[curQuestion]['correctAnswer']+": correct answer");
		return true;	
	}
	console.log("checkAnswer() returning false");
	return false;
}

function playerAttack(p){
	$w("#idleP0").hide();
	$w("#idleP1").hide();
	$w('#attackP'+p).show(); 
	if (p === 1) {
		$w("#hitP0").show();
	}
	else {
		$w("#hitP1").show();
	}	
	setTimeout(()=>{
		$w('#attackP'+p).hide();
		if (p === 1) {
			$w("#hitP0").hide();
		}
		else {
			$w("#hitP1").hide();
		}
		$w("#idleP0").show();
		$w("#idleP1").show();
	}, 2000);
	
        
	if (p === 0){
		playerDamage(1);		
	}
	else if (p === 1){
		playerDamage(0);		
	}
}
function playerDamage(p){	
	if (p === 0){
		console.log("player 1 damaging 0");
		$w('#heartFull'+p0h+'P0').hide();
		$w('#heartEmpty'+p0h+'P0').show();
		console.log("damage started");
		p0h--;
		if (p0h === 0) {
			$w("#idleP0").hide();
			setTimeout(()=>{
				$w("#idleP0").hide();
				$w("#deathP0").show();
			},2000);
		}
	}
	else if (p === 1){
		console.log("player 0 damaging 1");
		$w('#heartFull'+p1h+'P1').hide();
		$w('#heartEmpty'+p1h+'P1').show();
		console.log("damage started");
		p1h--;
		if (p1h === 0) {
			$w("#idleP1").hide();
			setTimeout(()=>{
				$w("#idleP1").hide();
				$w("#deathP1").show();
			},2000);
		}
	}
	console.log("damage done");
}

function questionPopulateAnimation(){
	$w('#question').hide();
	$w('#answer1').hide();
	$w('#answer2').hide();
	$w('#answer3').hide();
	setQuestion();
	$w('#question').show();
	$w('#answer1').show();
	$w('#answer2').show();
	$w('#answer3').show();
	
}

function checkWinner(){
	if (curQuestion===4){
		if (p0h > p1h){
			$w('#winnerText').text = 'Player 0 Wins!';
		}
		else if (p1h > p0h){
			$w('#winnerText').text = 'Player 1 Wins!';
		}
		else if (p0h === p1h){
			$w('#congratText').text = 'Oh No!'
			$w('#winnerText').text = 'It was a tie!'
		}
		$w('#winnerBox').show();
	}
	else if (p0h === 0){
		$w('#winnerText').text = 'Player 1 Wins!';
		$w('#winnerBox').show();
	}
	else if (p1h === 0){
		$w('#winnerText').text = 'Player 0 Wins!';
		$w('#winnerBox').show();
	}
}


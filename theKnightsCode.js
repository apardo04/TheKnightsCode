
// For full API documentation, including code examples, visit http://wix.to/94BuAAs
let lessons = ["Computer programming is one of the most important skills to have today. With some practice and dedication anyone can become a programmer, even you! Some of the popular programming languages used today are C++, Python and many more. Companies like Microsoft and Google are creating programs everyday that make our lives easier. Just about anything can be programmed, including cars and even a refrigerator! Did you know that the programs and other information used by a computer is called software?", "In programming we can use variables to store data. A data variable can take the form of many different types. For example: int, char, float, Boolean, etc. An array is a series of objects all of which are the same size and type. A String is a data type. In O.O.P (short for Object Oriented Programming) a function belonging to a class is known as a method.", "Welcome to the advanced course! Android is an operating system for mobile devices, it’s apps are written using Java. Like Java, C# and C++ are Object Oriented programming languages. Unlike all the previously mentioned languages, Python is not complied, it’s actually interpreted. Another cool fact about Python, is that users don’t declare variable types. Imagine all that saved time! The runtime of find in a binary search is O(n log n)."]
let howToPlay = "This is a 2 player Computer Science quiz game. Select a difficulty, read the lesson and click Start. Once in the game mode, player 0 (left hand side) will use the keys w, s and x to choose the right answer. Player 1 (right hand side) will use the keys u, j and m to choose the correct answer. Both players must choose an answer, whoever is right (and the quickest) will do 1 damage to the other player. Whoever does 3 damage first wins!"
$w.onReady(function () {
	//TODO: write your page related code here...

});


export function beginner_click(event) {
	$w("#lessonText").text = lessons[0];
	$w("#popup").show();
	$w("#overlay").show();
	$w("#start").show();
}

export function intermediate_click(event) {
	$w("#lessonText").text = lessons[1];
	$w("#popup").show();
	$w("#overlay").show();
	$w("#start").show();
}

export function advance_click(event) {
	$w("#lessonText").text = lessons[2];
	$w("#popup").show();
	$w("#overlay").show();
	$w("#start").show();
}

export function overlay_click(event) {
	$w("#lessonText").text = ".";
	$w("#popup").hide();
	$w("#overlay").hide();
	$w("#exit").hide();
}


export function HowToPlay_click(event) {
	$w("#lessonText").text = howToPlay;
	$w("#popup").show();
	$w("#overlay").show(); 
	$w("#exit").show();
}

export function exit_click(event) {
	$w("#lessonText").text = ".";
	$w("#popup").hide();
	$w("#overlay").hide();
	$w("#exit").hide();
}
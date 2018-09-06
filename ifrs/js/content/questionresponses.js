var ALLRIGHT = 1;
var SOMERIGHT = 2;
var NONERIGHT = 3;
var SOMERIGHTANDSOMEWRONG = 4;
//above now in constants.js

//these responses are for the Show Me/Model Answer questions
var questionResponses = new Array(
	["Well done. ", 
	"Well done. ", 
	"Well done. "],
	
	["Sorry, that's not right. ", 
	"Sorry, that's not right. ", 
	"Sorry, that's not right. "],

	["Sorry, that's wrong. ", 
	"Sorry, that's wrong. ", 
	"Sorry, that's wrong. "]
);

//these responses are for the multiple correct answer questions
var slResponses = new Array(
	["Well done. ", 
	"Well done. ", 
	"Well done. "],
	
	["You selected <i>at least one</i>, but not all of the correct answers. ", 
	"You selected <i>at least one</i>, but not all of the correct answers. ", 
	"You selected <i>at least one</i>, but not all of the correct answers. "],

	["Sorry, that's wrong. ", 
	"Sorry, that's wrong. ", 
	"Sorry, that's wrong. "],

	["Sorry, that’s not quite right. ", 
	"Sorry, that’s not quite right. ", 
	"Sorry, that’s not quite right. "]
);

//these responses are for the single correct answer questions
var mcqResponses = new Array(
	["Well done. ", 
	"Well done. ", 
	"Well done. "],
	
	["This option is not used (you can't have some right in a 1 correct answer question!) but don't delete it"],

	["Sorry, that's wrong. ", 
	"Sorry, that's wrong. ", 
	"Sorry, that's wrong. "]
);

function getResponse() {
	var strResponse = "";

	switch (appTop.intPageType) {
		case appTop.DRAGDROPBYCOLUMN:
		case appTop.DRAGDROPBYTHREECOLUMN:
		case appTop.MATCHINGPAIRS:
		case appTop.WORDMATCH:
		case appTop.WORDMATCHGRAPHIC:
		case appTop.WORDMATCHGRAPHICLANDSCAPE:
			iRand = Math.floor(Math.random() * questionResponses[appTop.booAnswerStatus - 1].length);
			strResponse = questionResponses[appTop.booAnswerStatus -1 ][iRand];
			break;
		
		case top.SLWITHFEEDBACK:
			iRand = Math.floor(Math.random() * slResponses[appTop.booAnswerStatus - 1].length);
			strResponse = slResponses[appTop.booAnswerStatus - 1][iRand];
			break;
			
		case top.MCQWITHFEEDBACK:
			iRand = Math.floor(Math.random()*mcqResponses[appTop.booAnswerStatus - 1].length);
			strResponse = mcqResponses[appTop.booAnswerStatus - 1][iRand];
			break;
			
		case top.MCQGRAPHICSWITHFEEDBACK:
			iRand = Math.floor(Math.random()*mcqResponses[appTop.booAnswerStatus - 1].length);
			strResponse = mcqResponses[appTop.booAnswerStatus - 1][iRand];
			break;
	}
	return strResponse;
}

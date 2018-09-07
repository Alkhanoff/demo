var maxCols = 0;
var pOut = "";
//var cF = parent.window.frames[1] //appTop.objPrintWhichFrame;
var cF = appTop.objPrintWhichFrame;

if ((!cF) || (!cF.document))
{
	cF = appTop.printWhichFrame;
}

var cD = cF.document;
var allowPrinting = true;

function initialise() {
	//main routine
	pOut += startTable();
	switch (appTop.intPageType) {

		case appTop.TEXTANDGRAPHIC:
			maxCols = 2;
			pOut += row1("titleLayer", "title");
			pOut += row1("initialTextLayer", "text");
			if ((cD.all['graphicHolder'])&&(cD.all['graphicHolder'].className == "rightArea")) {
				pOut += row2("textLayer", "text", "mainImg", "image");
			} else {
				pOut += row2("mainImg", "image", "textLayer", "text");
			}
			break;

		case appTop.HOTTEXT:
			maxCols = 1;
			pOut += row1("titleLayer", "title");
			pOut += row1("theInitialText", "js");
			for (n=0; n<cF.numberOfHotTexts; n++) {
				pOut += row1("hotText"+(n+1), "bold");
				pOut += row1("displayTextArray[" + (n+1) + "]", "js");
			}
			break;

		case appTop.HOTGRAPHIC:
			maxCols = 2;
			pOut += row1("titleLayer", "title");
			pOut += row1("initialTextLayer", "text");
			pOut += row1("mainGraphic", "image");
			for (n=0; n<cF.noOfDisplayTexts; n++) {
				pOut += row2("hotspot" + (n+1) + "Image", "image", "displayTextArray[" + (n+1) + "][0]", "js");
			}
			break;

		case appTop.STORYBOARDFOUR:
			pOut += row1("titleLayer", "title");
			pOut += row1("initialTextLayer", "text");
			pOut += row2("cellImage1", "image", "storyBoardCell1", "text");
			pOut += row2("cellImage2", "image", "storyBoardCell2", "text");
			pOut += row2("cellImage3", "image", "storyBoardCell3", "text");
			break;

		case appTop.MCQWITHFEEDBACK:
			cF.getAnswer(); //get the correct answer now
			maxCols = 1;
			pOut += row1("titleText", "title");
			pOut += row1("question", "text");
			pOut += row1("optionTD_#_main", "sloptions");
			if (qComplete()) {
				pOut += row1("feedbackTextArray[" + cF.correctAnswer + "]", "js");
			}
			break;

		case appTop.SLWITHFEEDBACK:
			maxCols = 1;
			pOut += row1("titleText", "title");
			pOut += row1("question", "text");
			pOut += row1("optionTD_#_main", "sloptions");
			if (qComplete()) {
//				pOut += row1("feedbackText", "text");
				pOut += row1("correctFeedbackText", "js");
			}

			break;

		case appTop.DRAGDROPBYCOLUMN:
			maxCols = 2;
			pOut += row1("titleLayer", "title");
			pOut += row1("questionArea", "text");
			if (qComplete()) {
			pOut += row3("1", "ddcolumn", "2", "ddcolumn");
				pOut += row1("correctFeedback", "js");
			} else {
				pOut += row1("Areas", "boldmsg");
				pOut += row1("col1Heading", "msg");
				pOut += row1("col2Heading", "msg");
				pOut += row1("Options", "boldmsg");
				for (n=0; n<8; n++) {
					pOut += row1("drag" + (n+1) + "Div", "text");
				}
			}
			break;

		case appTop.DRAGDROPBYTHREECOLUMN:
			maxCols = 3;
			pOut += row1("titleLayer", "title");
			pOut += row1("questionArea", "text");
			if (qComplete()) {
				pOut += row3("1", "ddcolumn", "2", "ddcolumn", "3", "ddcolumn");
				pOut += row1("correctFeedback", "js");
			} else {
				pOut += row1("Areas", "boldmsg");
				pOut += row1("col1Heading", "msg");
				pOut += row1("col2Heading", "msg");
				pOut += row1("col3Heading", "msg");
				pOut += row1("Options", "boldmsg");
				for (n=0; n<8; n++) {
					pOut += row1("drag" + (n+1) + "Div", "text");
				}
			}
			break;

		case appTop.TEXTONLY:
			maxCols = 3;
			pOut += row1("titleLayer", "title");
			pOut += row1("initialTextLayer", "text");
			pOut += row3("textColumn1", "text", "textColumn2", "text", "textColumn3", "text");
			break;

		case appTop.MATCHINGPAIRS:
			maxCols = 3;
			pOut += row1("titleLayer", "title");
			pOut += row1("questionText", "text");
			if (qComplete()) {
				pOut += row2("option#Div", "mpoptions");
				pOut += row1("correctFeedback", "js");
			} else {
				pOut += row1("List 1", "boldmsg");
				for (n=0; n<6; n++) {
					if (cD.all["option" + (n+1) + "Div"]) {
						pOut += row1("option" + (n+1) + "Div", "text");
					}
				}
				pOut += row1("List 2", "boldmsg");
				for (n=0; n<6; n++) {
					if (cD.all["drag" + (n+1) + "Div"]) {
						pOut += row1("drag" + (n+1) + "Div", "text");
					}
				}
			}

			break;

		case appTop.TABBEDSCREEN:
			var n = 0;
			maxCols = 1;
			pOut += row1("titleLayer", "title");
			pOut += row1("initialTextLayer", "text");
			if (typeof(cF.tabTypesArray) != "undefined") {
				for (n=0; n<cF.noOfTabs; n++) {
					pOut += startTable();
					pOut += row1("tabTitle"+(n+1), "bold");
					pOut += tabScreen(cF.tabTypesArray[n+1], n+1);
					pOut += endTable();
				}
			}
			break;

		case appTop.OPENINPUTSTART:
			maxCols = 2;
			pOut += row1("titleLayer", "title");
			pOut += row1("initialTextLayer", "text");
			pOut += row2("mainTextOrGraphic", "text", "userInputField", "textarea");
			break;

		case appTop.OPENINPUTEND:
			maxCols = 2;
			pOut += row1("titleLayer", "title");
			pOut += row1("initialTextLayerWithoutInstruction", "text");
			pOut += row2("datafromOtherSceen", "text", "mainText", "text");
			break;

		case appTop.OPENINPUTBUILD:
			maxCols = 2;
			pOut += row1("titleLayer", "title");
			pOut += row1("initialTextLayer", "text");
			pOut += row2("mainTextOrGraphic", "text", "userInputField", "textarea");
			break;

		case appTop.WORDMATCH:
			maxCols = 1;
			pOut += row1("titleText", "title");
			pOut += row1("question", "text");
			pOut += row1("mainForm", "wmcontent");
			pOut += row1("selectList_#", "wmoptions");
			if (qComplete()) {
				pOut += row1("correctFeedbackText", "js");
			}
			break;

		case appTop.WORDMATCHGRAPHIC:
			maxCols = 1;
			pOut += row1("titleLayer", "title");
			pOut += row1("questionText", "text");
			pOut += endTable();
			pOut += "<div class='wmgraphic'><img src='" + cF.document.images['mainGraphic'].src + "' border='0' /></div>";
			pOut += "<div class='wmgraphic'>" + getData("listArea", "wmcontent") + "</div>";
			pOut += "<div class='wmtext2'>";
			pOut += startTable();
			pOut += row1("selectList_#", "wmoptions");
			if (qComplete()) {
				pOut += row1("resultGraphic", "image");
				pOut += row1("correctFeedbackText", "js");
			}
			pOut += endTable();
			pOut += "</div>";
			break;

		case appTop.WORDMATCHGRAPHICLANDSCAPE:
			maxCols = 1;
			pOut += row1("titleLayer", "title");
			pOut += row1("questionText", "text");
			pOut += endTable();
			pOut += "<div class='wmgraphic' id='wmmain'><img src='" + cF.document.images['mainGraphic'].src + "' border='0' /></div>";
			pOut += "<div class='wmgraphic' id='wmdropdowns'>" + getData("listArea", "wmcontent") + "</div>";
			pOut += "<div class='wmtext2'>";
			pOut += startTable();
			pOut += row1("selectList_#", "wmoptions");
			if (qComplete()) {
				pOut += row1("resultGraphic", "image");
				pOut += row1("correctFeedbackText", "js");
			}
			pOut += endTable();
			pOut += "</div>";
			break;

		case appTop.QUIZRESULTS:
//			if (cF.scoreAcheived >= cF.scoreRequired) {
				maxCols = 1;
				pOut += row1("titleLayer", "title");
				pOut += row1("mainText", "text");
//			} else {
//				allowPrinting = false;
//			}

			break;

		case appTop.MCQGRAPHICSWITHFEEDBACK:
			maxCols = 2;
			pOut += row1("titleLayer", "title");
			pOut += row1("question", "text");
			pOut += row2(cF.document.getElementById("optionTD_1_main"), "childImage", cF.document.getElementById("optionTD_2_main"), "childImage");
			if (cF.feedbackTextArray.length > 3)
				pOut += row2(cF.document.getElementById("optionTD_3_main"), "childImage", cF.document.getElementById("optionTD_4_main"), "childImage");

			if (qComplete()) {
				pOut += row1("feedbackTextArray[" + cF.correctAnswer + "]", "js");
			}
			pOut += endTable();
			break;
		case appTop.MCQNOFEEDBACK:
		case appTop.SLNOFEEDBACK:
		case appTop.QUIZWORDMATCH:
			allowPrinting = false;
			break;

		default:
			allowPrinting = false;
			break;
	}
	pOut += endTable();
	document.write (pOut);
	if (appTop.intPageType == appTop.WORDMATCHGRAPHICLANDSCAPE) {
		graphicTop = cF.graphicTop;
		graphicLeft = cF.graphicLeft;
		for (n=0; n<cF.numOfDropDowns; n++) {
			document.all['selectList_' + (n+1) + 'Div'].style.left = parseInt(document.all['selectList_' + (n+1) + 'Div'].style.left) - graphicLeft;
//			document.all['selectList_' + (n+1) + 'Div'].style.top = parseInt(document.all['selectList_' + (n+1) + 'Div'].style.top) - graphicTop;
			document.all['selectList_' + (n+1) + 'Div'].style.visibility = "visible";
		}
	}
	setTimeout("doPrint()", 100);
}

function doPrint() {
	//prints frame
	if (allowPrinting) {
		window.focus();
		window.print();
	} else {
		alert("This page cannot be printed.");
	}
}

function startTable() {
	//starts table
	return "<table border='0' cellpadding='5' cellspacing='0' width='100%'>\n";
}

function row1(id1, type1) {
	//draws a single column row
	return "<tr><td colspan='" + maxCols + "'>" + getData(id1, type1) + "</td></tr>\n";
}

function row2(id1, type1, id2, type2) {
	//draws a two column row
	return "<tr><td>" + getData(id1, type1) + "</td><td >" + getData(id2, type2) + "</td></tr>\n";
}

function row3(id1, type1, id2, type2, id3, type3) {
	//draws a two column row
	return "<tr><td>" + getData(id1, type1) + "</td><td>" + getData(id2, type2) + "</td><td>" + getData(id3, type3) + "</td></tr>\n";
}

function getData(divID, typeID) {
	//returns data, formatted correctly, for the div and type
	strData = "";
	switch (typeID) {
		case "title" :
		case "text":
		case "bold":
			if(typeof(cD.all[divID])!="undefined") {
				strData += "<span class='" + typeID + "'>" + stripImages(cD.all[divID].innerHTML) + "</span>";
			} else {
				strData += "&nbsp;";
			}
			break;

		case "textarea":
			if(typeof(cD.all[divID])!="undefined") {
				strData += "<span class='" + typeID + "'>" + formatText(cD.all[divID].innerHTML) + "</span>";
			} else {
				strData += "&nbsp;";
			}
			break;

		case "html":
			if(typeof(cD.all[divID])!="undefined") {
				strData += stripImages(cD.all[divID].innerHTML);
			} else {
				strData += "&nbsp;";
			}
			break;

		case "msg":
			strData += "<span class='text'>" + divID+ "</span><br />";
			break;

		case "boldmsg":
			strData += "<span class='bold'>" + divID + "</span><br />";
			break;

		case "js":
			jsVar = eval("cF." + divID);
			if(typeof(jsVar)!="undefined") {
				strData += "<span class='text'>" + jsVar + "</span>";
			} else {
				strData += "&nbsp;";
			}
			break;

		case "sloptions" :
			rootDiv = divID.split("#");
			strData += getData("Options:", "boldmsg");
			if (qComplete()) {
				strData += getData("(Correct answer(s) are shown in bold)", "msg");
			}
			strData += "<ol>";
			for (n=0; n<6;n++) {
				divID = rootDiv[0] + (n+1) + rootDiv[1];
				if(typeof(cD.all[divID])!="undefined") {
					textClass = "text";
					if (qComplete()) {
						if (cF.correctAnswers) { //multiple correct answers
							for (i=0; i<cF.correctAnswers.length; i++) {
								if (cF.correctAnswers[i] == (n+1)) {
									textClass = "bold";
								}
							}
						} else if(cF.correctAnswer) { //single correct answer
							if (cF.correctAnswer == (n+1)) {
								textClass = "bold";
							}
						}
					}
					strData += "<li class='" + textClass + "'>" + cD.all[divID].innerHTML + "</li>";
				} else {
					strData += "&nbsp;";
				}
			}
			strData += "</ol>";
			break;

		case "wmcontent":
			if(typeof(cD.all[divID])!="undefined") {
				strData += wmFormat(cD.all[divID].innerHTML);
			} else {
				strData += "&nbsp;";
			}
			break;

		case "wmoptions":
			//selectList_1
			rootDiv = divID.split("#");
			strData += getData("Options:", "boldmsg");
			if (qComplete()) {
				strData += getData("(Correct answers are shown in bold)", "msg");
			}
			strData += "<ol>";
			for (n=0; n<20;n++) {
				divID = rootDiv[0] + (n+1) + rootDiv[1];
				if(typeof(cD.all[divID])!="undefined") {
					strData += "<li class='text'>";
					correctOption = 0;
					if (cD.all[divID].type) {
						correctOption = cD.all[divID].type;
					}
					for (i=1; i<cD.all[divID].options.length; i++) {
						if ((i == correctOption)&&(qComplete())) {
							textClass = "bold";
						} else {
							textClass = "text";
						}
						strData += "<span class='" + textClass + "'>" + cD.all[divID].options[i].innerHTML + "</span>; ";
					}
					strData += "</li>";
				} else {
					strData += "&nbsp;";
				}
			}
			strData += "</ol>";
			break;

		case "mpoptions" :
			optionsDiv = "option#Div";
			optionsRoot = optionsDiv.split("#");
			answersDiv = "drag#Div";
			answersRoot = answersDiv.split("#");
			strData += getData("Options:", "boldmsg");
			strData += getData("(Correct answers are shown in bold)", "msg");
			strData += "<ol>";
			for (n=0; n<cF.cqidArray.length;n++) {
				optionsDiv = optionsRoot[0] + (n+1) + optionsRoot[1];
				correctOption = 0
				for (i=0; i<cF.cqidArray.length; i++) {
					if (cF.cqidArray[i] == (n+1)) {
						correctOption = (i+1);
					}
				}
				answersDiv = answersRoot[0] + correctOption + answersRoot[1];
				if(typeof(cD.all[optionsDiv])!="undefined") {
					strData += "<li class='text'>" + cD.all[optionsDiv].innerHTML + " : <b>" + cD.all[answersDiv].innerHTML + "</b></li>";
				} else {
					strData += "&nbsp;";
				}
			}
			strData += "</ol>";
			break;

		case "ddcolumn" :
			strData += getData("col"+divID+"Heading", "bold");
			strData += "<ul>";
			for (n=0; n<cF.cqidArray.length;n++) {
				if (cF.cqidArray[n] == divID) {
					optionsDiv = "drag" + (n+1) + "Div";
					if(typeof(cD.all[optionsDiv])!="undefined") {
						strData += "<li class='text'>" + cD.all[optionsDiv].innerHTML + "</li>";
					} else {
						strData += "&nbsp;";
					}
				}
			}
			strData += "</ul>";
			break;

		case "image":
			if (cF.document.images[divID]) {
				imgLocation = cF.document.images[divID].src
				strData += "<img src='" + imgLocation + "' border='0' />";
			} else {
				strData += "&nbsp;";
			}
			break;

		case "childImage":
			imgLocation = divID.children[0].src
			strData += "<img src='" + imgLocation + "' border='0' />";
			break;
	}
	return strData;
}

function endTable() {
	//ends the table
	return "</table>\n";
}

function stripImages(htmlData) {
	//removes images from a block of html
	htmlData = htmlData.replace(/\<IMG([^\>]*)\>/g,"");
	return htmlData;
}

function formatText(htmlData) {
	//replaces line breaks and tabs with the html equivalent
	htmlData = htmlData.replace(/\n/g,"<br />");
	htmlData = htmlData.replace(/\t/g,"&nbsp; &nbsp; &nbsp;");
	return htmlData;
}

function wmFormat(htmlData) {
	//formats word match html to add the number of the drop down
	reFind = /OPTION selected value\=\"\"\>\<\/OPTION\>/;
	for (n=1; n<20; n++) {
		reReplace = "OPTION selected value\=\"\"\>" + n + "\<\/OPTION\>";
		htmlData = htmlData.replace(reFind, reReplace);
		if(!reFind.test(htmlData)) {
			break;
		}
	}
	htmlData = stripImages(htmlData);
	return htmlData;
}

function tabScreen(screenType, tabID) {
	//draw the tab screens
	var n=0;
	var strTab = "";
	//strTab += row1(screenType, "msg");
	switch (screenType) {

		case "Text only" :
			maxCols = 3;
			strTab += row3("tab" + tabID + "textColumn1", "text", "tab" + tabID + "textColumn2", "text", "tab" + tabID + "textColumn3", "text");
			break;

		case "Text with small graphic" :
			maxCols = 2;
			strTab += row2("tab" + tabID + "mainText", "text", "tab" + tabID + "graphic", "image");
			break;

		case "Text with large graphic" :
			maxCols = 1;
			strTab += row1("tab" + tabID + "mainText", "text");
			strTab += row1("tab" + tabID + "graphic", "image");
			break;

		case "Graphic only" :
			maxCols = 1;
			strTab += row1("tab" + tabID + "graphic", "image");
			break;

		case "Hot text" :
			maxCols = 1;
			strTab += row1("tab" + tabID + "HotTextInitialTextLayer", "text");
			numOfHotTexts = eval("cF.tab" + tabID + "numberOfHotTexts");
			for (n=0; n<numOfHotTexts; n++) {
				strTab += row1("tab" + tabID + "hotTextLink" + (n+1), "bold");
				strTab += row1("tab" + tabID + "displayTextArray[" + (n+1) + "]", "js");
			}
			break;

		case "Hot graphic Small" :
		case "Hot graphic Large" :
			maxCols = 1;
			strTab += row2("tab" + tabID + "initialTextLayer", "text", "tab" + tabID + "mainGraphic", "image");
			for (n=0; n<eval("cF.tab" + tabID + "displayTextArray").length; n++) {
				strTab += row2("tab" + tabID + "hotspot" + (n+1) + "Image", "image", "tab" + tabID + "displayTextArray[" + (n+1) + "]", "js");
			}
			break;
	}
	return strTab;
}

function qComplete() {
	if ((appTop.answerStatus == appTop.ALLRIGHT) || (appTop.answerStatus == appTop.SOMERIGHT) || (appTop.answerStatus == appTop.NONERIGHT)) {
		return true;
	} else {
		return false;
	}
}
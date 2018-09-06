var booMatchFound = false;
var booContentLoaded = false;
var intHowManyMatches = 0;
var strAddWord = "";
var strHighlightThis = "";
var strDescriptionText = "";
var strSpanIntro = ""
var strSpanEnd = "";
var strImagePath = "../images/"; // The path of the image directory relative to the page
var strColor1 = "#FFFFFF";
var strColor2 = "#EDEDED";
var strCurrentColor;
var intAlternate = 1
var objOpener;
var objOpenerTop;
var exit_h = new Image();
var exit_n = new Image();
var return_h = new Image();
var return_n = new Image();
var help_h = new Image();
var help_n = new Image();
var intPageType;

var objContentFrame;

function initialise()
{
	intPageType = GLOSSARY;
	
	objOpener = window.opener;
	objOpenerTop = objOpener.appTop;
	objContentFrame = window;
 	preloadImages();
 	convertSomeCharacters();
 	populateWordList();
 	booContentLoaded = true;
}

function switchColor()
{
	if (intAlternate == 1)
		intAlternate = 2;
	else
		intAlternate = 1;
	strCurrentColor = eval("strColor" + intAlternate);
}

function refReturn() {
	objOpenerTop.launchRef();
	top.window.close();
}

function preloadImages(){
	exit_h.src = strImagePath + "popups/glossary/close_h.gif";
	exit_n.src = strImagePath + "popups/glossary/close_n.gif";
	return_h.src = strImagePath + "popups/glossary/return_h.gif";
	return_n.src = strImagePath + "popups/glossary/return_n.gif";
	help_h.src = strImagePath + "popups/glossary/help_h.gif";
	help_n.src = strImagePath + "popups/glossary/help_n.gif";
	preloadPopupImages();
}

function convertSomeCharacters(){
	for(i=0; i<objGlossWords.length; i++){
		if (objGlossWords[i][0].indexOf("&amp;")>-1){
			objGlossWords[i][0] = objGlossWords[i][0].replace(/&amp;/gi,"&");
		}
	}
}

function populateWordList()
{
	strCurrentColor = strColor1;
	intAlternate = 1;

	for (var i in objGlossWords){
		booMatchFound = true;
		intHowManyMatches++;
		populateGlossary(i);
		switchColor();
	}	

	document.getElementById("glossaryList").innerHTML = "";
	document.getElementById("glossaryList").innerHTML = strAddWord;
	strAddWord ="";	
}

//populates the glossary list of words and definitions.
function populateGlossary(_intWord){
	if (booMatchFound){
		var glossaryWord = objGlossWords[_intWord][0].replace(/'/g, "\\'");
		
		strAddWord += '<div name="term' + _intWord + '" class="singleWord"><a href="JavaScript:mouseDown(\'' + glossaryWord + '\')" onMouseOver="mouseOver()" onMouseOut="mouseBack()" >' + objGlossWords[_intWord][0] + '</a></div>';
		document.getElementById("displayItemText").innerHTML = "";
	}
}

//clears the value of the input field onmousedown and onkeypress
function clearInputValue( ){
	if (document.getElementById("glossfield").value.indexOf("term to search") > -1){
		document.getElementById("glossfield").value = "";
		document.getElementById("glossfield").focus();
	}
}

//document.onmousedown = mouseDown;

function mouseDown(_strWord) {//called when on word is clicked to get its definition
//	var _objSrc = window.event.srcElement;	// detects which word got clicked
	
	for(i=0; i<objGlossWords.length; i++){
//		if (_objSrc.innerText == objGlossWords[i][0]){
		if (_strWord == objGlossWords[i][0]){
			if (objGlossWords[i][1].indexOf("<br>") >-1)
				document.getElementById("displayItemText").innerHTML = "<div style=\"position:relative; font-family:Arial; font-size:10pt; width:245px\"><b>" + objGlossWords[i][0]+ ": </b>" + objGlossWords[i][1]+ "<\/div>";
			else
				document.getElementById("displayItemText").innerHTML = "<div style=\"position:relative; font-family:Arial; font-size:10pt; width:245px\"><b>" + objGlossWords[i][0]+ ": </b><br><br>" + objGlossWords[i][1]+ "<\/div>";

			strDescriptionText = document.getElementById("displayItemText").innerHTML;
			//strDescriptionText = strDescriptionText.toLowerCase();
			wordinDescription = (strDescriptionText.slice(strDescriptionText.indexOf(strHighlightThis), strDescriptionText.indexOf(strHighlightThis) + strHighlightThis.length).toLowerCase());
			strSpanIntro = "<span class='makeItBold'>";
			strSpanEnd = "</span>";
			strDescriptionText = strDescriptionText.replace(strHighlightThis, strSpanIntro + strHighlightThis + strSpanEnd);
			document.getElementById("displayItemText").innerHTML = "<div style=\"position:relative; width:245px; padding:5px;\">" +  strDescriptionText + "</div>";
		}
	}

//	if (_objSrc.name == "glossfield")
//		clearInputValue();
}

function mouseOver(){ //called when a word from the glossary list is rolled over
	var _objSrc = window.event.srcElement;
	
	for(i=0; i<objGlossWords.length; i++){
		if (_objSrc.innerText == objGlossWords[i][0]){
			_objSrc.className = "rolloverItems";
		}
	}
}

function mouseBack(){ //called when a word from the glossary list is rolled out
	var _objSrc = window.event.srcElement;
	for(i=0; i<objGlossWords.length; i++){
		if (_objSrc.innerText == objGlossWords[i][0]){
			_objSrc.className = "rolloutItems";
		}
	}
}

//closes the glossary window.
function closeGlossary(){
	top.window.close();
}


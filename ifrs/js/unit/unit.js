var booTitleLoaded = false;
var booContentLoaded = false;
var booToolsLoaded = false;
var booNavLoaded = false;

var objTitleFrame;
var objContentFrame;
var objToolsFrame;
var objNavFrame;

var booPopupVisible = false;
var objHiddenElements = new Array();
var strPopupShowing = "";

function initialise()
{
	assignObjects();
	objTitleFrame.location = "title.htm";
}

function assignObjects()
{
	objTitleFrame = window["titleF"];
	objContentFrame = window["content"];
	objToolsFrame = window["tools"];
	objNavFrame = window["nav"];
}


//don't display any print errors
window.onerror = handleError;
function handleError() {
	return true;
}

var maxCols = 0;
var pOut = "";
var cF = parent.strPrintWhichFrame;
var cD = cF.document;
var allowPrinting = true;

function initialise() {
	//main routine
	pOut += startTable();
	switch (parent.strPrintType) {
		
		case "email":
			maxCols = 2;
			pOut += row1("Email", "boldmsg");
			pOut += row2("To", "boldmsg", "emailTo", "text");
			pOut += row2("From", "boldmsg", "emailFrom", "text");
			pOut += row2("Subject", "boldmsg", "emailSubject", "text");
			pOut += row1("emailBody", "text");
			break;
			
		case "fax":
			maxCols = 2;
			pOut += row1("Fax", "boldmsg");
			pOut += row2("To", "boldmsg", "faxPage1To", "text");
			pOut += row2("From", "boldmsg", "faxPage1From", "text");
			pOut += row2("Subject", "boldmsg", "faxPage1Subject", "text");
			pOut += row1("faxPage1Body", "text");
			pOut += row1("faxPage2Text", "text");
			break;
			
		case "memo":
			maxCols = 2;
			pOut += row1("Memo", "boldmsg");
			pOut += row2("Subject", "boldmsg", "memoPage1Subject", "text");
			pOut += row1("memoPage1Text", "text");
			pOut += row1("memoPage2Text", "text");
			pOut += row1("memoPage3Text", "text");
			pOut += row1("memoPage4Text", "text");
			break;
			
		case "postit":
			maxCols = 2;
			pOut += row1("Post-it", "boldmsg");
			pOut += row2("Subject", "boldmsg", "subject", "js");
			pOut += row1("postitText", "text");
			break;	
			
		case "post":
			maxCols = 2;
			pOut += row1("Post", "boldmsg");
			pOut += row2("To", "boldmsg", "postTo", "text");
			pOut += row2("From", "boldmsg", "postFrom", "text");
			pOut += row2("Subject", "boldmsg", "postSubject", "text");
			pOut += row1("postBody", "text");
			break;
			
		case "voicemail":
			maxCols = 2;
			pOut += row1("Voicemail", "boldmsg");
			pOut += row2("Subject", "boldmsg", "subject", "js");
			pOut += row1("transcriptText", "text");
			break;	
			
		case "phonecall":
			maxCols = 2;
			pOut += row1("Phone call", "boldmsg");
			pOut += row2("Subject", "boldmsg", "subject", "js");
			pOut += row2("graphicL", "image", "transcriptText", "text");
			break;	
			
		case "interruption":
			maxCols = 2;
			pOut += row1("Face to Face", "boldmsg");
			pOut += row2("Subject", "boldmsg", "subject", "js");
			pOut += row2("graphicL", "image", "transcriptText", "text");
			break;	
		
		case "meeting":
			maxCols = 1;
			pOut += row1("flashObject", "flash");
			break;
			
		default:
			allowPrinting = false;
			break;
	}
	pOut += endTable();
	document.write (pOut);
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
	return "<table border='0' cellpadding='5' cellspacing='0' width='100%'>";
}

function row1(id1, type1) {
	//draws a single column row
	return "<tr><td colspan='" + maxCols + "'>" + getData(id1, type1) + "</td></tr>";
}

function row2(id1, type1, id2, type2) {
	//draws a two column row
	return "<tr><td>" + getData(id1, type1) + "</td><td >" + getData(id2, type2) + "</td></tr>";
}

function row3(id1, type1, id2, type2, id3, type3) {
	//draws a two column row
	return "<tr><td>" + getData(id1, type1) + "</td><td>" + getData(id2, type2) + "</td><td>" + getData(id3, type3) + "</td></tr>";
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
			
		case "image":
			if (cF.document.images[divID]) {
				imgLocation = cF.document.images[divID].src
				strData += "<img src='" + imgLocation + "' border='0' />";
			} else {
				strData += "&nbsp;";
			}
			break;
			
		case "flash":
			pageSplit = parent.strCurrentPage.split("_");
			flashFile = parent.objOpenerTop.strBaseURL+"/units/"+pageSplit[0]+"/"+pageSplit[1]+"/content/" + cF.flashFile;
			strData += "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#4,0,2,5' width='580' height='300'>";
			strData += "<param name='SRC' value='" + flashFile + "'>";
			strData += "<param NAME='Play' value='True'>";
			strData += "<param NAME='Loop' VALUE='False'></object>";
			break;
	}
	return strData;
}

function endTable() {
	//ends the table
	return "</table>";	
}

function stripImages(htmlData) {
	//removes images from a block of html
	htmlData = htmlData.replace(/\<IMG(.*?)\>/g,"");	
	return htmlData;
}

function formatText(htmlData) {
	//replaces line breaks and tabs with the html equivalent
	htmlData = htmlData.replace(/\n/g,"<br />");
	htmlData = htmlData.replace(/\t/g,"&nbsp; &nbsp; &nbsp;");
	return htmlData;
}

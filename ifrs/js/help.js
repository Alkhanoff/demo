
function showHelp() {
	//show/hide the help in the content window
	c = mainArea.frameType.content;
	if (c.document.getElementById("popupContent")) {
		if (c.popupShowing == "help") {
			hidePopupLayer();	
			c.popupShowing = "";
		} else {
			c.document.getElementById("popupContent").innerHTML = "";
			showPopupLayer();
			c.document.getElementById("popupContent").innerHTML = popupTitle('help','left') + popupDiv(helpText(top.pageType), 340, 222);
			c.popupShowing = "help";
		}
	}
}

function helpText(pageType) {
	switch (pageType) {
		case TEXTANDGRAPHIC:
			strHelp = "<p>This screen shows text together with a supporting image. </p>";
			break;
		case HOTTEXT:
			strHelp = "<p>This screen presents you with a number of clickable words and/or phrases. By clicking on each of them you will reveal more detailed information.</p>";
			break;
		case OPENINPUTSTART:
			strHelp = "<p>This is a text entry screen. It allows you to type your words into the available space. </p>" +
			          "<p>You'll need this information later on, so be sure to write all that you think is necessary.</p>";
			break;
		case OPENINPUTEND:
			strHelp = "<p>This screen redisplays what you earlier typed. It allows you to compare your findings, or your thoughts with a model result. </p>";
			break;
		case MCQNOFEEDBACK:
			strHelp = "<p>This is a question screen in which there is <b>only one</b> correct answer.</p>" +
				"<p>Click on the option that you think is correct. If you want to choose another option simply click the new option and the old option will deselect automatically.</p>" +
				"<p>A tick will indicate the correct answer, and crosses the incorrect answers.</p>";
			break;
		case SLNOFEEDBACK:
			strHelp = "<p>This is a question screen in which there are <b>one or more</b> correct answers.</p>" +
				"<p>Click on the options that you think are correct. Click a selected option to deselect it.</p>" +
				"<p>Ticks will indicate the correct answers, and crosses the incorrect answers.</p>";
			break;
		case ASSESSMENTRESULT:
			strHelp = "<p>This is the <b>Assessment</b> results page.</p>" +
			          "<p> if you passed the assessment, then print out your certificate by clicking the Print Certificate button.</p>" +
			          "<p>If you didn't pass, you can quickly access the <b>Coach Me</b> sessions that you need to review via <b>QuickFind</b>. ";
			break;
		case HOTGRAPHIC:
			strHelp = "<p>This screen shows text supporting an image. </p>" +
				"<p>If you're asked to click on a highlighted image, do so and learn more.</p>";
			break;
		case STORYBOARDFOUR:
			strHelp = "<p>This screen presents you with a photostory. </p>" +
				"<p>By clicking <b>more</b> you'll find out what happens next.</p>";
			break;
		case MCQWITHFEEDBACK:
			strHelp = "<p>This is a question screen in which there are <b>one or more</b> correct answers.</p>" +
				"<p>Click on the options that you think are correct. Click a selected option to deselect it.</p>" +
				"<p>Ticks will indicate the correct answers, and crosses the incorrect answers.</p>";
			break;
		case SLWITHFEEDBACK:
			strHelp = "<p>This is a question screen in which there are <b>one or more</b> correct answers.</p>" +
				"<p>Click on the options that you think are correct. Click a selected option to deselect it.</p>" +
				"<p>Ticks will indicate the correct answers, and crosses the incorrect answers.</p>";
			break;
		case DRAGDROPBYCOLUMN:
			strHelp = "<p>This is a question screen in which you must place the options into the appropriate columns.</p>" +
				"<p>1. Click and hold down the mouse key while over a choice. You'll notice that the mouse cursor turns into a small hand whilst over a choice.</p>" +
				"<p>2. Drag your choice to match up with the option you think is correct. Do this by moving the cursor to the right of the option - you'll see that your choice moves along with the cursor.</p>" +
				"<p>3. If you want to change your choice drag the option into the other column.</p>" +
				"<p>Ticks will indicate the correct answers, and crosses the incorrect answers.</p>";
			break;
		case DRAGDROPBYTHREECOLUMN:
			strHelp = "<p>This is a question screen in which you must place the options into the appropriate columns.</p>" +
				"<p>1. Click and hold down the mouse key while over a choice. You'll notice that the mouse cursor turns into a small hand whilst over a choice.</p>" +
				"<p>2. Drag your choice to match up with the option you think is correct. Do this by moving the cursor to the right of the option - you'll see that your choice moves along with the cursor.</p>" +
				"<p>3. If you want to change your choice drag the option into another column.</p>" +
				"<p>Ticks will indicate the correct answers, and crosses the incorrect answers.</p>";
			break;
		case TEXTONLY:
			strHelp = "This screen has no associated help.";
			break;
		case MATCHINGPAIRS:
			strHelp = "<p>This is a question screen in which you must match the choices to the right hand side with the options to the left.</p>" +
				"<p>1. Click and hold down the mouse key while over a choice. </p>" +
				"<p>2. Drag your choice to match up with the option you think is correct.</p>" +
				"<p>3. If you want to change your choice drag the option back and replace it with another choice.</p>";
			break;
		case TABBEDSCREEN:
			strHelp = "<p>This screen presents information using familiar tab bars across the top.</p>" +
				"<p>Each tab can contain text, graphics, clickable text, and clickable graphics. Follow the instructions on each tab page if you're unsure what to do.</p>";
			break;
		case OPENINPUTBUILD:
			strHelp = "<p>This is a text entry screen. It allows you to type your words into the available space. </p>" +
			          "<p>You'll need this information later on, so be sure to write all that you think is necessary.</p>";
			break;
		case WORDMATCH:
			strHelp = "<p>This is a question screen in which you must choose the correct missing word, phrase or value. </p>" +
			 	  "<p>Make your selections by first clicking on the dropdown list boxes, and then clicking on the option you think is correct. Note that you <b>must</b> select an option for all missing items before you can check your answer.</p>";
			break;
		case WORDMATCHGRAPHIC:
			strHelp = "<p>This is a question screen in which you must choose the correct missing word, phrase or value. </p>" +
			 	  "<p>Make your selections by first clicking on the dropdown list boxes, and then clicking on the option you think is correct. Note that you <b>must</b> select an option for all missing items before you can check your answer.</p>";
			break;
		case WORDMATCHGRAPHICLANDSCAPE:
			strHelp = "<p>This is a question screen in which you must choose the correct missing word, phrase or value. </p>" +
			 	  "<p>Make your selections by first clicking on the dropdown list boxes, and then clicking on the option you think is correct. Note that you <b>must</b> select an option for all missing items before you can check your answer.</p>";
			break;
		case "comm_email":
			strHelp = "<p>This is your email inbox pop-up.</p>" +
			          "<p>From the top half of the screen, you'll be able to see and access all the emails that you've had. In the bottom half of the screen, your email message will display. Be sure to scroll down to the bottom of your emails, as you may also find an attachment.";
			break;		
		case "comm_fax":
			strHelp = "<p>This is your fax pop-up.</p>" +
			          "<p>If there's more than one page, click <b>next</b> to read more.";
			break;
		case "comm_memo":
			strHelp = "<p>This is your memo pop-up.</p>" +
			          "<p>If there's more than one page, click <b>next</b> to read more.";
			break;
		case "comm_post":
			strHelp = "<p>This is your post pop-up. No help is necessasary.</p>"
			break;	
		case "comm_voicemail":
			strHelp = "<p>This is your voicemail pop-up.</p>" +
			          "<p>You have four buttons available on your phone: <ul><li>&lt;&lt; - previous message</li><li><b>stop</b> - stop message</li><li><b>play</b> - play message</li><li>&gt;&gt; - next message</li></ul><p>You can see a transcript of each message by clicking <b>audio transcript</b>.</p>"
			break;	
		case "comm_phonecall":
			strHelp = "<p>This is your phonecall pop-up. You can see a transcript of each message by clicking <b>audio transcript</b>.</p>"
			break;	
		case "comm_postit":
			strHelp = "<p>This is your post-it pop-up. No help is necessary.</p>"
			break;			
		case "comm_interruption":
			strHelp = "<p>You can see a transcript of this message by clicking <b>audio transcript</b>.</p>";
			break;		
		case "comm_meeting":
			strHelp = "<p>You can see a transcript of this meeting by clicking <b>audio transcript</b>.</p>";
			break;	
		default:
			strHelp = "This screen has no associated help.";
			break;
	}
	return strHelp;
	//return "Sorry, help is not available in this release.";
}

messagesHelp = "<p>The <b>Messages</b> panel alerts you to one of the following communications that you can receive at any point within a scenario:</p><ul><li> email</li><li> post (letter)</li><li> fax</li><li> memo</li><li> phone call</li><li> voicemail</li><li> 'face-to-face' interruption</li><li>meeting</li><li>'post-it' note</li></ul><p> You <b>must</b> read or listen to your messages when prompted as each one contains essential information. <p><b>Notes:</b></p><ul><li>Click the appropriate message icon when prompted to access your message</li><li> Click <b>ref </b> in the toolkit to access any of your previously accessed messages</li></p>";

toolkitHelp = "<p>The <b>Toolkit</b> will help you tackle each of the challenges set out. There are several items avilable to you:</p><ul><li> <b>Background</b>, providing information about your clients, about your colleagues, and about the companies</li><li><b>Coach me</b>, providing specific help on areas that are new to you, or with which you're having difficulty</li><li> <b>Examples</b> to reflect how this Standard works in the real world</li><li><b>References</b> where you can find your inbox and links to other DTT and IFRS resources</li><li><b>Clue</b> to point your research in the right direction</li><li><b>Calculator</b> for when you need to make a quick and simple calculation</li><li>Additional tools to help you achieve your goals, such as <b>Word</b> and <b>Excel</b></li></ul>";
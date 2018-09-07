var rootDebug = true;
var win = null;;
var debugCounter = 10000;
var startFont = "<font style=\"font-family: Verdana, Arial, Sans-Serif; font-size: 10pt\">";
var endFont= "</font>";

function debugAlert(msg)
{
	if (rootDebug)
	{
		if (!win)
		{
			win = window.open("../generichtm/debug.htm","debugWin","width=800,height=600,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=no,fullscreen=no");
			win.document.open();
			win.moveTo(0,0);
			win.document.write(startFont+"<b><u>Debug Window Initialised</u></b><br><br>"+endFont);
		}
	
		if (msg)
		{
			debugCounter++;

			win.document.write("<div id=\"a"+debugCounter+"\">"+startFont+debugCounter+" : "+msg+endFont+"</div>\n");
			eval("win.document.all['a"+debugCounter+"']").scrollIntoView(false);
		}

		win.focus();
	}
}

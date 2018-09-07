var debug = false;
var pageDisplay = false;
var win = null;;
var debugCounter = 0;
function debugAlert(msg)
{
	if (parent.level1)
	{
		parent.debugAlert(msg);
	}
	else
	{
		if (debug)
		{
			if (win == null)
			{
				win = window.open("debug.htm","debugWin","width=800,height=600,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=no,fullscreen=no");
				win.document.open();
				win.document.write("<b><u>Debug Window Initialised</u></b><br><br>");
			}
		
			if (msg)
			{
				debugCounter++;
				win.document.write("<div id=\"a"+debugCounter+"\">"+debugCounter+" : "+msg+"</div>\n");
				eval("win.document.all['a"+debugCounter+"']").scrollIntoView(false);
			}

			win.focus();
		}
	}
}

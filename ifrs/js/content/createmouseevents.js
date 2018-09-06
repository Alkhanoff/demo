// Mouse Event Functions
// mouse events for the Drag object and Scroll2 object
// 19991007

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

var booDisableDragDrop = false; // allows temporary disabling of drag and drop functionality
var booAnswered = false;
var booDisableDragDrop = false;

var objDebugLayer;

function initMouseEvents() 
{
	objDebugLayer = document.getElementById("titleLayer");
	
	document.onmousedown = mouseDown;
	document.onmousemove = mouseMove;
	document.onmouseup = mouseUp;
	if (is.ns)
	{
		document.addEventListener('onmousedown', mouseDown, false);
		document.addEventListener('onmouseup', mouseUp, false);
		document.addEventListener('onmousemove', mouseMove, false);
	}
}

function mouseDown(e) 
{
	if ((!booAnswered) &&( !booDisableDragDrop))
	{
		if ((is.ns && e.which != 1) || (is.ie && event.button != 1))
			return true;

		var x = (is.ns)? e.pageX : event.x + document.body.scrollLeft
		var y = (is.ns)? e.pageY : event.y + document.body.scrollTop

		if (Drag && drag.mouseDown(x,y))
		{
			return false;
		}
		else 
		{
			return DynMouseDown(x,y);
		}
	}
	else
	{
		return true;
	}
}

function mouseMove(e) 
{
	if (!booAnswered)
	{
		var x = (is.ns)? e.pageX : event.x+document.body.scrollLeft
		var y = (is.ns)? e.pageY : event.y+document.body.scrollTop

		if(x<0 || y<0 || x>660 || y>490)
		{
			drag.mouseUp(x,y); 
		}
		else
		{
			if (Drag && drag.mouseMove(x,y)) 
			{
				return false;
			}
			else 
			{
				return DynMouseMove(x,y);
			}
		}
	}
	else
	{
		return true;
	}
}

function mouseUp(e) 
{
	if (!booAnswered)
	{
		var x = (is.ns)? e.pageX : event.x+document.body.scrollLeft
		var y = (is.ns)? e.pageY : event.y+document.body.scrollTop

		if (Drag && drag.mouseUp(x,y)) 
			return false;
		else 
			return DynMouseUp(x,y);
	}
	else
	{
		return true;
	}
}

// overwrite these functions in your html source to do other mouse handling
function DynMouseDown(x,y)
{
	return true;
}

function DynMouseMove(x,y)
{
	return true;
}

function DynMouseUp(x,y)
{
	return true;
}

Drag = null;

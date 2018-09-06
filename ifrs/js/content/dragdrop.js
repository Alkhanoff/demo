// Drag Object
// an object that makes an unlimited number DynLayers draggable
// 19991010

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/
var zIndex = 20;

function Drag() {
	this.obj = null;
	this.array = new Array();
	this.dropTargets = new Array();
	this.oldDropTargetNum = 0;
	this.dropTargetNum = 0;
	this.active = false;
	this.dragOptionNum = 0;
	this.originalX = 0;
	this.originalY = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.zIndex = 0;
	this.resort = true;
	this.add = DragAdd;
	this.addTargets = DragAddTargets;
	this.checkTargets = DragCheckTargets;
	this.targetHit == null;
	this.targetActive = false;
	this.remove = DragRemove;
	this.setGrab = DragSetGrab;
	this.mouseDown = DragMouseDown;
	this.mouseMove = DragMouseMove;
	this.mouseUp = DragMouseUp;
	this.onDragStart = new Function();
	this.onDragMove = new Function();
	this.onDragEnd = new Function();
	this.onDragDrop = new Function();
}

function DragAdd(argArray) 
{
	objDebugLayer = document.getElementById("titleLayer");

	for (var i=0; i<argArray.length; i++) 
	{
		var l = this.array.length;
		this.array[l] = argArray[i];
		this.array[l].dragGrab = new Array(0,this.array[l].w,this.array[l].h,0);
		this.array[l].originalX = this.array[l].x;
		this.array[l].originalY = this.array[l].y;
		this.array[l].oldDropTargetNum = 0;
		this.array[l].dropTargetNum = 0;
		this.array[l].dragOptionNum = i+1;
		this.zIndex += 1;
	}
}

function DragAddTargets(argArray) 
{
	for (var i=0; i<argArray.length; i++) 
	{
		var l = this.dropTargets.length;
		this.dropTargets[l] = argArray[i];
		this.dropTargets[l].dragGrab = new Array(0,this.dropTargets[l].w,this.dropTargets[l].h,0);
	}
}

function DragSetGrab(dynlayer,top,right,bottom,left) 
{
	dynlayer.dragGrab = new Array(top,right,bottom,left);
}

function DragRemove() 
{
	for (var i=0; i<arguments.length; i++) 
	{
		for (var j=0; j<this.array.length; j++) 
		{
			if (this.array[j] == arguments[i]) 
			{
				for (var k=j;k<=this.array.length-2;k++)
					this.array[k] = this.array[k+1];

				this.array[this.array.length-1] = null;
				this.array.length -= 1;
				break;
			}
		}
	}
}

function DragMouseDown(x,y) 
{
	for (var i=this.array.length-1;i>=0;i--) 
	{
		var lyr = this.array[i];
		if (checkWithinLayer(x,y,lyr)) 
		{
			this.obj = this.array[i];
			this.offsetX = x-this.obj.x;
			this.offsetY = y-this.obj.y;
			this.active = true;
			break;
		}
	}
	
	if (!this.active)
		return false;
	else 
	{
		if (this.resort) 
		{
			this.obj.css.zIndex = zIndex++;
			for (var j=i;j<=this.array.length-2;j++)
				this.array[j] = this.array[j+1];

			this.array[this.array.length-1] = this.obj;
		}
		this.onDragStart(x,y);
		return true;
	}
}

var YMAXPOS = 350;
var XMAXPOS = 490;
var YMINPOS = 0;
var XMINPOS = 0;

function DragMouseMove(x,y) 
{
	if (!this.active)
		return false;
	else 
	{
		
		var currentXPos = x-this.offsetX;
		var currentYPos = y-this.offsetY;

		currentYPos = (currentYPos < YMAXPOS)?currentYPos:YMAXPOS;
		currentYPos = (currentYPos > YMINPOS)?currentYPos:YMINPOS;
		currentXPos = (currentXPos < XMAXPOS)?currentXPos:XMAXPOS;
		currentXPos = (currentXPos > XMINPOS)?currentXPos:XMINPOS;
		this.obj.moveTo(currentXPos,currentYPos);
		this.onDragMove(x,y);
		return true;				
	}
}

function DragMouseUp(x,y) 
{
	if (!this.active)
		return false;
	else 
	{
		this.active = false;
		if (this.checkTargets(x,y))
			this.onDragDrop();
			
		this.onDragEnd(x,y);
		//self.scrollTo(0,0);
		return true;
	}
}

function DragCheckTargets(x,y) 
{
	for (i in this.dropTargets) 
	{
		var lyr = this.dropTargets[i];
		if (checkWithinLayer(x,y,lyr))
		{
			this.targetHit = lyr;
			this.obj.oldDropTargetNum = this.obj.dropTargetNum;
			this.obj.dropTargetNum = parseInt(i)+1;
			return true;
		}
	}
	return false;
}

function checkWithin(x,y,left,right,top,bottom) {
	if ((x >= left) && (x < right) && (y >= top) && (y < bottom))
		return true;
	else
		return false;
}

function checkWithinLayer(x,y,lyr) {
	if (checkWithin(x,y,lyr.x+lyr.dragGrab[3],lyr.x+lyr.dragGrab[1],lyr.y+lyr.dragGrab[0],lyr.y+lyr.dragGrab[2]))
		return true;
	else
		return false;
}

drag = new Drag();

function detectSupport(element,type){
	var input = document.createElement(element);
	var supported = true;
	input.setAttribute('type', type);
	if(input.type != type){
		supported = false;
	}
	return supported;
}

function createColumn(name,length,width){
	var column = '';
	if(parseFloat(name) == parseInt(name) && parseFloat(length) == parseInt(length)){
		column += '<div class="row">';
		for(i=0; i<length; i++){
			column += '<div class="span-' + name + '">' + name + '</div>';
		}
		column += '</div>';
		boxCoordinates.unshift({width:width,size:name});
	}
	return column;
}

var boxCoordinates;
function createGrid(colwidth,columns,gutter,sticky){
	boxCoordinates = [];
	var width = (colwidth + gutter) * columns;
	var span = (width / columns) - gutter;
	var halfWidth = columns/2;
	var siteWidth = width - gutter
	$('#setup-results').empty();
	if(sticky != undefined){
		$('#setup-results').addClass('sticky');
	}
	else{
		$('#setup-results').removeClass('sticky');
	}
	
	// STYLES
	var styleWrap = '<style type="text/css" id="setupStyles">';
	var containerStyles = '.wrap{min-width:' + (siteWidth + 20) + 'px;}.container{width:' + (siteWidth) + 'px;}';
	var rowStyles = '.row{margin-left:-' + gutter + 'px;}';
	var columnStyles = '';
	var columnWidths = '';
	var columnOffsets = '';
	for(i=1; i<(columns+1); i++){
		if(i < columns){
			columnStyles += '.span-' + i + ',';
		}
		else{
			columnStyles += '.span-' + i + '{margin-left:' + gutter + 'px;float:left;display:inline;}';
		}
	}
	for(i=0; i<columns; i++){
		var margin = gutter * (i+1);
		var space = width - margin;
		var columnWidth = space - ((i)*span);
		columnWidths += '.span-' + ((columns) - (i)) + '{width:' + columnWidth + 'px;}';
	}
	for(i=0; i<columns-1; i++){
		var columnOffset = ((columns - (i+1)) * (span + gutter)) + gutter;
		columnOffsets += '.offset-' + ((columns) - (i+1)) + '{margin-left:' + columnOffset + 'px;}';
	}
	
	styleWrap += containerStyles + rowStyles + columnStyles + columnWidths + columnOffsets + '</style>';
	$('#setupStyles').remove();
	$('head').append(styleWrap);
	$('#cssOutput').text('/***** ' + siteWidth + '(' + columns + 'x' + colwidth + 'x' + gutter + ') *****/\n' + containerStyles + rowStyles + columnStyles + columnWidths + columnOffsets);
	$('#siteWidth').text('Site width: ' + siteWidth + 'px');
	$('#setupOutput').show();	
	
	// TOP
	$('#setup-results').append('<div class="full-width top white"><div class="container"><div class="row"><div class="span-3"><a href="http://www.wickedweb.co.uk/"><img src="images/ww_logo.png" alt="Wickedweb" /></a></div><div class="span-' + (columns - 3) + ' text-right"><ul class="inline"><li><a href="#">Nav 1</a></li><li><a href="#">Nav 2</a></li><li><a href="#">Nav 3</a></li><li><a href="#">Nav 4</a></li></ul></div></div></div></div>');
	
	// MAIN
	var mainContent = '<div class="full-width main black"><div class="container"><h1>The Grid System</h1><p>An example of a ' + columns + ' column grid system with ' + gutter + 'px gutters. Each row has a class of <code>.row</code> and each column has a class of <code>.span-X</code>.</p>';
	for(i=1; i<(columns+1); i++){
		mainContent += createColumn((columns/i),i,((colwidth + gutter) * i) - gutter);
	}
	mainContent += '</div></div>';
	$('#setup-results').append(mainContent);
	
	// FOOTER
	$('#setup-results').append('<div class="full-width footer white"><div class="container"><div class="row"><div class="span-' + Math.floor(halfWidth) + '">&copy; Copyright Wickedweb 2012</div><div class="span-' +Math.ceil(halfWidth) + ' text-right"><ul class="inline"><li><a href="#">Terms</a></li><li>|</li><li><a href="#">Privacy</a></li></ul></div></div></div></div>');
	
	stickyFooter(20);
	
	boxCoordinates.push({colwidth:colwidth,columns:columns,gutter:gutter});
}

function gridInit(){
	if(!detectSupport('input','range')){
		$('input[type="range"]').hide();
	}
	$('#columnWidth, #columnNo, #gutterWidth, #opacity').change(function(e){
		var val = parseInt($(this).val());
		$(this).parent().find('.error').remove();
		if(!isNaN(val)){
			$(this).val(val);
			$(this).parent().find('input[type="range"]').val(val);
			$('#generateGrid').click();
		}
		else{
			$('<span class="error"><br>Please enter a valid number<br></span>').insertAfter($(this));
		}
	});
	$('#colour').change(function(e){
		var val = $(this).val();
		$(this).parent().find('.error').remove();
		if(val.length <= 0){
			$('<span class="error"><br>Please enter a valid colour<br></span>').insertAfter($(this));
		}
	});
	$('#stickyFooter').change(function(e){
		$('#generateGrid').click();
	});
	$('#columnWidth, #columnNo, #gutterWidth, #opacity').keydown(function(e){
		var val = $(this).val();
		var valMin = $(this).parent().find('input[type="range"]').attr('min');
		if(e.keyCode == '38' || e.keyCode == '40'){
			e.preventDefault();
			if(e.keyCode == '38'){
				val++;
			}
			else if(e.keyCode == '40'){
				val--
			}
			if(val < valMin){
				val = valMin;
			}
			$(this).val(val);
			$(this).parent().find('input[type="range"]').val(val);
			$('#generateGrid').click();
		}
	});
	$('#columnWidthRange, #columnNoRange, #gutterWidthRange, #opacityRange').change(function(){
		$(this).parent().find('input[type="text"]').val($(this).val());
		$(this).parent().find('.error').remove();
		$('#generateGrid').click();
	});
	$('#generateGrid').click(function(e){
		e.preventDefault();
		var columnWidth = parseInt($('#columnWidth').val());
		var columnNo = parseInt($('#columnNo').val());
		var gutterWidth = parseInt($('#gutterWidth').val());
		var sticky = $('#stickyFooter:checked').val();
		$(this).next('.error').remove();
		if(!isNaN(columnWidth + columnNo + gutterWidth)){
			createGrid(columnWidth,columnNo,gutterWidth,sticky);
		}
		else{
			$('<span class="error"><br>Please complete all fields<br></span>').insertAfter($(this));
		}	
	});
	$('#close').click(function(e){
		e.preventDefault();
		$('#setup-controls').hide();
		$('#setup-results').removeAttr('id');
	});
	$('#createOverlay').click(function(e){
		e.preventDefault();
		$('body').append('<canvas id="gridOverlay"></canvas>');
		var $canvas = $('#gridOverlay');
		var ctx = $canvas[0].getContext('2d');
		var width = boxCoordinates[0].width;
		var height = (boxCoordinates.length * 40) - 40;
		var colwidth = boxCoordinates[boxCoordinates.length-1].colwidth;
		var columns = boxCoordinates[boxCoordinates.length-1].columns;
		var gutter = boxCoordinates[boxCoordinates.length-1].gutter;
		var rowheight = 20;
		$canvas.width(width);
		$canvas.height(height);
		ctx.canvas.width = width;
		ctx.canvas.height = height;
		ctx.globalAlpha = parseFloat($('#opacity').val())/100;
		ctx.fillStyle = "#000";
		ctx.fillText(width + '(' + columns + 'x' + colwidth + 'x' + gutter + ')', 0, 12);
		ctx.fillStyle = $('#colour').val();
		ctx.font = "12px Arial";
		for(i=0;i<boxCoordinates.length-1;i++){
			for(j=0;j<boxCoordinates[i].size;j++){
				ctx.fillRect(j*(boxCoordinates[i].width + gutter), (i*40) + 20, boxCoordinates[i].width, rowheight);
			}
		}
		var imageURL = $canvas[0].toDataURL();
		//imageURL = imageURL.replace("image/png", "image/octet-stream")
		//$('#overlayImg').parent().remove();
		//$('.main .container').append('<div class="row"><img id="overlayImg" class="span-' + 12 + '" src="' + imageURL + '" /></div>');
		$canvas.remove();
		window.open(imageURL);
	});
}


function calculate_color_values(hex,opacity){

	var sent_hex = hex;
	if(!sent_hex.match(/^#?([0-9A-Fa-f]){3}\s*$|^#?([0-9A-Fa-f]){6}\s*$/)){
		var msg = 'Invalid HEX value';
		$('.separate').val('');
		$('#f_rgb_for_css').val(msg);
		$('#f_rgba_for_css').val(msg);
		return false;
	};
	
	if(isNaN(opacity)){
		opacity = $('#slider').slider("value");
	};
	// remove spaces
	var hex = sent_hex.replace(' ','');
	// strip # from HEX
	hex = (hex.charAt(0) == "#" ? hex.substr(1) : hex);
	// check if 6 letters are provided
	if(hex.length == 6){
		r = parseInt(hex.substring(0,2),16);
		g = parseInt(hex.substring(2,4),16);
		b = parseInt(hex.substring(4,6),16);
	}
	else if(hex.length == 3){
		r = parseInt(hex.substring(0,1) + hex.substring(0,1),16);
		g = parseInt(hex.substring(1,2) + hex.substring(1,2),16);
		b = parseInt(hex.substring(2,3) + hex.substring(2,3),16);
	}
	
	// set results
	$('#f_r').val(r);
	$('#f_g').val(g);
	$('#f_b').val(b);
	$('#f_rgb_for_css').val('rgb(' + r + ', ' + g + ', ' + b + ')');
	$('#f_rgba_for_css').val('rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity/100 + ')');
	
	return false;
}

(function ($){
	var check=false, isRelative=true;
	$.elementFromPoint = function(x,y){
		if(!document.elementFromPoint) return null;
		if(!check){
			var sl;
			if((sl = $(document).scrollTop()) > 0){
				isRelative = (document.elementFromPoint(0, sl + $(window).height() -1) == null);
			}
			else if((sl = $(document).scrollLeft()) > 0){
				isRelative = (document.elementFromPoint(sl + $(window).width() -1, 0) == null);
			}
			check = (sl>0);
		}
		if(!isRelative){
			x += $(document).scrollLeft();
			y += $(document).scrollTop();
		}
		return document.elementFromPoint(x,y);
	}
})(jQuery);



function createNew(){
	function moveEl(x,y){
		$(document).mousemove(function(e){
			e.preventDefault();
			var top = e.pageY - y;
			var left = e.pageX - x;
			var parent = $.elementFromPoint(e.pageX,e.pageY);
			$('.follow-mouse').css({top:top, left:left});
		});
		
		$(document).mouseup(function(e){
			e.preventDefault();
			$(document).unbind('mousemove');
			$(document).unbind('mouseup');
			$('.follow-mouse').hide();
			var parent = $.elementFromPoint(e.pageX,e.pageY);
			if($(parent).parent().andSelf().is('.menu')){
				parent = $(parent).andSelf().closest('.new-element');
			}
			if($(parent).parent().andSelf().is('.lorem-ipsum')){
				parent = $(parent).closest('.new-element').parent();
			}
			if($(parent).parents().andSelf().is('.drop-zone')){
				$('.follow-mouse').append('<span class="menu"><span class="move" title="Move"></span><span class="remove" title="Remove"></span><span class="options" title="Options"><ul class="options-list"><li>Add Class</li><li class="inactive">Add Style</li></ul></span></span>');
				if($('.follow-mouse').is('.lorem-ipsum')){
					$('.follow-mouse').append('<div contenteditable>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget erat risus, id scelerisque purus. Curabitur non diam justo, id vehicula erat. Morbi sem est, laoreet id mattis eu, blandit eleifend libero. Nulla id diam velit, blandit lacinia odio. Nunc id sem quis massa euismod malesuada non eu tellus. Donec ut risus erat. Sed faucibus semper varius. Nullam gravida suscipit velit at tincidunt.</div><input class="html-input" type="text" value="" /></div>').find('.menu').append('<span class="edit-html" title="Remove"></span>');
				}
				var foundX = false;
				var foundY = false;
				$(parent).find('> .row, > .full-width, > .container, > [class|="span"]').each(function(){
					if($(this).offset().top > e.pageY){
						$('.follow-mouse').insertBefore($(this));
						foundY = true;
						return false;
					}
				});
				$(parent).find('[class|="span"]').each(function(){
					if($(this).offset().left > e.pageX && $('.follow-mouse').is('[class|="span"]')){
						$('.follow-mouse').insertBefore($(this));
						foundX = true;
						return false;
					}
				});
				
				if(!foundX && !foundY){
					$('.follow-mouse').appendTo(parent);
				}
				if($('.follow-mouse').is('[class|="span"]') && !$('.follow-mouse').parent().is('.row')){
					$('.follow-mouse').addClass('error').append('<span class="error-text">Columns must be placed within rows</span>');
				}
				else if($('.follow-mouse').width() > $('.follow-mouse').parent().width()){
					$('.follow-mouse').addClass('error').append('<span class="error-text">This column is too wide for its container</span>');
				}
				else if($('.follow-mouse').is('.footer') && !$('.follow-mouse').parent().is('.drop-zone')){
					$('.follow-mouse').addClass('error').append('<span class="error-text">The footer must be placed within the main parent</span>');
				}
				else if($('.follow-mouse').is('.footer') && $('.full-width.footer').size() > 1){
					$('.follow-mouse').addClass('error').append('<span class="error-text">You can only use one footer item</span>');
				}
				$('.follow-mouse').removeClass('follow-mouse').removeAttr('style');
			}
			else{
				$('.follow-mouse').remove();
			}
			
		});
	}
	
	$('[class|=new]').mousedown(function(e){
		e.preventDefault();
		var className = $(this).attr('class').replace('new-','');
		var top = e.pageY- 10;
		var left = e.pageX - 10;
		$('body').append('<div class="' + className + ' follow-mouse new-element"></div>');
		$('.follow-mouse').css({position:'absolute', zIndex:'9999', top:top, left:left});
		moveEl(10,10);
	});
	
	$('.move').live('mousedown', function(e){
		e.preventDefault();
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var $this = $(this).closest('.new-element');
		var x = e.pageX - $this.offset().left;
		var y = e.pageY - $this.offset().top;
		var top = e.pageY - y;
		var left = e.pageX - x;
		var width = $this.width();
		
		$('.options.on').removeClass('on');
		$this.removeClass('error').addClass('follow-mouse').appendTo('body').css({position:'absolute', zIndex:'9999', top:top, left:left, width: width}).find('.error-text').remove();
		moveEl(x,y);
	});
	
	$(document).on('click', '.remove', function(){
		$(this).closest('.new-element').remove();
	});
	$(document).on('click', '.options', function(){
		var $this = $(this);
		if($this.is('.on')){
			$this.removeClass('on').attr('title','options');
		}
		else{
			$this.addClass('on').removeAttr('title');
			$(document).one('click', function(){
				$this.removeClass('on').attr('title','options');
			});
		}
	});
}

$(function(){
	gridInit();
	createNew();
});
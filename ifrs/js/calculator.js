maxDigits = 16;

window.onerror = handleError;

function initialise() {
	display = "0";
	hasError = false;
	numDigits = 0;
	calculation = "";
	thisKey = "";
	lastKey = "";
	allowCalc = false;
	clearOnNum = false;
	updateDisplay();
}

function calcBtn(key) {
	if (!hasError) {
		allowCalc = false;
		lastKey = thisKey;
		thisKey = key;
		switch (key) {
			case "1":case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":case "0":case ".":
				if (numDigits<maxDigits) {
					if (clearOnNum) {
						calculation = "";
						lastKey = "";
						clearOnNum = false;
					}
					numDigits ++;
					if ((display=="0")||(keyType(lastKey)=="operator")||(calculation == "")) {
						display = thisKey;
					} else {
						display += thisKey;
					}
					calculation += thisKey;
				}
				break;
			case "+":case "-":case "/":case "*":
				if (keyType(lastKey) == "number") {
					allowCalc = true;
				} else if (keyType(lastKey) == "operator") {
					calculation = calculation.substring(0, calculation.length-1);
				}
				doCalc();
				calculation += thisKey;
				clearOnNum = false;
				break;
			case "ce":
				display = "0";
				calculation = calculation.substring(0, calculation.length-1);
				thisKey = lastKey;
				clearOnNum = false;
				break;
			case "c":
				display = "0";
				calculation = "";
				thisKey = "";
				lastKey = "";
				clearOnNum = false;
				break;
			case "=":
				if (keyType(lastKey) == "number") {
					allowCalc = true;
					thisKey = "";
				}
				doCalc();
				break;
		}
		updateDisplay();
	}
}
		
function doCalc() {
	if (allowCalc) {
		var multiplyer = 0;
		opperator = '';

/*
		if(calculation.indexOf('*')!=-1)
		{
			nums = calculation.split('*');
			if(nums[0].indexOf('.')!=-1){multiplyer = nums[0].split('.')[1].length;}
			if(nums[1].indexOf('.')!=-1){multiplyer += nums[1].split('.')[1].length;}
			reFind = /\./g;
			//alert(nums[0])
			//alert(nums[1])
			//alert(multiplyer)
			nums[0] = parseInt(nums[0].replace(reFind,''));
			nums[1] = parseInt(nums[1].replace(reFind,''));
			result = nums[0]*nums[1];
			if(multiplyer){result = result/(multiplyer*10)}
		}
		else
		{
			result = eval(calculation);
		}
*/
		result = format(eval(calculation));
		display = result.toString();
		if ((result == "Infinity") || (isNaN(result)) || (result == "Error")) {
			display = "Error";
			updateDisplay();
			hasError = true;
			setTimeout("initialise()",1000);
			return;
		}
		if (display.length+1>maxDigits) {
			if (result<1) {
				display = display.substring(0, maxDigits);
			} else if (result>1000000000000) {
				display = "Error";
				updateDisplay();
				hasError = true;
				setTimeout("initialise()",1000);
				return;
			}
		}
		calculation = result;
		allowCalc = false;
		clearOnNum = true;
		numDigits = 0;
	}
	updateDisplay();
}

function format(value)
{
 	var valStr = "" + value;
 	if (valStr.indexOf("N")>=0 || (value == 2*value && value == 1+value))
		return "Error";
	var i = valStr.indexOf("e")
	if (i>=0)
	{
		var expStr = valStr.substring(i+1,valStr.length);
		if (i>11) i=11;  // max 11 digits
		valStr = valStr.substring(0,i);
		if (valStr.indexOf(".")<0) valStr += ".";
 		valStr += " " + expStr;
 	}
 	else
 	{
 		var valNeg = false;
 		if (value < 0)
 			{ value = -value; valNeg = true; }

 		var valInt = Math.floor(value);
 		var valFrac = value - valInt;
 		var prec = maxDigits - (""+valInt).length - 1;	// how many digits available after period
		var mult = " 1000000000000000000".substring(1,prec+2);
		var frac = Math.floor(valFrac * mult + 0.5);

		valInt = Math.floor(Math.floor(value * mult + .5) / mult);

		if (valNeg)

			valStr = "-" + valInt;

		else

			valStr = "" + valInt;

		var fracStr = "00000000000000"+frac;
		fracStr = fracStr.substring(fracStr.length-prec, fracStr.length);
		i = fracStr.length-1;
		while (i>=0 && fracStr.charAt(i)=="0")
			--i;
		fracStr = fracStr.substring(0,i+1);
		if (i>=0) valStr += "." + fracStr;
	}
	return valStr;
}

function updateDisplay() {
	/*
	cD = "calculation " + calculation + "<br />lastKey " + lastKey;
	cD += "<br />thisKey " + thisKey +  "<br />clearOnNum " + clearOnNum + "<br />numDigits " + numDigits;
	document.all.calcDebug.innerHTML = cD;
	*/
	document.getElementById("calcDisplay").innerHTML = display ;
}

function keyType(key) {
	switch (key) {
		case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0": case ".":
			return "number";
			break;
		case "+": case "-": case "/": case "*":
			return "operator"
			break;
		case "ce":
			return "ce";
			break;
		case "c":
			return "c";
			break;
		case "=":
			return "=";
			break;
	}
}

function handleError() {
	display = "Error";
	updateDisplay();
	hasError = true;
	setTimeout("initialise()",1000);
	return true;
}

var dictionary = {};
var dictionaryLength = 94;

dictionary = {
	01:'y',
	02:'d',
	03:"(",
	04:'T',
	05:'s',
	06:'B',
	07:"\\",
	08:'i',
	09:'V',
	10:'e',
	11:"/",
	12:"?",
	13:'f',
	14:'v',
	15:'Ñ',
	16:"^",
	17:'R',
	18:'L',
	19:"_",
	20:'o',
	21:'F',
	22:'j',
	23:")",
	24:'Y',
	25:'C',
	26:'a',
	27:"&",
	28:'X',
	29:'7',
	30:"!",
	31:'9',
	32:'8',
	33:"%",
	34:'A',
	35:'Q',
	36:";",
	37:'6',
	38:'3',
	39:"=",
	40:'N',
	41:'4',
	42:'u',
	43:",",
	44:'r',
	45:'q',
	46:'2',
	47:".",
	48:'P',
	49:'g',
	50:'"',
	51:'Z',
	52:'O',
	53:"$",
	54:'k',
	55:'5',
	56:'c',
	57:'x',
	58:":",
	59:'D',
	60:'G',
	61:'n',
	62:"-",
	63:'U',
	64:'1',
	65:'M',
	66:'E',
	67:"[",
	68:'t',
	69:"`",
	70:'w',
	71:'W',
	72:'J',
	73:'b',
	74:"]",
	75:'ñ',
	76:"}",
	77:'m',
	78:'K',
	79:"{",
	80:'S',
	81:"+",
	82:'H',
	83:'I',
	84:"~",
	85:'l',
	86:"*",
	87:'h',
	88:'z',
	89:'p',
	90:'0',
	91:"'",
	92:"|",
	93:"@",
	94:' ',
	97:"eof",
	98:"vne",
	99:"num",
	164:"sxf"
}

function encrypt(textToEncrypt,method)
{
	var encryptedText;
	method || ( method = 'eof' );
	switch(method.toLowerCase())
	{
		case 'eof':
			encryptedText = encryptEzeoleaf(textToEncrypt);
			break;
		case 'vne':
			encryptedText = encryptVigenere(textToEncrypt);
			break;
		case 'num':
			encryptedText = encryptNumeric(textToEncrypt);
			break;
		case 'sxf':
			encryptedText = encryptSixtyFour(textToEncrypt);
			break;
	}
	return encryptedText;
}

function disencrypt(textToDisencrypt)
{
	var indexMethod,configMethod, config, method, text, disencryptedText;
	indexConfig = textToDisencrypt.indexOf('¿¡');
	indexMethod = textToDisencrypt.lastIndexOf('¿¡');

	config = textToDisencrypt.substring((indexConfig + 2), indexMethod);
	method = dictionary[parseInt(textToDisencrypt.substring((indexMethod + 2)))];

	text = textToDisencrypt.substring(0, indexConfig);

	switch(method)
	{
		case 'eof':
			disencryptedText = disencryptEzeoleaf(text,config);
			break;
		case 'vne':
			disencryptedText = disencryptVigenere(text);
			break;
		case 'num':
			disencryptedText = disencryptNumeric(text,config);
			break;
		case 'sxf':
			disencryptedText = disencryptSixtyFour(text,config);
			break;
	}

	return disencryptedText;
}

function encryptEzeoleaf(text)
{
	var eTextToReturn = "";
	//Busco los tres controles y su signo
	move1 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	do
	{
		move2 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	}while(move2 == move1);


	do
	{
		move3 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	}while(move3 == move1 || move3 == move2);
	
	sign1 = (Math.floor(Math.random() * 2));
	sign2 = (Math.floor(Math.random() * 2));
	sign3 = (Math.floor(Math.random() * 2));

	for(var i = 0; i < text.length; i++)
	{
		eTextToReturn += getSymbolEzeoleaf(text[i],move1,sign1);
		eTextToReturn += getSymbolEzeoleaf(text[i],move2,sign2);
		eTextToReturn += getSymbolEzeoleaf(text[i],move3,sign3);
	}
	eTextToReturn += '¿¡'+move1+'-'+sign1+'-'+move2+'-'+sign2+'-'+move3+'-'+sign3+'¿¡'+inObject('eof');
	return eTextToReturn;

}

function getSymbolEzeoleaf(character, move, sign)
{
	var idSymbol,symbolIdToSearch;
	idSymbol = inObject(character,dictionary);
	if(sign == 0)
	{
		if((idSymbol + move) <= dictionaryLength)
		{
			symbolIdToSearch = idSymbol + move;
		}
		else
		{
			symbolIdToSearch = move - (dictionaryLength - idSymbol);
		}
	}
	else
	{
		if((idSymbol - move >= 1))
		{
			symbolIdToSearch = idSymbol - move;
		}
		else
		{
			symbolIdToSearch = dictionaryLength - (move - idSymbol);
		}
	}
	return dictionary[symbolIdToSearch];
}

function revertSign(sign)
{
	if(parseInt(sign) == 0)
		return 1;
	else
		return 0;
}

function disencryptEzeoleaf(text, config)
{
	var move1,move2,move3,sign1,sign2,sign3, dTextToReturn = '';
	var vConfig = config.split('-');
	move1 = parseInt(vConfig[0]);
	
	sign1 = revertSign(vConfig[1])

	for(var i = 0; i < text.length; (i=i+3))
	{
		dTextToReturn += getSymbolEzeoleaf(text[i],move1,sign1);
	}
	return dTextToReturn;
}

function encryptVigenere(text)
{
	var longText,wordToCodeWith,codeWord = '';
	var eTextToReturn = '';
	wordToCodeWith = 'crypto';
	cantOfWords = Math.floor(text.length / wordToCodeWith.length);
	cantOfLetters = text.length - (cantOfWords * wordToCodeWith.length);

	for(var i = 1; i <= cantOfWords; i++)
	{
		codeWord += wordToCodeWith;
	}

	for(var i = 0; i < cantOfLetters; i++)
	{
		codeWord += wordToCodeWith[i];
	}

	for(var i = 0; i < text.length; i++)
	{
		eTextToReturn += getSymbolVigenere(text[i],codeWord[i],1);
	}

	eTextToReturn += '¿¡'+inObject('vne');

	return eTextToReturn;
}

function getSymbolVigenere(char1, char2, sign)
{
	var value1,value2,symbolIdToSearch;

	value1 = parseInt(inObject(char1));
	value2 = parseInt(inObject(char2));

	if(sign == 0)
	{
		if((value1 + value2) <= dictionaryLength)
		{
			symbolIdToSearch = value1 + value2;
		}
		else
		{
			symbolIdToSearch = value2 - (dictionaryLength - value1);
		}
	}
	else
	{
		if((value1 - value2 >= 1))
		{
			symbolIdToSearch = value1 - value2;
		}
		else
		{
			symbolIdToSearch = dictionaryLength - (value2 - value1);
		}
	}

	return dictionary[symbolIdToSearch];
}

function disencryptVigenere(text)
{
	var longText,wordToCodeWith,codeWord = '';
	var dTextToReturn = '';
	wordToCodeWith = 'crypto';
	cantOfWords = Math.floor(text.length / wordToCodeWith.length);
	cantOfLetters = text.length - (cantOfWords * wordToCodeWith.length);

	for(var i = 1; i <= cantOfWords; i++)
	{
		codeWord += wordToCodeWith;
	}

	for(var i = 0; i < cantOfLetters; i++)
	{
		codeWord += wordToCodeWith[i];
	}

	for(var i = 0; i < text.length; i++)
	{
		dTextToReturn += getSymbolVigenere(text[i],codeWord[i],0);
	}

	return dTextToReturn;
}

function encryptNumeric(text)
{
	var eTextToReturn = "";
	//Busco los tres controles y su signo
	move1 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	do
	{
		move2 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	}while(move2 == move1);


	do
	{
		move3 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	}while(move3 == move1 || move3 == move2);
	
	sign1 = (Math.floor(Math.random() * 2));
	sign2 = (Math.floor(Math.random() * 2));
	sign3 = (Math.floor(Math.random() * 2));

	for(var i = 0; i < text.length; i++)
	{
		eTextToReturn += getSymbolNumeric(text[i],move1,sign1);
		eTextToReturn += getSymbolNumeric(text[i],move2,sign2);
		eTextToReturn += getSymbolNumeric(text[i],move3,sign3);
	}
	eTextToReturn += '¿¡'+move1+'-'+sign1+'-'+move2+'-'+sign2+'-'+move3+'-'+sign3+'¿¡'+inObject('num');
	return eTextToReturn;
}

function getSymbolNumeric(character, move, sign)
{
	var idSymbol,symbolIdToSearch;
	idSymbol = inObject(character,dictionary);//parseInt(character)//
	if(sign == 0)
	{
		if((idSymbol + move) <= dictionaryLength)
		{
			symbolIdToSearch = idSymbol + move;
		}
		else
		{
			symbolIdToSearch = move - (dictionaryLength - idSymbol);
		}
	}
	else
	{
		if((idSymbol - move >= 1))
		{
			symbolIdToSearch = idSymbol - move;
		}
		else
		{
			symbolIdToSearch = dictionaryLength - (move - idSymbol);
		}
	}
	if(symbolIdToSearch.toString().length == 1)
		symbolIdToSearch = '0'+symbolIdToSearch.toString();

	return symbolIdToSearch;
}

function disencryptNumeric(text,config)
{
	var move1,move2,move3,sign1,sign2,sign3, dTextToReturn = '';
	var vConfig = config.split('-');
	move1 = parseInt(vConfig[0]);
	
	sign1 = revertSign(vConfig[1]);

	for(var i = 0; i < text.length; (i=i+6))
	{
		dTextToReturn += dictionary[parseInt(getSymbolNumeric(dictionary[parseInt(text[i]+text[i+1])],move1,sign1))];
	}
	return dTextToReturn;
}

function encryptSixtyFour(text)
{
	var originalLength,eTextToReturn = "";
	originalLength = text.length;

	if(originalLength < 16)
		text = completeText(text);

	//Busco los cuatro controles y su signo para asegurarme la longitud de 64
	move1 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	do
	{
		move2 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	}while(move2 == move1);


	do
	{
		move3 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	}while(move3 == move1 || move3 == move2);

	do
	{
		move4 = (1 + Math.floor(Math.random() * (dictionaryLength - 1)));
	}while(move4 == move1 || move4 == move2 || move4 == move3);
	
	sign1 = (Math.floor(Math.random() * 2));
	sign2 = (Math.floor(Math.random() * 2));
	sign3 = (Math.floor(Math.random() * 2));
	sign4 = (Math.floor(Math.random() * 2));


	for(var i = 0; i < text.length; i++)
	{
		eTextToReturn += getSymbolSixtyFour(text[i],move1,sign1);
		eTextToReturn += getSymbolSixtyFour(text[i],move2,sign2);
		eTextToReturn += getSymbolSixtyFour(text[i],move3,sign3);
		eTextToReturn += getSymbolSixtyFour(text[i],move4,sign4);
	}
	eTextToReturn += '¿¡'+move1+'-'+sign1+'-'+move2+'-'+sign2+'-'+move3+'-'+sign3+'-'+originalLength+'¿¡'+inObject('sxf');
	return eTextToReturn;
}

function getSymbolSixtyFour(character, move, sign)
{
	var idSymbol,symbolIdToSearch;
	idSymbol = inObject(character,dictionary);
	if(sign == 0)
	{
		if((idSymbol + move) <= dictionaryLength)
		{
			symbolIdToSearch = idSymbol + move;
		}
		else
		{
			symbolIdToSearch = move - (dictionaryLength - idSymbol);
		}
	}
	else
	{
		if((idSymbol - move >= 1))
		{
			symbolIdToSearch = idSymbol - move;
		}
		else
		{
			symbolIdToSearch = dictionaryLength - (move - idSymbol);
		}
	}
	return dictionary[symbolIdToSearch];
}

function disencryptSixtyFour(text,config)
{
	var move1, sign1, longText, cantOfOriginalChars, dTextToReturn = '';
	var vConfig = config.split('-');

	move1 = parseInt(vConfig[0]);
	
	sign1 = revertSign(vConfig[1]);

	longText = parseInt(vConfig[6]);

	if(longText < 16)
	{
		cantOfOriginalChars = longText * 4;
		text = text.substring(0,(cantOfOriginalChars - 1));
	}

	for(var i = 0; i < text.length; (i=i+4))
	{
		dTextToReturn += getSymbolSixtyFour(text[i],move1,sign1);
	}
	return dTextToReturn;
}

function completeText(text)
{
	var cantOfChar,randomChar,textComplete;
	cantOfChar = 16 - text.length;
	textComplete = text;
	for(var i = 0; i < cantOfChar; i++)
	{
		randomChar = (1 + Math.floor(Math.random() * dictionaryLength));
		textComplete += dictionary[randomChar];
	}
	return textComplete;
}

function inObject(value)
{
	for (key in dictionary) {
   		if(value == dictionary[key])
   		{
   			return parseInt(key);
   		}
	}
}
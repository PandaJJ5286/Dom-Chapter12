// 文档加载后，运行函数

function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof oldonload != function){
		window.onload = func;
	} else{
		oldonload();
		func();
	}

}

// insertAfter()函数

function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

// addClass()函数

function addClass(element, value){
	if(!element.className){
		element.className = value;
	}else {
		var newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}
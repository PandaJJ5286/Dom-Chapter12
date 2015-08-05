// 文档加载后，运行函数

function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof oldonload != 'function'){
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

//  highlightPage()函数，页面突出显示

function highlightPage(){
	var headers = document.getElementsByTagName('header');
	if(headers.length == 0) return false;
	var navs = document.getElementsByTagName('nav');
	if(navs.length == 0) return false;
	var links = document.getElementsByTagName('a');
	var linkurl;  /*原本自己在for循环中定义，看了源码应将变量在for循环外定义，这是为什么呢？*//*暂时想到的原因是重复定义会造成效率降低*/
	for(var i = 0; i < links.length; i++){
		linkurl = links[i].getAttribute('href');
		if(window.location.href.indexOf(linkurl) != -1){
			addClass(links[i],'here');
			// 下面两行代码的语法不熟，nodeValue用来取得标签文本。设置属性记得用setAttribute()方法；
			var linkText = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linkText);
		}
	}
}
addLoadEvent(highlightPage);
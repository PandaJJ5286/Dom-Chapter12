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
	if(!document.getElementsByTagName) return false;

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

// 幻灯片功能实现

function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	// 添加安全检查，确保元素具有left,right属性
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.right){
		elem.style.right = "0px";
	}
	
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.right);

	if(xpos == final_x && ypos == final_y){
		return true;
	}

	var dist;
	if(xpos<final_x){
		dist = Math.ceil((final_x-xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos>final_x){
		dist = Math.ceil((xpos-final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos<final_y){
		dist = Math.ceil((final_y-ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos>final_y){
		dist = Math.ceil((ypos-final_y)/10);
		ypos = ypos - dist;
	}

	elem.style.left = xpos + "px";
	elem.style.right = ypos + "px";

	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}

// 创建幻灯片元素并准备相应链接

function prepareSlideshow(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	
	var intro = document.getElementById("intro");
	
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);

	var preview = document.createElement("img");
	preview.setAttribute("id","preview");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");

	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	
	var links = document.getElementsByTagName('a');  //全页面a标签触发幻灯片切换功能
	// var links = intro.getElementsByTagName('a');  //“intro” 段落中的链接触发幻灯片功能
	var destination;
	for (var i=0;i<links.length;i++){
		links[i].onmouseover = function(){
			destination = this.getAttribute('href');
			if(destination.indexOf("index.html") != -1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html") != -1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html") != -1){
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html") != -1){
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html") != -1){
				moveElement("preview",-600,0,5);
			}
		}
	}
}

addLoadEvent(prepareSlideshow);


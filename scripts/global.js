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

// Navigation
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

// Home
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

// About
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

// 选择性的显示某一部分
function showSection (id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i<sections.length; i++) {
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="none";
		} else{
			sections[i].style.display="block"
		}
	}
}

function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for(var i = 0;i<links.length;i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display ="none";
		links[i].destination = sectionId;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
	}
}

addLoadEvent(prepareInternalnav);

// photos

function showPic(whichPic){
	if(!document.getElementById("placeholder")) return true;
	var source = whichPic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if(!document.getElementById("description")) return false;
	if(whichPic.getAttribute('title')){
		var text = whichPic.getAttribute('title');
	}else{
		var text="";
	}
	var description = document.getElementById("description");
	if(description.firstChild.nodeType == 3){
		description.firstChild.nodeValue = text;
	}
	return false;
}

function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;

	var placeholder = document.createElement("img");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery")
	placeholder.setAttribute("id","placeholder");

	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}

function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;

	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i=0;i<links.length;i++){
		links[i].onclick = function(){
			return showPic(this);
		}
	}
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
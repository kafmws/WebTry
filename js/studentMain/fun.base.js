function rand( minDit , maxDit ) {
	return Math.floor(Math.random() * (maxDit - minDit + 1)) + minDit;
};

function getViewSize(){
	var de=document.documentElement;
	var db=document.body;
	var viewW=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
	var viewH=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
	return Array(viewW ,viewH);
};// JavaScript Document
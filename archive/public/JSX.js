// JSX
function show(self) {
	self.style.display = "initial"
}

function hide(self) {
	self.style.display = "none"
}

function pop(self) {
	self.remove()
}

function onclick(self,func) {
	self.addEventListener("click",func)
}

function onmouseenter(self,func) {
	self.addEventListener("mouseover",func)
}

function onmouseexit(self,func) {
	self.addEventListener("mouseout",func)
}

function $(_id) {
	return document.getElementById(_id)
}
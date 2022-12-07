// for the stiky navigation
let nav = document.querySelector('header > nav')
var body = document.querySelector('body')

// the search box btn
let btn = document.querySelector('header > nav > div.left > .search-btn')
let liyer = document.querySelector('.liyer')	

function activeremove(){
	if (btn.parentElement.classList.contains('active')){
		btn.parentElement.classList.remove('active')	
		liyer.classList.remove('active')
	}
}

btn.addEventListener('click', e => {
	btn.parentElement.classList.toggle('active')	
	liyer.classList.toggle('active')
})
liyer.addEventListener('click', e => {
	activeremove()
})
window.addEventListener('scroll', e => {
	activeremove()
	if (window.scrollY > 0){
		nav.classList.add('sticky')
	}else{
		nav.classList.remove('sticky')
	}
})


// the slide show animation

let boxWrapper = document.querySelector('section.suggest > .box-wrapper')
let box = document.querySelectorAll('section.suggest > .box-wrapper .box')
let btnRgiht = document.querySelector('section.suggest > .header > .btn-wrapper > .btn-right')
let btnLeft = document.querySelector('section.suggest > .header > .btn-wrapper > .btn-left')

function getTranslateX(myElement) {
	if (myElement){
		var style = window.getComputedStyle(myElement);
		var matrix = new WebKitCSSMatrix(style.transform);
		return (matrix.m41)
	}
	return 0
}

const translateX = getTranslateX(boxWrapper)

function getBoxWidth(){
	var boxWith = 0
	Array.from(box).forEach(mybox => {
		let style = window.getComputedStyle(mybox)
		boxWith += (mybox.clientWidth + (parseInt(style.marginLeft.slice(0, -2))) + parseInt(style.marginRight.slice(0, -2)))
	})

	return boxWith
}
function next(){
	if (((getTranslateX(boxWrapper)+ body.clientWidth) + 250) <= getBoxWidth()){
		boxWrapper.style.transform = `translateX(${(getTranslateX(boxWrapper) + 390)}px)`
	}else{
		if (boxWrapper){
			boxWrapper.style.transform = `translateX(0px)`
		}
	}
}
function prev(){
	if (((getTranslateX(boxWrapper)+ body.clientWidth) + 250) <= getBoxWidth()){
		boxWrapper.style.transform = `translateX(${translateX + body.clientWidth + 250}px)`
	}else{
		boxWrapper.style.transform = `translateX(${(getTranslateX(boxWrapper) + 390)}px)`
	}
}
function animate(){
	next()
}


let stating = setInterval(animate, 5000)

Array.from(box).forEach(b => {
	b.addEventListener('mouseover', e => {
		clearInterval(stating)
	})
})
Array.from(box).forEach(b => {
	b.addEventListener('mouseleave', e => {
		stating = setInterval(animate, 5000)
	})
})
if (btnRgiht){
	btnRgiht.addEventListener('click', e => {
		next()
	})
}

// the navigation btn 
let navBtn = document.querySelector('header > nav > .btn')
navBtn.addEventListener('click', e => {
	nav.classList.toggle('show')
})

// for the showing navigation while nav is active and window width is less than 1200 px
let ulBtn = document.querySelectorAll('header > nav.show > ul > li > div > span')
Array.from(ulBtn).forEach(btn => {
	btn.addEventListener('click', e => {
		Array.from(ulBtn).forEach(b => {
			if(btn != b){
				b.parentElement.parentElement.classList.remove('active')
			}

		})
		btn.parentElement.parentElement.classList.toggle('active')
	})
})

// popup login box
let loginBtn = document.querySelector('nav > div.left .login')
let lyear = document.querySelector('header > nav > div.left  .leyar')
let loginWrapper = document.querySelector('nav > div.left .login-wrapper')
loginBtn.addEventListener('click', e => {
	loginWrapper.classList.add('active')
})
lyear.addEventListener('click', e => {
	loginWrapper.classList.remove('active')
})
window.addEventListener('scroll', e => {
	loginWrapper.classList.remove('active')
})

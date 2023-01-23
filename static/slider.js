//Класс комнаты
class Room{
    constructor(img, city, area, timeRepair){
        this.img = img;
        this.city = city;
        this.area = area;
        this.timeRepair = timeRepair;
    }

    getInfo() {
        return [ this.city, this.area, this.timeRepair ];
    }
}

const rooms = [
    new Room("./static/img/slide_1.jpg", "Rostov-on-Don LCD admiral", "81 m2", "3,5 mounths"),
    new Room("./static/img/slide_2.png", "Sochi<br>Thieves", "105 m2", "4 mounths"),
    new Room("./static/img/slide_3.jpg", "Rostov-on-Don Patriotic", "93 m2", "3 mounths")
]

const jsCircles = document.querySelectorAll(".js-circle");
const selectors = document.querySelector(".js-selector-bar").children;
const jsTextBlocks = document.getElementsByClassName("js-text-block");
const jsRightArrow = document.querySelector(".js-right-arrow");
const jsLeftArrow = document.querySelector(".js-left-arrow");
const jsSlide = document.querySelector(".js-slide");

//Переключение на следующий слайд
function next(){
    let slide = jsSlide.getAttribute("src");

    for (let i = 0; i < rooms.length; i++) {
        if(slide == rooms[i].img){
            if(i == rooms.length - 1)
                toggleSlide(0);
            else
                toggleSlide(i + 1);
        }
    }
}

//Переключение на предыдущий слайд
function prev(){
    let slide = jsSlide.getAttribute("src");

    for (let i = rooms.length - 1; i >= 0; i--) {
        if(slide == rooms[i].img){
            if(i == 0)
                toggleSlide(rooms.length - 1);
            else 
                toggleSlide(i - 1);
        }
    }
}

//Переключение слайда
function toggleSlide(index, activeCircle){
    jsSlide.style.opacity = 0;
    setTimeout(() => {
        if(activeCircle === undefined) 
            activeCircle = document.querySelector(".js-circle[data-active]");
        
        circleActivated(index, activeCircle);
        setInfo(index);
        
        jsSlide.setAttribute("src", rooms[index].img);
        jsSlide.style.opacity = 1;
    }, 200);
}

//Перенос аттрибута data-active на другой переключатель
function circleActivated(index, activeCircle){
    delete activeCircle.dataset.active;
    jsCircles[index].dataset.active = true;
}

//Назначение содержимого, описывающего выбранный объект
function setInfo(index){
    const info = rooms[index].getInfo();

    for (let i = 0; i < jsTextBlocks.length - 1; i++) {
        jsTextBlocks[i].innerHTML = info[i]; 
    }
}

//Сравнение индекса нажатого элемента с индексом активного
function clickByElement(array, element){
    const activeCircle = document.querySelector(".js-circle[data-active]");
    const activeIndex = Array.from(jsCircles).indexOf(activeCircle);
    const index = Array.from(array).indexOf(element);

    if(index !== activeIndex)
        toggleSlide(index, activeCircle);
}

function circleClick() { 
    clickByElement(jsCircles, this); 
}

function selectorClick() {
    clickByElement(selectors, this);
}

jsLeftArrow.addEventListener("click", prev);
jsRightArrow.addEventListener("click", next);
Array.from(jsCircles).forEach(circle => {
    circle.addEventListener("click", circleClick);
});
Array.from(selectors).forEach(selector => {
    selector.addEventListener("click", selectorClick);
});
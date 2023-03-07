// function openMe(){
//     var element = document.getElementById("myDIV");
//     element.classList.remove("col-md-12");
//     element.classList.add("col-md-6");
//     var otherelement = document.getElementById("myotherDIV");
//     otherelement.classList.remove("col-md-0");
//     otherelement.classList.add("col-md-6");
//     otherelement.classList.remove("d-none");
//     otherelement.style.display=block;
//     console.log(element);
// }

function openMe() {
    var element = document.getElementById("myDIV");
    var otherelement = document.getElementById("myotherDIV");
    if (element.classList.contains("col-md-12")) {
        element.classList.remove("col-md-12");
        element.classList.add("col-md-6");
        otherelement.classList.remove("col-md-0");
        otherelement.classList.add("col-md-6");
        otherelement.classList.remove("d-none");
        otherelement.style.display = "block";
        console.log(element);
    } else {
        element.classList.remove("col-md-6");
        element.classList.add("col-md-12");
        otherelement.classList.remove("col-md-6");
        otherelement.classList.add("col-md-0");
        otherelement.classList.add("d-none");
    }
}

const openMenu = document.querySelector('#show-menu')
const hideMenuIcon = document.querySelector('#hide-menu')
const sideMenu = document.querySelector('#nav-menu')

openMenu.addEventListener('click', function() {
    sideMenu.classList.add('active')
})

hideMenuIcon.addEventListener('click', function() {
    sideMenu.classList.remove('active')
})
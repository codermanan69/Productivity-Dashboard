function openfeatures() {
    var allElems = document.querySelectorAll('.elem')
var fullElemPage = document.querySelectorAll('.fullElem')
var fullElemPageBackbtn = document.querySelectorAll('.fullElem .back')
allElems.forEach(function(elem){
    elem.addEventListener('click', function(){
        fullElemPage[elem.id].style.display = 'block'
    })
})
fullElemPageBackbtn.forEach(function(back) {
    back.addEventListener('click', function (){
        fullElemPage[back.id].style.display = 'none'
    })
    
})
}
openfeatures()
function openfeatures() {
    var allElems = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullElem')
    var fullElemPageBackbtn = document.querySelectorAll('.fullElem .back')
    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
            localStorage.setItem('currentOpenPage', elem.id)
        })
    })
    fullElemPageBackbtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
            localStorage.removeItem('currentOpenPage')
        })

    })
    
    // Restore the page on reload
    var savedPage = localStorage.getItem('currentOpenPage')
    if (savedPage !== null) {
        fullElemPage[savedPage].style.display = 'block'
    }
}
openfeatures()

function todolist() {
    let form = document.querySelector('.addtask form')
    let taskInput = document.querySelector('.addtask #task-input')
    let taskDetailsInput = document.querySelector('.addtask textarea')
    let taskcheckbox = document.querySelector('.addtask form input[type="checkbox"]')

    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is empty');

    }


    function renderTask() {

        let alltask = document.querySelector('.alltask');

        let sum = ''

        currentTask.forEach(function (elem,idx) {
            sum = sum + ` <div class="task">
                        <h5>${elem.task} <span class= ${elem.imp}>imp </span> </h5>
                        <button id= ${idx}>Mark as Completed </button>
                        
                    </div>`

        })

        alltask.innerHTML = sum
        localStorage.setItem('currentTask', JSON.stringify(currentTask))

       document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)

                renderTask()
              

            })
        })

    }

    renderTask()



    form.addEventListener('submit', function (e) {
        e.preventDefault()

        //  console.log(taskInput.value);
        //  console.log(taskDetailsInput.value);
        //  console.log(taskcheckbox.checked);


        currentTask.push({ task: taskInput.value, details: taskDetailsInput.value, imp: taskcheckbox.checked })

        renderTask()

        taskcheckbox.checked = false 
        taskInput.value = ''
        taskDetailsInput.value = ''



    })


}

// todolist()

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

var hours = Array.from({length:18},(elem,idx)=>`${6+idx}:00 - ${7+idx}:00`)



var wholedaysome = ''
hours.forEach(function(elem,idx){

     var savedData = dayPlanData[idx] || ''
   wholedaysome = wholedaysome + `<div class="day-planner-time">
            <p>${elem}</p>
            <input id = ${idx} type="text" placeholder="..." value=${savedData}>
           </div>`
})

dayPlanner.innerHTML = wholedaysome


var dayPlannerInput = document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function(elem){
    elem.addEventListener('input', function() {
       dayPlanData[elem.id] = elem.value
        
       localStorage.setItem('dayPlanData', JSON.stringify(
        dayPlanData
       ))
       
    })
})

}

dailyPlanner() 

async function fetchQuote(){

let response = await fetch('https://zenquotes.io/api/random')
.then(res => res.json())
  .then(data => {
    console.log(data[0].q, data[0].a);
  });

console.log(response)
}

fetchQuote()

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


function pomodoroTimer() {


    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    var isWorkSession = true

    let totalSeconds = 25 * 60
    let timerInterval = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 10)
        } else {


            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSeconds = 25 * 60
                }
            }, 10)
        }

    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()

    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)



}

pomodoroTimer()
window.addEventListener("load", () => {
  // saare full pages hide
  document.querySelectorAll(".fullElem").forEach(elem => {
    elem.style.display = "none";
  });

  // home cards show
  document.querySelector(".allElems").style.display = "flex";
});

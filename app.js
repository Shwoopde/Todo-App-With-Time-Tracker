const inputText = document.querySelector("#text");
const myButton = document.querySelector(".btn-list");
const myList = document.querySelector(".container ul");
const taskTimer = document.querySelector("#time");
const minToHour = document.querySelector("#minutes");
const hourToMinute = document.querySelector("#hours");
const minToHourBtn = document.querySelector("#btn-minutes-to-hours");
const hourToMinuteBtn = document.querySelector("#btn-hours-to-minutes");
const timeAnswer = document.querySelector("#time-answer");

myButton.addEventListener("click", (e) => {
    if(inputText.value != ""){
        e.preventDefault();
        // create list item
        const listItem = document.createElement("li");
        listItem.innerHTML = `<p class="bold">Task: </p>` + inputText.value;
        if (taskTimer.value != "") {
            listItem.innerHTML += `<p class="bold">Time: </p> ` + taskTimer.value + " minutes";
        }else{
            listItem.innerHTML += `<p class="bold">Time: </p> ` + "0 minutes";
        }
        myList.appendChild(listItem);

        //create span
        const span = document.createElement("span");
        span.innerHTML = "X";
        listItem.appendChild(span);
    }
    const close = document.querySelectorAll("span");
    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener("click",() =>{
            close[i].parentElement.style.opacity = 0;
            setTimeout(() => {
                close[i].parentElement.style.display = "none";
                close[i].parentElement.remove();
            }, 500);
        })
    }
    //create array with all li elements
    const listItems = document.querySelectorAll("li");
    let tasks = [];
    for(let i = 0; i < listItems.length; i++){
        tasks.push(listItems[i]);
    }
    let tasklog = console.log(tasks);
        inputText.value = "";
        taskTimer.value = "";
    
    // add time to get a daily sum of minutes
    let time = 0;
    for(let i = 0; i < listItems.length; i++){
        time += parseInt(listItems[i].innerText.split("Time: ")[1].split(" minutes")[0]);
    }
    const totalTime = document.querySelector("#total-time");
    totalTime.innerHTML = `Total time: ${time} minutes`;
    
    // if time is greater than 60 minutes convert to hours
    if(time > 60){
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        totalTime.innerHTML = `Total time: ${hours} hours and ${minutes} minutes`;
    }

    //sum number of tasks for the day
    const totalTasks = document.querySelector("#total-tasks");
    totalTasks.innerHTML = `Total tasks: ${listItems.length}`;

    //alert if total time is greater than 24 hours
    if(time > 1440){
        alert("You have more than 24 hours of work today!");
    }
});

//convert minutes to hours
minToHourBtn.addEventListener("click", () => {
    const time = parseInt(minToHour.value);
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    timeAnswer.innerHTML = `${time} minutes is ${hours} hours and ${minutes} minutes`;
    minToHour.value = "";
});

//convert hours to minutes
hourToMinuteBtn.addEventListener("click", () => {
    const time = hourToMinute.value;
    const minutes = time * 60;
    timeAnswer.innerHTML = `${time} hours is ${minutes.toFixed(2)} minutes`;
    hourToMinute.value = "";
});







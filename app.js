const inputText = document.querySelector("#text");
const myButton = document.querySelector(".btn-list");
const myList = document.querySelector(".container ul");
const taskTimer = document.querySelector("#time");
const minToHour = document.querySelector("#minutes");
const hourToMinute = document.querySelector("#hours");
const minToHourBtn = document.querySelector("#btn-minutes-to-hours");
const hourToMinuteBtn = document.querySelector("#btn-hours-to-minutes");
const timeAnswer = document.querySelector("#time-answer");
const totalTime = document.querySelector("#total-time");
const totalTask = document.querySelector("#total-tasks");

myButton.addEventListener("click", (e) => {
    if(inputText.value != ""){
        e.preventDefault();
        // create list item
        const listItem = document.createElement("li");
        listItem.innerHTML = `<p class="bold">Task: </p>` + inputText.value;
        if (taskTimer.value != "") {
            listItem.innerHTML += `<p class="bold" id="time-value">Time: </p> ` + taskTimer.value + " minutes";
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
    //clear task and time fields
    inputText.value = "";
    taskTimer.value = "";

    //create an array witih the task and time
    const listItems = document.querySelectorAll(".container ul li");
    const listItemsArray = [];
    for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        const task = listItem.querySelector(".bold").nextSibling.textContent;
        const time = listItem.querySelector("#time-value").nextSibling.textContent;
        //parse number out of time variable
        const timeNumber = parseInt(time.slice(0, time.length - 8));
        console.log(timeNumber);
        console.log(task, time);
        const taskTime = {
            task: task,
            time: timeNumber
        }
        listItemsArray.push(taskTime);
    }
    //calculate total time in minutes. If time is greater than 60 minutes, convert to hours
    let totalTimeMinutes = 0;
    for (let i = 0; i < listItemsArray.length; i++) {
        totalTimeMinutes += listItemsArray[i].time;
    }
    if (totalTimeMinutes > 60) {
        const totalTimeHours = Math.floor(totalTimeMinutes / 60);
        const totalTimeMinutesLeft = totalTimeMinutes % 60;
        totalTime.innerHTML = `Total time: ${totalTimeHours} hours and ${totalTimeMinutesLeft} minutes`;
    }
    else {
        totalTime.innerHTML = `Total time: ${totalTimeMinutes} minutes`;
    }
    //calculate total number of tasks
    const totalTasks = listItemsArray.length;
    totalTask.innerHTML = `Total tasks: ${totalTasks}`;
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


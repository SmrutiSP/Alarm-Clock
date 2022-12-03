// Used to store deleteAlarmButton DOM element against its id
const deleteAlarmButtonMap = new Map();

// fetching all necessary UI elements
const currTimeContainer = document.getElementById('currTimeContainer');
const setAlarmContainer = document.getElementById('setAlarmContainer');
const setAlarmButton = document.querySelector('#setAlarmContainer .setAlarmButton');
const prevSetAlarmContainerList = document.querySelector('#prevSetAlarmContainer ul');
const alertMessageBox = document.getElementById('alertMessageBox');


// current time display in UI
setInterval(()=>{
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let meridian = hours > 12 ? 'PM' : 'AM';
    hours = meridian === 'PM' ? hours-12 : hours;
    if(hours < 10) {
        hours = '0'+hours;
    }
    if(minutes < 10) {
        minutes = '0'+minutes;
    }
    if(seconds < 10) {
        seconds = '0'+seconds;
    }
    currTimeContainer.textContent = `${hours} : ${minutes} : ${seconds}  ${meridian}`;
},1000);

// setting alarm button click event listener
setAlarmButton.onclick = function validation() {
    let hours,minutes,seconds,meridian;
    hours = setAlarmContainer.elements['hours'].value;
    minutes = setAlarmContainer.elements['minutes'].value;
    seconds = setAlarmContainer.elements['seconds'].value;
    meridian = setAlarmContainer.elements['meridian'].value;
    if(hours < 10) {
        hours = '0'+hours;
    }
    if(minutes < 10) {
        minutes = '0'+minutes;
    }
    if(seconds < 10) {
        seconds = '0'+seconds;
    }
    setAlarm(hours,minutes,seconds,meridian);
}

// function to set alarm and reflect the same in UI
function setAlarm(hours,minutes,seconds,meridian) {

    let setIntervalID = activateAlarmBeep(hours,minutes,seconds,meridian);

    // building UI
    const alarmToSet = document.createElement('li');
    const timeToDisplay = document.createElement('div');
    timeToDisplay.textContent = `${hours} : ${minutes} : ${seconds} ${meridian}`
    timeToDisplay.style.fontFamily = 'consolas, serif, sans-serif';
    const deleteAlarmButton = document.createElement('div');
    deleteAlarmButton.textContent = 'Delete Alarm';
    deleteAlarmButton.classList.add('deleteAlarmButton');
    deleteAlarmButton.id = ''+setIntervalID;
    deleteAlarmButtonMap.set(''+setIntervalID,deleteAlarmButton);
    alarmToSet.append(timeToDisplay,deleteAlarmButton);
    alarmToSet.classList.add('timeWithButton');
    alarmToSet.style.paddingTop = '4px';
    alarmToSet.style.paddingBottom = '4px';
    alarmToSet.style.borderBottom = 'none';
    prevSetAlarmContainerList.append(alarmToSet);

    // delete alarm button click event listener
    deleteAlarmButton.onclick = function deleteAlarmFromUI(e) {
        let idOfAlarm = +(e.target.id);
        let parentTag = e.target.parentNode;
        clearInterval(idOfAlarm);
        parentTag.remove();
    }
}

// Alarm beep
function activateAlarmBeep(hours,minutes,seconds,meridian) {
    let idOfAlarm =  setInterval(()=>{
        let date = new Date();
        let currHours = date.getHours();
        let currMinutes = date.getMinutes();
        let currSeconds = date.getSeconds();
        let currMeridian = currHours > 12 ? 'PM' : 'AM';
        currHours = currMeridian === 'PM' ? currHours-12 : currHours;
        console.log(hours,minutes,seconds," / ",currHours,currMinutes,currSeconds," / ",meridian,currMeridian)
        if(hours == currHours && minutes == currMinutes && seconds == currSeconds && meridian == currMeridian)  {
            let deleteAlarmButton = deleteAlarmButtonMap.get(''+idOfAlarm);
            alertMessageBox.textContent = 'Time is up !!!';
            alertMessageBox.classList.remove('alertMessageHide');
            alertMessageBox.classList.add('alertMessageShow');
            setTimeout(()=>{
                alertMessageBox.textContent = '';
                alertMessageBox.classList.remove('alertMessageShow');
                alertMessageBox.classList.add('alertMessageHide');
                deleteAlarmButton.click();
            },1500)
        }
    },10);
    return idOfAlarm;
}



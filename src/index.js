import './sass/main.scss';
import Swal from 'sweetalert2';
import _debounce from 'debounce';
// var debounce = require(' lodash.debounce ');

const refs = {
    input: document.querySelector('#date-selector'),
    btn: document.querySelector('[data-start]'),
    timer: document.querySelector('.timer'),
    field: document.querySelectorAll('.field'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

// обновить страницу
// window.location.reload();

var debounce = require('debounce');

refs.btn.setAttribute('disabled', true);


const currentDate = Date.now();
// console.log(currentDate);
let choiceDate = '';

refs.btn.addEventListener('click', onTimerStart);
refs.input.addEventListener('input', debounce(onChoiceData, 1000));



function onChoiceData() {

    choiceDate = Date.parse(new Date(refs.input.value)) - 10800000;

    if (choiceDate < currentDate) {
        // console.log('not correct data');

        Swal.fire('Please choose a date in the future');
        refs.input.value = '';

    } else {
        refs.btn.removeAttribute('disabled');
    }
}


function onTimerStart() {
    // console.log('btn click');
    refs.btn.setAttribute('disabled', true);

    const intervalId = null;

    setInterval(() => {

        if (currentDate === choiceDate) {
            // console.log('таймер подошел к 0');
            clearInterval(intervalId);
            return;
        }
        // console.log('отсчет времени пошел');

        const deltaTime = choiceDate - Date.now();
        // console.log(deltaTime);

        const timerToEnd = convertMs(deltaTime);
        // console.log(timerToEnd);

        updateFaceTime(timerToEnd);
    }, 1000)

}

function updateFaceTime({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}


function pad(value) {
    return String(value).padStart(2, '0');
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}


// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
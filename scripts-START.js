let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now(); // displays number of miliseconds
    const then = now + seconds * 1000;
    displayTime(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTime(secondsLeft);
    }, 1000);
}

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes}:${ remainingSeconds < 10 ? '0' : '' }${remainingSeconds}`;

    document.title = display;
    timerDisplay.innerText = display;
}

function displayEndTime(timestamp) {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const westernHour = hour > 12 ? hour - 12 : hour;
    const minute = date.getMinutes();

    endTime.innerText = `Be back at ${westernHour}:${minute < 10 ? '0' : ''}${minute}`;
}

function runTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

function enterTime(e) {
    e.preventDefault();
    const minutes = (this.minutes.value) * 60;
    timer(minutes);
    this.reset();
}

buttons.forEach(button => button.addEventListener('click', runTimer));
document.customForm.addEventListener('submit', enterTime);
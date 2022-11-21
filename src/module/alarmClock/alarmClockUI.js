const alarmClockUI = {
    saveTime: document.querySelector(".save-btn"),
    alarmCountdown: document.querySelector('.alarm-countdown'),
    alarmBtn: document.querySelector('.btn-clock'),
    modalLayout: document.querySelector(".modal"),
    showTimer(time) {
        let hour = Math.floor(time / 3600)
        let minutes = Math.floor((time - (hour * 3600)) / 60)
        let seconds = Math.floor((time - (hour * 3600)) % 60);
        console.log(hour, minutes, seconds);
        if (hour < 10) {
            hour = `0${hour}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        document.querySelector('.alarm-countdown .countdown').innerHTML = `${hour}:${minutes}:${seconds}`
    },
    showCountdownTimer() {
        this.alarmCountdown.style.display = 'flex'
    },
    hideCountdownTimer() {
        this.alarmCountdown.style.display = 'none'
    },
    activeAlarmBtn() {
        this.alarmBtn.classList.add('active')
    },
    removeActiveAlarmBtn() {
        this.alarmBtn.classList.remove('active')
    },
    hideModalLayout() {
        this.modalLayout.classList.remove("active")
    }
}

export default alarmClockUI;
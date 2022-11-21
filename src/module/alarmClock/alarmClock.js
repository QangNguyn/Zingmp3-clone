import baseObject from "../core/baseObject.js";
import alarmClockUI from "./alarmClockUI.js";

class alarmClock extends baseObject {
    constructor() {
        super()
        this.min = 0
        this.hour = 0
        this.interval = null
        this.startEventAlarm();
        this.listenInputInstanceEvents()
        this.isAlarm = true;
        this.alarmClockUI = alarmClockUI
    }
    listenInputInstanceEvents() {
        let hourInput = document.querySelector('.time-input .hour');
        let minInput = document.querySelector('.time-input .min');
        hourInput.addEventListener("input", (e) => {
            if (e.target.value > 24) {
                hourInput.value = 24
            }
            this.hour = e.target.value;
            console.log(this.hour);
            this.checkValue();
        })
        minInput.addEventListener('input', (e) => {
            if (e.target.value > 59) {
                e.target.value = 59
            }
            this.min = e.target.value
            console.log(this.min);
            this.checkValue();
        })
        minInput.addEventListener('change', (e) => {
            if (e.target.value < 10) {
                minInput.value = `0${e.target.value}`
            }
        })
        hourInput.addEventListener('change', (e) => {
            if (e.target.value < 10) {
                hourInput.value = `0${e.target.value}`
            }
        })
    }
    startEventAlarm() {
        document.querySelector(".save-btn").addEventListener('click', () => {
            if (this.interval) {
                this.stopAlarm()
            }
            this.render()
            this.startAlarm(this.min * 60 + this.hour * 3600)
        })
    }
    startAlarm(time) {
        this.alarmClockUI.showCountdownTimer();
        if (time == 0) return;
        this.interval = setInterval(() => {
            time--;
            this.alarmClockUI.showTimer(time)
            if (time === 0) {
                this.stopAlarm()
            }
        }, 1000)
    }
    stopAlarm() {
        this.isAlarm = false;
        this.alarmClockUI.hideCountdownTimer()
        this.alarmClockUI.removeActiveAlarmBtn()
        clearInterval(this.interval);
        this.interval = null
    }
    checkValue() {
        if (this.min || this.hour) {
            this.alarmClockUI.saveTime.disabled = false;
        }
        else {
            this.alarmClockUI.saveTime.disabled = true;
        }
    }
    render() {
        this.alarmClockUI.hideModalLayout()
        this.alarmClockUI.showTimer(this.min * 60 + this.hour * 3600)
        this.alarmClockUI.activeAlarmBtn()
    }
}
export default alarmClock;
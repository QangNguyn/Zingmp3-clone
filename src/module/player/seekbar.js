import baseObject from "../core/baseObject.js"

class seekbar extends baseObject {
    constructor() {
        super()
        this.currentTime = 0
        this.isReadyToDrag = false
        this.timeBarElement = document.querySelector('.progress-bar')
        this.progress = document.querySelector('.progress')
        this.progressCircle = document.querySelector('.progress-circle')
        this.per = 0
        this.listenEvents()
        this.listenSeekBarEvents()
    }
    setCurrentTime(time) {
        this.currentTime = time;
    }
    listenSeekBarEvents() {
        this.progress.addEventListener('click', (e) => {
            this.getPercent(e)
            this.dispatchEvent('click')
        })
        this.progress.addEventListener('mousedown', () => {
            this.isReadyToDrag = true
        })
        document.addEventListener('mousemove', e => {
            const clientX = e.clientX
            const left = this.progress.getBoundingClientRect().left
            const width = this.progress.getBoundingClientRect().width

            const min = left
            const max = width + left
            let per = (clientX - left) * 100 / width
            if (this.isReadyToDrag) {
                if (clientX >= min && clientX <= max) {

                    this.timeBarElement.style.width = per + '%'
                    this.progressCircle.style.left = `calc(${per}% - 7px)`
                }
                if (clientX < min) {
                    per = 0
                    this.timeBarElement.style.width = 0 + '%'
                    this.progressCircle.style.left = 0 + '%'
                }
                if (clientX > max) {
                    per = 100
                    this.timeBarElement.style.width = `${per}%`
                    this.progressCircle.style.left = `calc(${per}% - 7px)`
                }
                this.per = per;
                this.dispatchEvent('musicRewind')
            }
        })
        document.addEventListener('mouseup', () => {
            this.isReadyToDrag = false
            // this.dispatchEvent('stopMusicRewind')
            // console.log(this.isReadyToDrag)
        })
    }

    getPercent(event) {
        var rect = this.progress.getBoundingClientRect();
        var x = event.clientX - rect.left;
        const per = x * 100 / rect.width

        this.timeBarElement.style.width = per + '%'
        this.progressCircle.style.left = `calc(${per}% - 7px)`
        this.per = per;
    }




}
export default seekbar
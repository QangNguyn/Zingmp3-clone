import baseObject from '../core/baseObject.js'

class modal extends baseObject {
    constructor() {
        super();
        this.modal = document.querySelector(".modal");
    }
    showModalLayout() {
        this.modal.classList.add("active");
    }
    showAlarmModal() {
        this.hideAllModal()
        document.querySelector('.modal-inner .alarm-setting').style.display = 'block'
    }
    hideAllModal() {
        document.querySelectorAll('.modal-inner>div').forEach(div => {
            div.style.display = 'none'
        })
    }
    showAddAlbumModal() {
        this.hideAllModal()
        document.querySelector('.modal-inner .add-album').style.display = 'block'
    }
    hideModalLayout() {
        this.modal.classList.remove("active")
    }
    listenEvents() {
        document.querySelector(".modal-overlay").addEventListener('click', () => {
            this.hideModalLayout();
        })
    }
}

export default modal;
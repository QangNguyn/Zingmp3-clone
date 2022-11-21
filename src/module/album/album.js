import baseObject from "../core/baseObject.js"
import albumUI from "./albumUI.js"
import API from "../core/network.js"
class album extends baseObject {
    constructor() {
        super()
        this.album = []
        this.albumUI = albumUI
        this.url = 'http://localhost:3000/playlists';
        this.imgDefault = '../src/image/default-album.png'
        this.getAllAlbum();
        this.listenEvents()
    }
    getAllAlbum() {
        API.sent(this.url)
            .then(data => {
                this.albumUI.showAllAlbum(data)
            })
    }
    listenEvents() {
        document.querySelector('.add-btn').onclick = () => {
            this.getAllAlbum()
            this.albumUI.modal.showModalLayout()
            this.albumUI.modal.showAddAlbumModal()
        }
    }
    handleAddAlbum() {

    }
}

export default album;
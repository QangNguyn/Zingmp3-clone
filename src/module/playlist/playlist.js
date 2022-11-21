import baseObject from "../core/baseObject.js"

class playlist extends baseObject {
    constructor() {
        super()
        this.songs = []
        this.currentSongIndex = 0
        this.currentSong = null
        this.songIsHeard = []
        this.listenEvents()
    }
    currentSongChanged() {
        this.dispatchEvent('currentSongChange')
    }
    setCurrentSong(song) {
        this.currentSong = song
    }
    playlistChange(songs) {
        this.setSongs(songs)
        this.currentSongIndex = 0;
        this.currentSong = this.songs[this.currentSongIndex]
        this.dispatchEvent('playlistChange')
    }


    setSongs(songs) {
        this.songs = songs
    }
    next() {
        if (this.currentSongIndex == this.songs.length - 1) {
            this.currentSongIndex = -1
        }
        this.currentSongIndex++
        this.currentSong = this.songs[this.currentSongIndex]
        this.currentSongChanged()
    }
    prev() {
        if (this.currentSongIndex == 0) {
            this.currentSongIndex = this.songs.length
        }
        this.currentSongIndex--
        this.currentSong = this.songs[this.currentSongIndex]
        this.currentSongChanged()
    }
}

export default playlist
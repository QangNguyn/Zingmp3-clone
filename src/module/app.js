import player from "./player/player.js"
import playlist from "./playlist/playlist.js"
import seekbar from "./player/seekbar.js"
import songs from "./dataMusic/listMusic.js"
import baseObject from "./core/baseObject.js"
import UI from "./UI/uiHandle.js"
import button from "./button/button.js"
import top100Musics from "./dataMusic/top100Musics.js"
import category from "./dataMusic/category.js"
import modal from "./modalLayout/modal.js"
import album from "./album/album.js"
import alarmClock from "./alarmClock/alarmClock.js"


class app {
    constructor() {
        this.player = new player()
        this.playlist = new playlist()
        this.seekbar = new seekbar()
        this.baseObject = new baseObject()
        this.modal = new modal()
        this.alarmClock = new alarmClock()
        this.album = new album()
        this.songs = songs
        this.UI = UI
        this.category = category;
        this.top100Musics = top100Musics;
        this.button = button
        this.start()
    }
    listenEvents() {
        this.playlist.addEventListener('currentSongChange', ({ currentSong }) => {
            this.player.setSong(currentSong)
            this.player.play()
        })


        this.playlist.addEventListener('currentSongChange', ({ currentSong, currentSongIndex, songs }) => {
            UI.mymusic.render(this.playlist.songs, currentSongIndex)
            UI.renderSongCurrent(currentSong)
            UI.playerUI.renderNextSong(songs, currentSongIndex)
            this.UI.playlistUI.loadSongs(songs, currentSongIndex)
        })

        this.playlist.addEventListener('playlistChange', ({ currentSong }) => {
            this.player.setSong(currentSong)
            console.log(currentSong);
            this.player.play()
        })
        this.playlist.addEventListener('playlistChange', ({ songs, currentSongIndex, currentSong }) => {
            UI.renderSongCurrent(currentSong)
            UI.playerUI.renderNextSong(songs, currentSongIndex)
            this.UI.playlistUI.loadSongs(songs, currentSongIndex)
        })

        this.UI.top100UI.el.addEventListener('click', (e) => {
            let musicCard = e.target.closest('.music-card')
            let id = musicCard.dataset.listid;
            let playBtn = e.target.closest('.btn-play')
            if (musicCard && !playBtn) {
                this.UI.top100UI.loadData(this.top100Musics[id]);
            }
            if (playBtn) {
                this.playlist.playlistChange(this.top100Musics[id].songs)
            }
        })

        this.button.nextBtn.el.addEventListener('click', () => {
            this.playlist.next()
        })

        this.button.playBtn.el.addEventListener('click', () => {
            this.player.isPlaying = !this.player.isPlaying
            if (this.player.isPlaying) {
                this.player.play()
            }
            else {
                this.player.pause()
            }
        })

        this.button.prevBtn.el.addEventListener('click', () => {
            this.playlist.prev()
        })
        this.button.playlistBtn.el.addEventListener('click', () => {
            this.UI.playlistUI.showPlaylist()
        })

        this.button.lyricBtn.el.addEventListener('click', () => {
            document.querySelector('.lyric').style.bottom = 0
            // document.querySelector('#lyric').style.top = 0
        })

        this.button.alarmBtn.el.addEventListener('click', () => {
            this.modal.showModalLayout()
            this.modal.showAlarmModal()
        })
        this.button.closeModalBtn.el.addEventListener('click', () => {
            this.modal.hideModalLayout();
        })
        // this.button.saveAlarmBtn.el.addEventListener('click', () => {
        //     this.alarmClock.stopAlarm();
        //     this.alarmClock.startAlarm(this.alarmClock.hour * 360 + this.alarmClock.min * 60)

        // })
        this.player.addEventListener('currentTimeChange', () => {
            if (!this.alarmClock.isAlarm) {
                if (this.alarmClock.interval === null) {
                    this.player.pause();
                    this.alarmClock.isAlarm = true
                }
            }
        })
        this.button.exitLyric.el.addEventListener('click', () => {
            document.querySelector('.lyric').style.bottom = '-100%'
        })
        this.player.addEventListener('playOrPause', ({ isPlaying }) => {
            // this.UI.buttons.PlayPauseBtn.setIsPlaying(isPlaying)
            this.UI.setIcon(isPlaying)
        })
        this.player.addEventListener('setDuration', ({ duration }) => {
            this.UI.setDuration(duration)
        })

        this.player.addEventListener('currentTimeChange', ({ audio }) => {
            this.player.currentTime = audio.currentTime;
        })
        this.player.addEventListener('currentTimeChange', ({ totalTimeListen, currentTime, duration }) => {
            this.UI.updateTime(currentTime)
            this.UI.renderSeekbar(currentTime, duration)
        })

        // this.player.addEventListener('lyricChange', ({ currentTime }) => {
        //     this.player.lyricChanged(currentTime, this.playlist.currentSong)
        // })

        this.player.addEventListener('karaoke', ({ currentTime }) => {
            // this.player.karaoke(currentTime, this.playlist.currentSong)
            this.UI.lyricUI.karaokeUI.karaoke(currentTime, this.playlist.currentSong)
        })

        this.player.addEventListener('ended', () => {
            this.playlist.next()
        })

        this.seekbar.addEventListener('click', ({ per }) => {
            let time = this.player.audio.duration * per / 100
            this.player.setCurentTime(time)
            // this.player.lyricChanged(time, this.playlist.currentSong)
        })
        this.seekbar.addEventListener('musicRewind', ({ per }) => {
            let time = this.player.audio.duration * per / 100
            this.player.play()
            this.player.setCurentTime(time)
        })


    }
    init() {
        this.playlist.setSongs(this.songs)
        this.player.setSong(this.playlist.songs[this.playlist.currentSongIndex])
        this.playlist.setCurrentSong(this.playlist.songs[this.playlist.currentSongIndex])
    }

    renderUi() {
        this.UI.renderSongCurrent(this.playlist.songs[this.playlist.currentSongIndex])
        this.UI.mymusic.render(this.playlist.songs, this.playlist.currentSongIndex)
        this.UI.playerUI.renderNextSong(this.playlist.songs, this.playlist.currentSongIndex)
        this.UI.top100UI.renderPlaylistSections(this.category)
        this.UI.top100UI.renderPlaylist(top100Musics, this.category)
        this.UI.playlistUI.loadSongs(this.playlist.songs, this.playlist.currentSongIndex)
    }

    start() {
        this.init()
        this.listenEvents()
        this.renderUi()
    }

}

let x = new app()

import songList from "./songList.js";
import mymusic from "./mymusic.js";
import playerUI from "./playerUI.js";
import top100UI from "./top100UI.js";
import playlistUI from "./playlistUI.js";
import lyricUI from "./lyricUI.js";
const UI = {
    songList,
    mymusic,
    playerUI,
    top100UI,
    playlistUI,
    lyricUI,
    updateTime(currentTime) {
        const currentSongTime = document.querySelector('.current-time')
        let sec = Math.floor(currentTime % 60)
        let min = Math.floor(currentTime / 60)
        if (sec < 10) {
            sec = `0${sec}`;
        }
        if (sec == 60) {
            sec = `00`;
        }
        if (min < 60) {
            min = `0${min}`
        }
        currentSongTime.innerText = `${min}:${sec}`
    },
    renderSongCurrent(song) {
        const imgSongCurrent = document.querySelector('.play-controler__info img');
        const nameSongCurrent = document.querySelector('.play-controler__info .name-song');
        const nameSingerCurrent = document.querySelector('.play-controler__info .name-singer');
        imgSongCurrent.setAttribute('src', song.img);
        nameSongCurrent.innerText = song.name;
        nameSingerCurrent.innerText = song.singer;
    },
    setDuration(totalTime) {
        const durationSong = document.querySelector('.total-time')
        let sec = Math.floor(totalTime % 60)
        let min = Math.floor(totalTime / 60)
        if (min < 60) {
            min = `0${min}`
        }
        if (sec < 10) {
            sec = `0${sec}  `;
        }
        durationSong.innerText = `${min}:${sec}`
    },
    setIcon(check) {
        const playBtn = document.querySelector('.play-btn')
        if (check) {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
        }
        else {
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
        }
    },
    renderSeekbar(currentTime, duration) {
        const progressBar = document.querySelector('.progress-bar')
        const progressCircle = document.querySelector('.progress-circle')
        let per = currentTime * 100 / duration
        progressBar.style.width = `${per}%`
        progressCircle.style.left = `calc(${per}% - 3px)`
    },
    renderSeekbarWhenDrag(per) {
        const progressBar = document.querySelector('.progress-bar')
        const progressCircle = document.querySelector('.progress-circle')
        progressBar.style.width = `${per}%`
        progressCircle.style.left = `calc(${per}% - 3px)`
    }
}

export default UI;

const songList = {
    el: document.querySelector('.play-list .play-list-wrap'),
    render(songs, currentSong) {
        let htmls = songs.map((song, index) => {
            return `
            <div class="play-list__info ${index == currentSong ? 'isPlaying' : ''}" data-id=${index}>
            <div class="img-wrap"> 
                <img src="${song.img}" alt="">
                <div>
                    <img src="../src/image/icon-playing.gif" alt="">
                    <i class="fa-solid fa-play"></i>
                </div>
            </div>
            <div class="play-list__info-wrap">
                <span class="namesong">${song.name}</span>
                <span class="namesinger">${song.singer}</span>
            </div>
            </div> `
        })
        this.el.innerHTML = htmls.join('');
    }
}

export default songList
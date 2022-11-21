const mymusic = {
    el: document.querySelector('.media-container .content-playlist .play-list__info-wrap'),
    songs: [],
    setSongs(songs) {
        this.songs = songs
    },
    render(songs, currentSong) {
        let htmls = songs.map((song, index) => {
            return `
                <div class="play-list__info ${index == currentSong ? 'isPlaying' : ''}" data-id=${index}">
                    <div class="media-left">
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
                    </div>
                    <div class="media-content">
                        <span>${song.albumname ? song.albumname : ''}</span>
                    </div>
                    <div class="media-right">
                        <span>00:00</span>
                    </div>
                </div>
            `
        })
        this.el.innerHTML = htmls.join('');
    }
}
export default mymusic;
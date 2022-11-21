const playerUI = {
    renderNextSong(songs, index) {
        const nextSongInfo = document.querySelector('.nextsong-info')
        if (songs.length > 1) {
            nextSongInfo.innerHTML = `
                    <h4>Phát tiếp theo</h4>
                        <div>
                        <img src="${index != (songs.length - 1) ? songs[index + 1].img : songs[0].img}" alt="">
                            <div>
                                <p class="name-song">${index != (songs.length - 1) ? songs[index + 1].name : songs[0].name}</p>
                                <p class="name-singer">${index != (songs.length - 1) ? songs[index + 1].singer : songs[0].singer}</p>
                            </div>
                        </div>
        `
        }
        if (songs.length == 1) {
            nextSongInfo.style.display = 'none'
        }
    }
}
export default playerUI;
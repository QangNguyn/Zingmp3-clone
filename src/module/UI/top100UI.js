

const top100UI = {
    el: document.querySelector('#top-music .container'),
    createPlaylistSection() {
        let playlistSection = document.createElement("div")
        playlistSection.setAttribute("class", "playlist-section");
        return playlistSection;

    },
    renderPlaylistSections(listCategory) {
        const topMusicContainer = document.querySelector("#top-music .container")
        for (let i = 0; i < listCategory.length; i++) {
            let categoryDiv = this.createPlaylistSection()
            categoryDiv.innerHTML = `
                <h4 class="top-music-title">${listCategory[i].name}</h4>
                <div class="playlist-wrap" data-id =${listCategory[i].id}></div>
            `
            topMusicContainer.appendChild(categoryDiv)
        }
    },
    createPlaylist() {
        let playlistWrap = document.createElement('div');
        playlistWrap.setAttribute('class', 'music-card')
        return playlistWrap;
    },

    renderPlaylist(list) {
        const playlistWrap = document.querySelectorAll('.playlist-wrap')
        playlistWrap.forEach(playlist => {
            for (let i = 0; i < list.length; i++) {
                if (playlist.dataset.id == list[i].category_id) {
                    let playlistDiv = this.createPlaylist()
                    playlistDiv.setAttribute('data-listId', i)
                    playlistDiv.addEventListener('click', () => {
                        // this.loadData(list[i])
                    })
                    playlist.appendChild(playlistDiv)
                    playlistDiv.innerHTML = `

                                <div class="music-card-img">
                                    <img src=${list[i].avatar} alt="">
                                    <div class="actions-wrap">
                                        <div class="btn">
                                            <i class="fa-regular fa-heart"></i>
                                        </div>
                                        <div class="btn btn-play">
                                            <i class="fa-solid fa-play"></i>
                                        </div>
                                        <div class="btn">
                                            <i class="fa-solid fa-circle-info"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-content">
                                    <h3 class="title">${list[i].title}</h3>
                                    <div class="sub-title">
                                        <a href="#">Hương Ly</a> ,
                                        <a href="#">Châu Khải Phong</a>,
                                        <a href="#">Khang Việt</a> ...
                                    </div>
                                </div>
                    `
                }
            }
        })

    },
    showPlaylistDetail() {
        document.querySelectorAll('.content-item').forEach(content => {
            content.style.display = 'none'
        })
        document.querySelector('.playlist-detail').style.display = 'block'
    },
    loadInfoPlaylist(playlist) {
        let playlistDetail = document.querySelector('.playlist-detail .container .playlist-detail-info');
        playlistDetail.innerHTML = `
                        <div class="playlist-detail-img">
                            <img src="${playlist.avatar}" alt="">
                            <div>
                                <div>
                                    <i class="fa-solid fa-play"></i>
                                </div>
                            </div>
                        </div>
                        <div class="playlist-detail-text">
                            <h3>${playlist.title}</h3>
                            <span>Cập nhật: ${playlist.dateUpdate}</span>
                            <div>
                                <a href="#">Ca sĩ 1</a>,
                                <a href="#">Ca sĩ 2</a>,
                                <a href="#">Ca sĩ 3</a>
                            </div>
                        </div>
                        <button class="play-list-btn">
                            <i class="fa-solid fa-play"></i>
                            <span>Phát ngẫu nhiên</span>
                        </button>
                `
    },
    loadSongsInPlaylist(playlist) {
        const songsDiv = document.querySelector('.playlist-detail .container .playlist-songs');
        const songContent = songsDiv.querySelector('.playlist-wrap .playlist-content');
        const playlistTitle = songsDiv.querySelector('.playlist-title');
        playlistTitle.innerText = playlist.text
        let htmls = playlist.songs.map(song => {
            return `
            <div class="song-info">
            <div class="media-left">
                <div class="img-wrap">
                    <img src="${song.img}" alt="">
                    <div>
                        <img src="../src/image/icon-playing.gif" alt="">
                        <!-- <i class="fa-solid fa-play"></i> -->
                    </div>
                </div>
                <div class="song-name-wrap">
                    <span class="namesong">${song.name}</span>
                    <span class="namesinger">${song.singer}</span>
                </div>
            </div>
            <div class="media-center">
                <span>${song.albumname}</span>
            </div>
            <div class="media-right">
                <span>00:00</span>
            </div>
        </div>
            `
        })
        songContent.innerHTML = htmls.join('')
    },
    loadData(playlist) {
        this.showPlaylistDetail()
        this.loadInfoPlaylist(playlist)
        this.loadSongsInPlaylist(playlist)
    }
}

export default top100UI
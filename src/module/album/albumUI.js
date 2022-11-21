import modal from '../modalLayout/modal.js'
const albumUI = {
    albumEl: document.querySelector('.album-content'),
    modal: new modal(),
    showAllAlbum(albums) {
        this.albumEl.innerHTML = ''
        albums.forEach(album => {
            let albumCard = document.createElement('div');
            albumCard.classList.add('album-card');
            albumCard.innerHTML = `
                <div class="album-card-img">
                    <img src="${album.img}" alt="">
                    <div class="actions-wrap">
                        <div><i class="fa-solid fa-xmark"></i></div>
                        <div class="btn-play"><i class="fa-solid fa-play"></i></div>
                        <div><i class="fa-solid fa-circle-info"></i></div>
                    </div>
                </div>
                <div class="album-card-content">
                    <h3 class="album-title">${album.name}</h3>
                    <h3 class="album-subtitle">${album.userName}</h3>
                </div>
            `
            this.albumEl.appendChild(albumCard)
        });
    }
}

export default albumUI;
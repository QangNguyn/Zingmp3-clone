const a = document.querySelectorAll('.zing-sidebar-menu li a')
console.log(a);

a.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.content .content-item').forEach(e => {
            e.style.display = 'none'
        })
        document.querySelector('.playlist-detail').style.display = 'none'
        let x = el.getAttribute('href')
        let y = document.querySelector(x);
        y.style.display = 'block'
        console.log(x);
    })
})

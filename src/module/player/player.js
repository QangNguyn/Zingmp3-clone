import baseObject from "../core/baseObject.js"

class player extends baseObject {
    constructor() {
        super()
        this.audio = new Audio()
        this.isPlaying = false
        this.volume = 1
        this.currentTime = 0
        this.duration = 0
        this.listenAudioInstanceEvents()
        this.totalTimeListen = 0
        this.listenEvents()

    }

    isCurrentSentence(sentence, time) {
        return sentence.words[0].startTime / 1000 <= time && sentence.words[sentence.words.length - 1].endTime / 1000 >= time
    }
    getRawSentence(sentence) {
        return sentence.words.reduce((s, { data }) => s + data + ' ', '')
    }
    lyricChanged(time, song) {
        let test = document.querySelectorAll('.sentence')
        let songInfo = document.querySelector('.lyric-body .wrap .song-info')
        let x = '';
        let y = ''
        let currentSentence = '';
        let nextSentence = '';
        let nextsSentence = ''
        if (!song.data) {
            return;
        }
        song.data.sentences.forEach((sentence, index) => {
            // console.log(time);
            if (this.isCurrentSentence(sentence, time)) {
                songInfo.style.display = 'none'
                currentSentence = this.getRawSentence(sentence)

                if (index < song.data.sentences.length - 1) {
                    nextSentence = this.getRawSentence(song.data.sentences[index + 1])
                }
                if (index < song.data.sentences.length - 2) {
                    song.data.sentences[index + 2].words.forEach(word => {

                        nextsSentence += `${word.data} `
                    })
                }

                if (index > 0) {
                    song.data.sentences[index - 1].words.forEach(word => {
                        y += `${word.data} `
                    })
                }

                if (index > 1) {
                    song.data.sentences[index - 2].words.forEach(word => {
                        x += `${word.data} `
                    })
                }
                test[0].innerHTML = x
                test[1].innerHTML = y
                test[2].innerHTML = `
                    <span>${currentSentence}</span>
                `
                test[3].innerHTML = nextSentence
                test[4].innerHTML = nextsSentence
            }
            else {
                songInfo.querySelector('.name-song').innerText = song.name
                songInfo.querySelector('.name-singer').innerText = song.singer
            }

            // let currentWordIndex = sentence.words.filter((char, index) => {
            // if (char.startTime / 1000 <= time && char.endTime / 1000 >= time) {
            //         return index;
            //     }
            // })
        })
    }

    // karaoke(time, song) {
    //     let sentenceEl = document.querySelectorAll('.sentence')
    //     song.data.sentences.forEach((sentence, index) => {
    //         if (this.isCurrentSentence(sentence, time)) {
    //             let htmls = sentence.words.map(word => {
    //                 return `
    //                 <span>${word.data}</span>
    //                 `
    //             })
    //             sentenceEl[0].innerHTML = htmls.join('')
    //             if (index < song.data.sentences.length - 1) {
    //                 let htmls = song.data.sentences[index + 1].words.map(word => {
    //                     return `
    //                     <span>${word.data}</span>
    //                     `
    //                 })
    //                 sentenceEl[1].innerHTML = htmls.join('')
    //             }
    //             sentence.words.forEach((word, index) => {
    //                 let per = 0;
    //                 // console.log(Math.floor(time));
    // let span = sentenceEl[0].querySelectorAll('span')
    //                 if (word.startTime / 1000 <= time && word.endTime / 1000 >= time) {
    //                     let deltaTime = (word.endTime / 1000) - (word.startTime / 1000)
    //                     if (time > word.endTime) {
    //                         per = 100
    //                     }
    //                     else {

    //                         per = (time - (word.startTime / 1000)) * 100 / deltaTime
    //                     }
    //                     span[index].style.backgroundSize = `${per}%`
    //                     for (let i = 0; i < index; i++) {
    //                         span[i].style.backgroundSize = '100%'
    //                     }


    //                 }

    //             })
    //         }
    //     })
    // }


    listenAudioInstanceEvents() {
        this.audio.addEventListener('play', () => {
            this.dispatchEvent('playOrPause')
        })
        this.audio.addEventListener('pause', () => {
            this.dispatchEvent('playOrPause')
        })
        this.audio.addEventListener('loadeddata', () => {
            this.setDuration()
            this.dispatchEvent('setDuration')
        })
        this.audio.addEventListener('timeupdate', () => {
            this.dispatchEvent('currentTimeChange')
            // this.dispatchEvent('lyricChange')
        })
        this.audio.addEventListener('timeupdate', () => {
            this.dispatchEvent('karaoke')
        })
        this.audio.addEventListener('ended', () => {
            this.dispatchEvent('ended')
        })
    }
    setSong(song) {
        this.audio.src = song.src;
        // this.play()
    }
    setDuration() {
        this.duration = this.audio.duration
    }

    play() {
        this.isPlaying = true;
        this.audio.play()
    }
    pause() {
        this.isPlaying = false
        this.audio.pause()
    }

    setCurentTime(time) {
        this.audio.currentTime = time
    }


}

export default player
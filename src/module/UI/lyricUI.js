const lyricUI = {
    karaoke: {

    },
    karaokeUI: {
        sentenceEl: document.querySelectorAll('.sentence'),
        CurrentSentence: document.querySelector('.sentence.active'),
        isCurrentSentence(sentence, time) {
            return sentence.words[0].startTime / 1000 <= time && sentence.words[sentence.words.length - 1].endTime / 1000 >= time
        },
        getRawSentence(sentence) {
            return sentence.words.reduce((s, { data }) => s + data + ' ', '')
        },
        karaoke(time, song) {
            let i = 0;
            song.data.sentences.forEach((sentence, index) => {
                if (this.isCurrentSentence(sentence, time)) {
                    let htmls = sentence.words.map(word => {
                        return `
                        <span>${word.data}</span>
                        `
                    })
                    if (index % 2 == 0) {
                        this.sentenceEl[0].innerHTML = htmls.join('')
                        this.sentenceEl[1].classList.remove("active");
                        this.sentenceEl[0].classList.add("active");
                    }
                    else {
                        this.sentenceEl[1].innerHTML = htmls.join('');
                        this.sentenceEl[0].classList.remove("active");
                        this.sentenceEl[1].classList.add("active");
                    }
                    setTimeout(() => {
                        if (index < song.data.sentences.length - 1) {
                            let htmls = song.data.sentences[index + 1].words.map(word => {
                                return `
                                <span>${word.data}</span>
                                `
                            })
                            if ((index + 1) % 2 == 0) {
                                this.sentenceEl[0].innerHTML = htmls.join('')
                            }
                            else {
                                this.sentenceEl[1].innerHTML = htmls.join('')
                            }
                        }
                    }, 1000)
                    this.handel(i, sentence)
                }
            })
        },
        handel(i, sentence) {
            let currentSentence = document.querySelector(".sentence.active")
            let span = currentSentence.querySelectorAll("span");
            span[i].style.animation = `linearText ${(sentence.words[i].endTime - sentence.words[i].starTime) / 1000}s linear`;
            span[i].style.backgroundSize = '100%'
            if (i < span.length - 1) {
                setTimeout(() => {
                    i++;
                    this.handel(i, sentence)
                }, sentence.words[i].endTime - sentence.words[i].starTime)
            }
        }
    }
}

export default lyricUI;
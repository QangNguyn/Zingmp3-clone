class baseObject {
    constructor() {
        this.events = {}
        this.init()
    }
    init() {
        this.listenEvents();
    }
    listenEvents() {
        for (let eventName in this.events) {
            this.events[eventName].forEach(callback => {
                callback(this)
            })
        }
    }
    dispatchEvent(eventName) {
        this.events[eventName].forEach(callback => {
            callback(this)
            // console.log(this.events);
        })
    }
    addEventListener(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push(callback)
    }
}

export default baseObject;
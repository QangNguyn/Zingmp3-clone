const API = {
    async sent(url, method, data) {
        let res = await fetch(url, {
            method: method,
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        })
        return res.json();
    },
    async post(url, data) {
        return await this.sent(url, 'post', data);
    },
    async delete(url) {
        return await this.sent(url, 'delete');
    }
}

export default API;
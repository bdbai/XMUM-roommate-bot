"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const events = require("events");
const writeFileAsync = (path, data) => new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), err => {
        if (err)
            return reject(err);
        return resolve();
    });
});
const readFileAsync = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
        if (err)
            return reject(err);
        return resolve(data.toString());
    });
});
const sleep = (ms) => new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
});
const FILE_PATH = process.env.DataFile;
class ModelManager extends events.EventEmitter {
    constructor() {
        super();
        this.currentData = null;
        fs.watchFile(FILE_PATH, async (curr, prev) => {
            await sleep(100);
            console.log('Loaded new data');
            this.emit('updated', await this.loadData());
        });
    }
    saveData(newData) {
        return writeFileAsync(FILE_PATH, newData);
    }
    on(event, listener) {
        return this.on(event, listener);
    }
    async loadData() {
        try {
            this.currentData = JSON.parse(await readFileAsync(FILE_PATH));
        }
        catch (ex) {
            console.error(ex);
        }
        return this.currentData;
    }
    async getData() {
        if (this.currentData === null)
            return this.loadData();
        return this.currentData;
    }
    async updateUserRoom(qq, room) {
        this.currentData.users[qq] = room;
        const roomUsers = this.currentData.rooms[room];
        if (!roomUsers) {
            this.currentData.rooms[room] = [qq];
        }
        else if (!roomUsers.includes(qq)) {
            roomUsers.push(qq);
        }
        return this.saveData(this.currentData);
    }
}
exports.default = ModelManager;
//# sourceMappingURL=ModelManager.js.map
import IModelManager from './IModelManager'
import IData from './IData'
import * as fs from 'fs'
import * as events from 'events'

const writeFileAsync = (path: string, data: any): Promise<{}> =>
    new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data), err => {
            if (err) return reject(err)
            return resolve()
        })
    })

const readFileAsync = (path: string): Promise<any> =>
    new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) return reject(err)
            return resolve(data.toString())
        })
    })

const sleep = (ms: number) =>
    new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })

const FILE_PATH = process.env.DataFile

class ModelManager extends events.EventEmitter implements IModelManager {
    constructor() {
        super()

        fs.watchFile(FILE_PATH, async (curr, prev) => {
            await sleep(100)
            console.log('Loaded new data')
            this.emit('updated', await this.loadData())
        })
    }
    private currentData: IData = null;
    private saveData(newData: IData): Promise<{}> {
        return writeFileAsync(FILE_PATH, newData)
    }
    on(event: 'updated', listener: (newData: IData) => void): this {
        return this.on(event, listener)
    }
    private async loadData(): Promise<IData> {
        try {
            this.currentData = JSON.parse(await readFileAsync(FILE_PATH)) as IData
        } catch (ex) {
            console.error(ex)
        }
        return this.currentData
    }
    async getData(): Promise<IData> {
        if (this.currentData === null) return this.loadData()
        return this.currentData
    }
    async updateUserRoom(qq: string, room: string): Promise<{}> {
        this.currentData.users[qq] = room
        const roomUsers = this.currentData.rooms[room]
        if (!roomUsers) {
            this.currentData.rooms[room] = [qq]
        } else if (!roomUsers.includes(qq)) {
            roomUsers.push(qq)
        }        
        return this.saveData(this.currentData)
    }

}

export default ModelManager

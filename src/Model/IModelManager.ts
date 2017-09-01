import IData from './IData'

interface IModelManager {
    on(event: 'updated', listener: (newData: IData) => void): this;
    getData(): Promise<IData>,
    updateUserRoom(qq: string, room: string): Promise<{}>
}

export default IModelManager

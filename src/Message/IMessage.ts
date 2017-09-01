import IModelManager from '../Model/IModelManager'

interface IMessage {
    message: string,
    user_id: number,
    // group: string,
    group_id: number,
    message_type: string,
    post_type: string,
    modelManager: IModelManager

    // event?: string,
    // params?: any,

    Reply(content: string): any
    Dispose(): any
}

export default IMessage;
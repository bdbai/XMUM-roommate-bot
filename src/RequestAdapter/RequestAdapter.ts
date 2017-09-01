import * as express from 'express';
import * as bodyParser from 'body-parser';
import IMessage from '../Message/IMessage';
import IMessageManager from '../Message/Manager/IMessageManager';
import IModelManager from '../Model/IModelManager'

class RequestAdapter {
    constructor(app: express.Application, manager: IMessageManager, modelManager: IModelManager) {
        app.post('/', (req: express.Request & bodyParser.OptionsJson, res: express.Response) => {
            /*if (req.hostname !== process.env.CALLBACK_ADDR) {
                res.sendStatus(400);
                return;
            }*/

            if (req.body.message instanceof Array) {
                req.body.message = (req.body.message as Array<any>)
                    .filter(seg => seg.type === 'text')
                    .map(seg => seg.data.text)
                    .join('');
            }

            const rawMessage = Object.assign(
                {},
                req.body,
                {
                    Reply: (content: String) => {
                        res.json({
                            reply: content
                        });
                    },
                    Dispose: () => {
                        res.end();
                    },
                    modelManager: modelManager
                }
            ) as IMessage;

            manager.ProcessMessage(rawMessage);
        });
    }
}

export default RequestAdapter;
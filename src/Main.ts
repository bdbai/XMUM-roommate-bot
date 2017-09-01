import * as express from 'express';
import * as bodyParser from 'body-parser';
import IMessageManager from './Message/Manager/IMessageManager';
import MessageManager from './Message/Manager/MessageManager';
import RequestAdapter from './RequestAdapter/RequestAdapter';

import ModelManager from './Model/ModelManager'

// Message handlers
import HelloHandler from './Message/Handler/HelloHandler';
import CommandMessageHandler from './Message/Handler/CommandMessageHandler';
import DisposeHandler from './Message/Handler/DisposeHandler';

// Command handlers
import CommandHandler from './Command/Handler/CommandHandler';
import HelpHandler from './Command/Handler/HelpHandler';
import FindHandler from './Command/Handler/FindHandler';
import RegisterHandler from './Command/Handler/RegisterHandler';
import AboutHandler from './Command/Handler/AboutHandler';

class Server {

    public static InitMessageManager(): IMessageManager {
        const commandHandler = new CommandHandler('找舍友')
            // Insert your command handlers here!
            .RegisterSubHandler(new HelpHandler())
            .RegisterSubHandler(new FindHandler())
            .RegisterSubHandler(new RegisterHandler())
            .RegisterSubHandler(new AboutHandler())
        return new MessageManager([
            new HelloHandler(),
            new CommandMessageHandler(commandHandler),
            // Insert your message handlers here!
            new DisposeHandler()
        ]);
    }

    public static Main(): number {
        const app = express();
        app.use(bodyParser.json());
        new RequestAdapter(app, Server.InitMessageManager(), new ModelManager());
        app.listen(process.env.PORT || 5001);

        process.on('unhandledRejection', err => console.error(err.stack));
        return 0;
    }
}

export default Server;
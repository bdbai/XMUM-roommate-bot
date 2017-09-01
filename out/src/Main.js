"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const MessageManager_1 = require("./Message/Manager/MessageManager");
const RequestAdapter_1 = require("./RequestAdapter/RequestAdapter");
const ModelManager_1 = require("./Model/ModelManager");
// Message handlers
const HelloHandler_1 = require("./Message/Handler/HelloHandler");
const CommandMessageHandler_1 = require("./Message/Handler/CommandMessageHandler");
const DisposeHandler_1 = require("./Message/Handler/DisposeHandler");
// Command handlers
const CommandHandler_1 = require("./Command/Handler/CommandHandler");
const HelpHandler_1 = require("./Command/Handler/HelpHandler");
const FindHandler_1 = require("./Command/Handler/FindHandler");
const RegisterHandler_1 = require("./Command/Handler/RegisterHandler");
const AboutHandler_1 = require("./Command/Handler/AboutHandler");
class Server {
    static InitMessageManager() {
        const commandHandler = new CommandHandler_1.default('找舍友')
            .RegisterSubHandler(new HelpHandler_1.default())
            .RegisterSubHandler(new FindHandler_1.default())
            .RegisterSubHandler(new RegisterHandler_1.default())
            .RegisterSubHandler(new AboutHandler_1.default());
        return new MessageManager_1.default([
            new HelloHandler_1.default(),
            new CommandMessageHandler_1.default(commandHandler),
            // Insert your message handlers here!
            new DisposeHandler_1.default()
        ]);
    }
    static Main() {
        const app = express();
        app.use(bodyParser.json());
        new RequestAdapter_1.default(app, Server.InitMessageManager(), new ModelManager_1.default());
        app.listen(process.env.PORT || 5001);
        process.on('unhandledRejection', err => console.error(err.stack));
        return 0;
    }
}
exports.default = Server;
//# sourceMappingURL=Main.js.map
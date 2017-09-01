"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandlerBase_1 = require("./CommandHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
class AboutHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = ['关于', '其它', '其他', '作者'];
    }
    async processCommand(command) {
        command.Message.Reply(`XMUM-roommate-bot 帮你找到舍友的开源 QQ bot。
https://github.com/bdbai/XMUM-roommate-bot 欢迎 star ✨
遇到假的舍友或其它问题，请联系维护者 347099920 谢谢配合 😂`);
        return HandleResult_1.default.Handled;
    }
}
exports.default = AboutHandler;
//# sourceMappingURL=AboutHandler.js.map
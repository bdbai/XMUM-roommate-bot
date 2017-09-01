"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandlerBase_1 = require("./CommandHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
class FindHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.Prefix = ['舍友', '基友', '咯'];
    }
    async processCommand(command) {
        const manager = command.Message.modelManager;
        const data = await manager.getData();
        const qq = command.Message.user_id.toString();
        const room = data.users[qq];
        if (!room) {
            command.Message.Reply('我还不知道你的宿舍号呢 :(');
            return HandleResult_1.default.Handled;
        }
        const roommates = data.rooms[room];
        if (roommates.length === 1) {
            if (command.Message.message_type === 'group') {
                command.Message.Reply('别急，舍友总会来的。加我好友，第一时间收到舍友上线通知！');
            }
            else {
                command.Message.Reply('别急，舍友总会来的。再等等呗');
            }
            return HandleResult_1.default.Handled;
        }
        else {
            if (command.Message.message_type === 'group') {
                command.Message.Reply('帮你找到舍友了哦~给我发私信”舍友“来找到 TA！');
            }
            else {
                const roommate = roommates.filter(i => i !== qq)[0];
                command.Message.Reply(`舍友的 QQ 号是 ${roommate}，快去勾搭吧！`);
            }
            return HandleResult_1.default.Handled;
        }
    }
}
exports.default = FindHandler;
//# sourceMappingURL=FindHandler.js.map
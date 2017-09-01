"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandlerBase_1 = require("./CommandHandlerBase");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
const CoolQRichMessage_1 = require("../../Message/Rich/CoolQRichMessage");
const TextSegment_1 = require("../../Message/Rich/TextSegment");
class RegisterHandler extends CommandHandlerBase_1.default {
    constructor() {
        super(...arguments);
        this.unconfirmedUsers = {};
        this.accepted = () => true;
    }
    async processCommand(command) {
        const manager = command.Message.modelManager;
        const data = await manager.getData();
        const reg = new RegExp(data.settings.roomnumber_pattern, 'i');
        const qq = command.Message.user_id.toString();
        const room = command.Content.toUpperCase();
        // Validation
        if (!reg.test(command.Content))
            return HandleResult_1.default.Skipped;
        if (data.users[qq.toString()]) {
            command.Message.Reply('绑定的宿舍号不可以变了哦~如有问题请联系维护者 347099920 谢谢配合');
            console.log('Room-immutation violated: ' + qq);
            return HandleResult_1.default.Handled;
        }
        const roommates = data.rooms[room];
        if (roommates && roommates.length === 2) {
            command.Message.Reply('XMUM 可没有三人间哦~');
            console.log('Room capacity violated: ' + qq);
            return HandleResult_1.default.Handled;
        }
        if (command.Message.message_type === 'group') {
            // Group messages don't need confirmation
            delete this.unconfirmedUsers[qq];
            if (roommates) {
                console.log(`Public room register&found:${qq} ${room}`);
                command.Message.Reply('恭喜，我帮你找到舍友了！请向我发私信“舍友”来找到 TA~');
                const roommate = roommates[0];
                // Notify the other
                new CoolQRichMessage_1.default()
                    .AddSegment(new TextSegment_1.default(`你的舍友来啦！TA 的 QQ 号是 ${qq}，快去勾搭吧！`))
                    .SendToFriend(parseInt(roommate));
            }
            else {
                console.log(`Public room register:${qq} ${room}`);
                command.Message.Reply('小本本记下了你的宿舍号！加我为好友，助你第一时间找到舍友！说”找舍友咯“查看舍友是否上线~');
            }
            manager.updateUserRoom(qq, room);
            return HandleResult_1.default.Handled;
        }
        const unconfirmedUser = this.unconfirmedUsers[qq];
        if (unconfirmedUser) {
            if (room === unconfirmedUser) {
                // Recorded
                delete this.unconfirmedUsers[qq];
                const roommates = data.rooms[room];
                if (roommates) {
                    const roommate = roommates[0];
                    console.log(`Private room register&found:${qq} ${room}`);
                    command.Message.Reply(`恭喜，我帮你找到舍友了！TA 的 QQ 号是 ${roommate}，快去勾搭吧！`);
                    // Notify the other
                    new CoolQRichMessage_1.default()
                        .AddSegment(new TextSegment_1.default(`你的舍友来啦！TA 的 QQ 号是 ${qq}，快去勾搭吧！`))
                        .SendToFriend(parseInt(roommate));
                }
                else {
                    console.log(`Public room register:${qq} ${room}`);
                    command.Message.Reply('小本本记下了你的宿舍号！加我为好友，助你第一时间找到舍友！');
                }
                manager.updateUserRoom(qq, room);
                return HandleResult_1.default.Handled;
            }
            else {
                // Not match
                // Re-confirm needed
                this.unconfirmedUsers[qq] = room;
                command.Message.Reply('请再输入一次宿舍号。确认以后不能改哦！');
                return HandleResult_1.default.Handled;
            }
        }
        else {
            // Confirm needed
            this.unconfirmedUsers[qq] = room;
            command.Message.Reply('请再输入一次宿舍号。确认以后不能改哦~');
            return HandleResult_1.default.Handled;
        }
    }
}
exports.default = RegisterHandler;
//# sourceMappingURL=RegisterHandler.js.map
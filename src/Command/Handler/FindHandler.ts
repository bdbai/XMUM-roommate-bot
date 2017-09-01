import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';

export default class FindHandler extends CommandHandlerBase {
    public Prefix = ['舍友', '基友', '咯']

    public async processCommand(command: Command): Promise<HandleResult> {
        const manager = command.Message.modelManager
        const data = await manager.getData()
        const qq = command.Message.user_id.toString()

        const room = data.users[qq]
        if (!room) {
            command.Message.Reply('我还不知道你的宿舍号呢 :(')
            return HandleResult.Handled
        }

        const roommates = data.rooms[room]
        if (roommates.length === 1) {
            if (command.Message.message_type === 'group') {
                command.Message.Reply('别急，舍友总会来的。加我好友，第一时间收到舍友上线通知！')
            } else {
                command.Message.Reply('别急，舍友总会来的。再等等呗')
            }
            return HandleResult.Handled
        } else {
            if (command.Message.message_type === 'group') {
                command.Message.Reply('帮你找到舍友了哦~给我发私信”舍友“来找到 TA！')
            } else {
                const roommate = roommates.filter(i => i !== qq)[0]
                command.Message.Reply(`舍友的 QQ 号是 ${roommate}，快去勾搭吧！`)
            }
            return HandleResult.Handled
        }
    }
}

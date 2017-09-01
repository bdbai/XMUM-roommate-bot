import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';

export default class HelpHandler extends CommandHandlerBase {
    public Prefix = '帮助'

    public async processCommand(command: Command): Promise<HandleResult> {
        const aprefix = command.GetAccumulatedPrefix()
        const data = await command.Message.modelManager.getData()
        const qq = command.Message.user_id.toString()
        const room = data.users[qq]
        if (command.Message.message_type === 'group') {
            command.Message.Reply(
            `Hello! 我可以帮你找到舍友哦。
说“找舍友${room ? '咯”' : '“加你的宿舍号'}试试吧。
说”找舍友 关于“ 查看其它信息。`)
        } else {
            command.Message.Reply(`发“帮助”查看帮助；
发${room ? '“舍友”' : '宿舍号'}来找舍友；
发“关于”查看其它信息`)
        }
        return HandleResult.Handled
    }
}
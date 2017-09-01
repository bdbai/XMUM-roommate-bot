import CommandHandlerBase from './CommandHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';

export default class AboutHandler extends CommandHandlerBase {
    public Prefix = ['关于', '其它', '其他', '作者']

    public async processCommand(command: Command): Promise<HandleResult> {
        command.Message.Reply(`XMUM-roommate-bot 帮你找到舍友的开源 QQ bot。
https://github.com/bdbai/XMUM-roommate-bot 欢迎 star ✨
遇到假的舍友或其它问题，请联系维护者 347099920 谢谢配合 😂`)
        return HandleResult.Handled
    }
}
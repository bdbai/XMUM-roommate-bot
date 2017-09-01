import HelpHandler from './HelpHandler';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';

export default class CommandHandler extends HelpHandler {
    constructor(public Prefix: string) {
        super();
    }

    protected accepted = (c: Command) =>
        c.Message.message_type === 'group' && c.StartsWith(this.Prefix)
        || c.Message.message_type === 'private'

    public async processCommand(command: Command): Promise<HandleResult> {
        command.AccumulatedPrefixes.push(this.Prefix);

        if (
            command.Message.message_type === 'group' &&
            command.GetSubCommand(this.Prefix).Content.length > 0
        ) return HandleResult.Skipped;

        if (
            command.Message.message_type === 'private' &&
            command.StartsWith(this.Prefix)
        ) {
            // Private global prefix is
            // not needed for private messages.
            // Remove it.
            command = command.GetSubCommand(this.Prefix)
            command.AccumulatedPrefixes.shift()
        }

        return await super.processCommand(command);
    }
}
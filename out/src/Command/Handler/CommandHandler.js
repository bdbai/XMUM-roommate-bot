"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelpHandler_1 = require("./HelpHandler");
const HandleResult_1 = require("../../Message/Handler/HandleResult");
class CommandHandler extends HelpHandler_1.default {
    constructor(Prefix) {
        super();
        this.Prefix = Prefix;
        this.accepted = (c) => c.Message.message_type === 'group' && c.StartsWith(this.Prefix)
            || c.Message.message_type === 'private';
    }
    async processCommand(command) {
        command.AccumulatedPrefixes.push(this.Prefix);
        if (command.Message.message_type === 'group' &&
            command.GetSubCommand(this.Prefix).Content.length > 0)
            return HandleResult_1.default.Skipped;
        if (command.Message.message_type === 'private' &&
            command.StartsWith(this.Prefix)) {
            // Private global prefix is
            // not needed for private messages.
            // Remove it.
            command = command.GetSubCommand(this.Prefix);
            command.AccumulatedPrefixes.shift();
        }
        return await super.processCommand(command);
    }
}
exports.default = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map
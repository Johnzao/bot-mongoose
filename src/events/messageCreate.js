module.exports = class {
    constructor(client) {
        this.client = client;
        this.eventName = "messageCreate";
    }

    async run(message) {
        try {
            if (message.author.bot === true) return;

            let defaultPrefix = this.client.config.defaultPrefix;
            if (message.mentions.has(this.client.user) || message.content.startsWith(defaultPrefix)) {
                let args;
                let commandName;
                let command;

                if (message.mentions.has(this.client.user)) {
                    args = message.content.slice(`<@!${this.client.user.id}>`.length).trim().split(/ +/g);
                    commandName = args.shift().toLowerCase();
                } else if (message.content.startsWith(defaultPrefix)) {
                    args = message.content.slice(defaultPrefix.length).trim().split(/ +/g);
                    commandName = args.shift().toLowerCase();
                }

                command = this.client.commands.get(commandName) || this.client.commands.get(this.client.aliases.get(commandName))
                if (command) {
                    if (command.ownerOnly) {
                        const check = this.client.config.owners.filter(id => id == message.author.id);
                        if (check.length != 1) {
                            message.reply("Este comando apenas pode ser executado pelos desenvolvedores do bot.").then(message => { setTimeout(() => { message.delete().catch(() => { }); }, 5000) });
                            return;
                        }
                    }
                    try { command.run({ args, message, defaultPrefix }); } catch (error) { console.log(error); console.log(colors.red("[Commands] Ocorreu um erro ao executar o comando " + commandName + "."))}
                }
            }
        } catch (error) {
            if (error) console.error(error);
        }
    }
};
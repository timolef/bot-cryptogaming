module.exports = {
	name: 'help',
	description: 'Voir toutes les commandes',
	async execute(message, args, Discord, client) {
		const fs = require('fs');
		const prefix = '+';
		const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
		if (!args.length) {
			const embed = new Discord.MessageEmbed()
				.setColor('#36393F')
				.addField(
					'Listes des commandes',
					`Liste de toutes les commandes disponibles\n Pour plus d'infos sur une commande, tapez \`${prefix}help <command_name>\``
				);

			var namelist = '';
			var desclist = '';
			var usage = '';

			let result = commandFiles.forEach((f, i) => {
				let props = require(`./${f}`);
				namelist = props.name;
				desclist = props.description;

				// send help text
				embed.addField(`${props.name}`, `${props.description}`)
			});
			message.channel.send(embed);
		}if(args.length == 1){
            const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith(`${args[0]}.js`));
            const embed = new Discord.MessageEmbed()
				.setColor('#36393F')
				
            let result = commandFiles.forEach((f, i) => {
				let props = require(`./${f}`);


				// send help text
				embed.addField(`${props.name}`, `${props.description}`)
                embed.addField(`Usage : `, `${props.usage}`)
			});
            message.channel.send(embed);
			message.delete()
        }
	}
};

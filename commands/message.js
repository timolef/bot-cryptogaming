module.exports = {
	name: 'message',
	description: 'Envoyer une annonce (avoir le role fondateur)',
    usage:'+message <message>',
	async execute(message, args, Discord, client) {
        if(message.member.roles.cache.has('824762724192878598')){
            messag = args.join(" ")
        embedMessage = new Discord.MessageEmbed()
        .setColor("#1b58d3")
        .setTitle("Message important !")
        .setAuthor("CryptoGaming FR")
        .setDescription(messag)
        
        message.channel.send(embedMessage)
        message.delete()
        }else{
            message.channel.send("Vous n'avez pas la permission d'effectuer cette commande.")
            message.delete()
        }
	}
};

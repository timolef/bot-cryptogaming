module.exports = {
	name: 'link',
	description: 'Voir les liens des différents réseaux sociaux',
    usage:'+link',
	async execute(message, args, Discord, client) {
        
        embedMessage = new Discord.MessageEmbed()
        .setColor("#1b58d3")
        .setTitle("Liens de nos réseaux !")
        .setAuthor("CryptoGaming FR")
        .setDescription(
            "Youtube : [https://www.youtube.com/channel/UCwNQEofJlyu45aY63wipdfw](https://www.youtube.com/channel/UCwNQEofJlyu45aY63wipdfw) \n\n Twitter : [https://twitter.com/CryptoGamingFr1](https://twitter.com/CryptoGamingFr1) \n\nTwitch : [https://www.twitch.tv/cryptogamingfr](https://www.twitch.tv/cryptogamingfr) \n\nInstagram : [https://instagram.com/cryptogamingfr?utm_medium=copy_link](https://instagram.com/cryptogamingfr?utm_medium=copy_link)\n\nFacebook : [https://www.facebook.com/Cryptogamingfr-104241421835704](https://www.facebook.com/Cryptogamingfr-104241421835704)\n\nInvitation discord : [https://discord.gg/9PEEUYAC9m](https://discord.gg/9PEEUYAC9m)"
        )
        
        message.channel.send(embedMessage)
        message.delete()
	}
};

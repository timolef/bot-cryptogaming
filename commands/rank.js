module.exports = {
    name: 'rank',
    description: 'Voir son rank',
    async execute(message, Discord, Levels){
        const user = await Levels.fetch(message.author.id, message.guild.id);
        embedRank = new Discord.MessageEmbed()
        .setTitle("RANK")
        .setColor("#e42643")
        .setDescription(`You are currently level **${user.level}**!`)
        message.channel.send(embedRank)
 
    }
}
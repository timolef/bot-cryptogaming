module.exports = {
    name: 'leaderboard',
    description: 'Voir le leaderboard',
    async execute(message, Discord, client){
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard); 

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
        embedLeader = new Discord.MessageEmbed()
        .setTitle("LEADERBOARD")
        .setColor("#0099ff")
        .setDescription(`${lb.join("\n\n")}`)
        message.channel.send(embedLeader)
 
    }
}
        
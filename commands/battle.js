const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'battle',
    description: 'Permet de se battre avec quelqu\'un',
    async execute(message, args, Discord, client){
        const randomBattle = Math.floor(Math.random() * 2) + 1;
        console.log(randomBattle) //Random amont of XP until the number you want + 1
        const taggedUser = message.mentions.users.first();
        embedBattle = new Discord.MessageEmbed()
        .setColor("#e42643")
        .setTitle("BATTLE ! ")
        if(randomBattle == 2){
            embedBattle.setDescription(`GG ${taggedUser} Tu as win !`)
            .setThumbnail(taggedUser.displayAvatarURL());
            message.channel.send(embedBattle);
        }else if(randomBattle == 1){
            embedBattle.setDescription(`GG ${message.author.toString()} Tu as win !`)
            .setThumbnail(message.author.displayAvatarURL());
            message.channel.send(embedBattle);
        }
    }
 
    
}
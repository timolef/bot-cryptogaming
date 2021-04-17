const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'clear',
    description: 'Permet de clear des messages',
    async execute(message, args){
        if(!args[0]) return message.reply("Entrez le nombre de messages que vous voulez supprimer")
        if(isNaN(args[0])) return message.reply("Veuillez entrer un nombre réel ")
        if(args[0] > 100) return message.reply("Vous ne pouvez supprimer plus de 100 messages en meme temps")
        if(args[0] < 1) return message.reply("Vous devez supprimer au moins 1 message")

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        })
    }
 
    
}
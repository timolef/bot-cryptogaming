module.exports = {
    name: 'reactionrole',
    description: 'Roles avec réactions',
    async execute(message, args, Discord, client){
        const channel = "826550574077575208";
        const cuistot = message.guild.roles.cache.find(role => role.name === "Cuistot");
        const artiste = message.guild.roles.cache.find(role => role.name === "Artiste");

        const emoteCuistot = '🍽'
        const emoteArtiste = '🖌'

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choisissez votre ou vos roles !')
            .setDescription('Choisissez un ou plusieurs roles pour accéder aux channels associés!\n\n'
            + `${emoteCuistot} : Cuistot\n`
            + `${emoteArtiste} : Artiste`)
        let messageEmbed = await message.channel.send(embed)
        messageEmbed.react(emoteCuistot);
        messageEmbed.react(emoteArtiste);
        client.on('messageReactionAdd', async(reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if(reaction.emoji.name === emoteCuistot) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(cuistot);

                }
                if(reaction.emoji.name === emoteArtiste) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(artiste);

                } else{
                    return;
                }
            }
        })
        client.on('messageReactionRemove', async(reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if(reaction.emoji.name === emoteCuistot) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(cuistot);

                }
                if(reaction.emoji.name === emoteArtiste) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(artiste);

                } else{
                    return;
                }
            }
        })
 
    }
}
const axios = require('axios')
const Discord = require('discord.js');
const prefix = "+"
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const fs = require("fs")
const rss = require('rss-converter');
require("dotenv").config();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in

client.once('ready', () => {
	console.log('Ready!');
    setInterval(async () => {
        let feed = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + process.env.channel_yt);
        let jsonOpen = fs.readFileSync('links.json');
        let json = JSON.parse(jsonOpen);
        if (jsonOpen.includes(feed.items[0].yt_videoId)) return;
        json.push(feed.items[0].yt_videoId);
        let jsonLink = JSON.stringify(json);
        fs.writeFileSync('links.json', jsonLink);
        const embed = new Discord.MessageEmbed()
        .setColor("#ff4fa7")
        .setAuthor("Youtube Notification")
        .addField("**Title**", feed.items[0].media_group.media_title)
        .addField("**Likes Count**", feed.items[0].media_group.media_community.media_starRating_count, true)
        .addField("**Likes Average**", feed.items[0].media_group.media_community.media_starRating_average, true)
        .addField("**Views**", feed.items[0].media_group.media_community.media_statistics_views, true)
        .addField("**Description**", feed.items[0].media_group.media_description)
        .setImage(feed.items[0].media_group.media_thumbnail_url)
        client.channels.cache.get(process.env.channel_id).send(`@everyone **${feed.author.name}** vient de sortir une nouvelle vidéo ! **${feed.items[0].title}**!\n\nhttps://www.youtube.com/watch?v=${feed.items[0].yt_videoId}`, embed)
        }, 5000);
});
client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.channelID === null) console.log(oldState.member.user.username, ' left channel ', oldState.channel.name);
    
    else if (oldState.channelID === null & newState.channelID == "840348418127953941"){
        newState.guild.channels.create(newState.member.user.username,{
            type:'voice'
                
        })
        .then(channel => {
            channel.overwritePermissions([
                {
                    id: newState.member.user.tag,
                    allow: ['MANAGE_CHANNELS']
                },]);
            let category = newState.guild.channels.cache.find(c => c.name == "Test" && c.type == "category");
    
            if (!category) throw new Error("Category channel does not exist");
            channel.setParent(category.id);
        })
    }
    else if (oldState.channelID === null ) console.log(newState.member.user.username, ' joined channel ', newState.channel.name);
    else console.log(newState.member.user.username, 'moved channels', oldState.channel.name,'//', newState.channel.name);
    
});
client.on('guildMemberAdd',member => {
    let msgEmbed = new Discord.MessageEmbed()
    .setTitle(`Bienvenue !`)
    .setDescription(`Bienvenue ${member.user.username} ! Nous sommes ravis de te compter parmis nous ! \nN'hésite pas à passer dans #:video_game:¦-rôles-jeux pour suivre l'actualité des jeux qui t'intéresse !`)
    .setThumbnail(member.user.avatarURL())
    member.guild.channels.cache.get('824762724390141963').send(msgEmbed); 
});
client.on('message', async message => {
    if (!message.guild) return;
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    


    if(!message.content.startsWith(prefix) || message.author.bot) return;

    

    if (command === "message"){
        client.commands.get('message').execute(message, args, Discord, client)
    }else if (command === "help"){
        client.commands.get('help').execute(message, args, Discord, client)
    }else if (command === "link"){
        client.commands.get('link').execute(message, args, Discord, client)
    }else if (command === "last"){
        client.commands.get('last').execute(message, args, Discord, client)
    }
});
// login to Discord with your app's token
function handleUploads() {
    
}
client.login(process.env.TOKEN); 
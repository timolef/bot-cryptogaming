
const Discord = require('discord.js');
const prefix = "+"
// create a new Discord client
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const Levels = require('discord-xp')
const fs = require("fs")
require("dotenv").config();



try {Levels.setURL(process.env.MONGOURL)}

catch {console.log("erreur")}
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
});
client.on('guildMemberAdd', async member => {

    let msgEmbed = new Discord.MessageEmbed()
    .setTitle(`Bienvenue !`)
    .setDescription(`La grande porte s'ouvre et ${member} fait son entrée dans le tunnel ! Attention !`)
    .setImage('https://i.pinimg.com/originals/cc/85/0f/cc850f28dde19d8559cd08ca4709e16d.png')
    member.guild.channels.cache.get('826219341728972822').send(msgEmbed); 
});
client.on('message', async message => {
    if (!message.guild) return;
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const server_queue = queue.get(message.guild.id);
    const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    const video_player = async (guild, song) => {
        const song_queue = queue.get(guild.id);
    
        //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
        if (!song) {
            song_queue.voice_channel.leave();
            queue.delete(guild.id);
            return;
        }
        const stream = ytdl(song.url, { filter: 'audioonly' });
        song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });
        await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
    }
    
    const skip_song = (message, server_queue) => {
        if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
        if(!server_queue){
            return message.channel.send(`There are no songs in queue 😔`);
        }
        server_queue.connection.dispatcher.end();
    }
    
    const stop_song = (message, server_queue) => {
        if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
        server_queue.songs = [];
        server_queue.connection.dispatcher.end();
    }



    if(!message.content.startsWith(prefix) || message.author.bot) return;

    

    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You leveled up to ${user.level}! Keep it going!`);
    }
    if(command === 'test'){
        message.channel.send("test")
    }else if (command === "reactionrole"){
        client.commands.get('reactionrole').execute(message, args, Discord, client)
    }else if (command === "ticket"){
        client.commands.get('ticket').execute(message, args)
    }else if (command === "clear"){
        client.commands.get('clear').execute(message, args)
    }else if(command === "rank") {
        client.commands.get('rank').execute(message, Discord, Levels)
    }else if(command === "leaderboard" || command === "lb") {
        client.commands.get('leaderboard').execute(message, Discord, client, Levels)
    }else if(command ==="battle"){
        client.commands.get('battle').execute(message, args, Discord, client)
    }else if(command === "play"){
        client.commands.get('play').execute(message,args, Discord, client, ytdl, ytSearch, queue, video_player)
    }else if(command === "pause"){
        
        
        skip_song(message, server_queue);
    }else if(command === "stop"){
        
        try {stop_song(message, server_queue)}
        catch(error){
            message.channel.send("Il n'y a rien a stopper")
        }
        
    }
});
// login to Discord with your app's token
client.login(process.env.TOKEN);
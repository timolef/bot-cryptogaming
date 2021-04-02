// require the discord.js module
const Discord = require('discord.js');
const prefix = "+"
// create a new Discord client

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
    member.guild.channels.cache.get('826219341728972822').send(msgEmbed); 
});
client.on('message', async message => {
    if (!message.guild) return;
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    



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
    }else if(command === "rank") {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        embedRank = new Discord.MessageEmbed()
        .setTitle("LEADERBOARD")
        .setColor("#e42643")
        .setDescription(`You are currently level **${user.level}**!`)
        message.channel.send(embedRank)
    }
    
    //Leaderboard
    else if(command === "leaderboard" || command === "lb") {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard); 

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
        embedLeader = new Discord.MessageEmbed()
        .setTitle("LEADERBOARD")
        .setColor("#0099ff")
        .setDescription(`${lb.join("\n\n")}`)
        message.channel.send(embedLeader)
    }else if(command ==="battle"){
        client.commands.get('battle').execute(message, args, Discord, client)

    }
});
// login to Discord with your app's token
client.login(process.env.TOKEN);
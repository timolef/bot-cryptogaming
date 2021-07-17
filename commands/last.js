module.exports = {
	name: 'last',
	description: 'Permet de voir la derniere vidéo mise en ligne de Cryptogaming FR',
	usage: '+last',
	async execute(message, args, Discord, client) {
		
		const rss = require('rss-converter');
		const config = require('../config.json');
			let feed = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt);
			const embed = new Discord.MessageEmbed()
			.setColor("#ff4fa7")
			.setAuthor("Youtube Notification")
			.addField("**Title**", feed.items[0].media_group.media_title)
			.addField("**Likes Count**", feed.items[0].media_group.media_community.media_starRating_count, true)
			.addField("**Likes Average**", feed.items[0].media_group.media_community.media_starRating_average, true)
			.addField("**Views**", feed.items[0].media_group.media_community.media_statistics_views, true)
			.addField("**Description**", feed.items[0].media_group.media_description)
			.setImage(feed.items[0].media_group.media_thumbnail_url)
			message.channel.send(`La derniere vidéo de **${feed.author.name}** est **${feed.items[0].title}**!\n\nhttps://www.youtube.com/watch?v=${feed.items[0].yt_videoId}`, embed)
			message.delete()
	}
};

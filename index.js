const Discord = require('discord.js')
const client = new Discord.Client()

const command = require('./command.js')
const config = require('./config.json')

client.on('ready', () => {
    console.log('Hai')

    command(client, 'ticket', message => {
	    
	    	//                        VV SERVER ID VV
		if (message.guild.id === 'ID') {
		//                        ^^ SERVER ID ^^
			const userID = message.author.id
			const name = `${message.author.username} Ticket`;
			message.guild.channels.create(name, {type: 'text'}).then((channel) => {
				// VV TICKET CATEGORY ID VV
				const caID = 'ID';
				// ^^ TICKET CATEGORY ID ^^
				channel.setParent(caID)
				channel.updateOverwrite(message.guild.id, {
					SEND_MESSAGE: false,
					VIEW_CHANNEL: false,
				});
				channel.updateOverwrite(message.author, {
					SEND_MESSAGE: true,
					VIEW_CHANNEL: true,
				});
				//                                                     VV SUPPORT ROLE ID VV
				channel.updateOverwrite(message.guild.roles.cache.get('ID'), {
				//                                                     ^^ SUPPORT ROLE ID ^^
					SEND_MESSAGE: true,
					VIEW_CHANNEL: true,
				});
				//                                                                                                        VV SUPPORT ROLE ID VV
				channel.send(`Hello ${message.author}, thank you for opening this ticket and please explain your problems. <@&ID> will come and help you soon!`);
				//                                                                                                        ^^ SUPPORT ROLE ID ^^
				channel.send(`Ticket owner ID: *${userID}*`)
			});
		} else {
			return message.channel.send('Unable to create ticket in current server.')
		}
	});

	command(client, 'closeticket', message => {
		if (message.member.hasPermission('ADMINISTRATOR') || message.author.id === '746325289281257547') {
				//                       VV TICKET CATEGORY ID VV
			if(message.channel.parentID === 'ID') {
				//                       ^^ TICKET CATEGORY ID ^^
				message.channel.send('Closing ticket...');
				setTimeout(function(){ 
					message.channel.delete()
				}, 5000);
				
			} else {
				message.channel.send('You can not close this channel.')
			};
		} else {
			message.channel.send('You can not use this command')
		};
	});

    command(client, 'help', message => {
        helpEmbed = new Discord.MessageEmbed()
            .setTitle('**Ticket bot commands:**')
            .setDescription('Ticket bot prefix: `t!`')
            .setThumbnail('https://cdn.discordapp.com/attachments/887648695129108510/887652965043798026/Untitled_1.jpg')
            .addField('**t!ticket**', 'Create a ticket for support!')
            .addField('**t!closeticket**', 'Close a ticket (Require "Administrator" permission).')
            .setFooter('Coded by Soes#3179');

        message.channel.send(helpEmbed)
    })
})

const http = require('http');
  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('bot still running');
  });
  server.listen(3000); 

client.login(config.token)

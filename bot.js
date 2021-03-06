const Discord = require('discord.js');
const client = new Discord.Client();
const winston = require('winston');
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

client.on('info', () => logger.log('ready', 'RoboMiku is online, running version ' + version + '.'));
client.on('debug', m => logger.log('debug', 'Debug mode is activated!'));
client.on('warn', m => logger.log('warn', 'There is an bug that if repeated might cause an error.'));
client.on('error', m => logger.log('error', 'Uh-oh! Something bad happened, causing the bot to crash.'));

process.on('uncaughtException', error => logger.log('error', error));

const PREFIX = '!';

var servers = {};


var activityDoing = [
    "you!",
    "Attack on Titans",
    "with her dog",
    "Killing with Cuteness",
    "her favorite song"
]

var activityType = [
    "PLAYING",
    "STREAMING",
    "WATCHING",
    "LISTENING"
]

var blessedImages = [
    "https://i.postimg.cc/Sxn1mJkJ/spookytime.jpg",
    "https://i.postimg.cc/KzfDP2x6/Screenshot-20200117-180929.png",
    "https://i.postimg.cc/mkN3LW6X/Screenshot-20200117-180655.png",
    "https://i.postimg.cc/zX2bnfWw/Screenshot-20200117-181554.png",
    "https://i.postimg.cc/DwWW5Kd9/Screenshot-20200117-181658.png",
    "https://i.postimg.cc/3wmk5Cq9/Screenshot-20200117-181203.png"
]

var version = '0.1.2a'

const usedCommandRecently = new Set();

client.on('ready', async () => {
    const randomActivityDoing = activityDoing[Math.floor(Math.random() * activityDoing.length)];
    const randomActivityType = activityType[Math.floor(Math.random() * activityType.length)];
    client.user.setActivity(randomActivityDoing, {
        type: randomActivityType
    }).catch(console.error);
})

var answersForHello = [
  "Hey",
  "Howdy",
  "Hello there",
  "Nice to see you",
  "Hewwo",
  "Greetings",
  "Welcome back",
  "Hi! Didn\'t see you there",
  "Por qué, hola",
  "Why hello",
  "Hi there",
  "yWhay ellohay"
]
   
var answersForMew1 = [
    "Look at that! ",
    "So cute! ",
    "Incredible! ",
    "Oh! ",
    "*I'm lovin\' it!*  ",
    "*:open_mouth:*  Whoah! ",
    "I have no words! ",
    "That\'s nice. "
]

var answersForMew2 = [
    "~~I ship it.~~",
    "*UwU*",
    "*purr*",
    "Guess people can be cats too. Weird.",
    "Where\'s the dog?",
    "Very interesting.. :thinking:",
    "So meow. Very cute. :dog:",
    "~~Can I go stabby someone?~~",
    ":cat:"
]

var answersForPing = [    
    "Pong!",
    "Pingity pong!",
    "Oreo! ~~No, wait..~~",
    "Super combo pong!",
    "Pinger ponger!",
    "https://media.giphy.com/media/fvcrSYkOmtP8c/giphy.gif",
    "ERROR: PING IS NOT A COMMAND, SICKO",
    "File \'pong.exe\' downloaded.",
    "Haduken!! :fire:"
]

var gifs = [
    "https://media.giphy.com/media/3o7btMCltyDvSgF92E/giphy.gif",
    "https://media.giphy.com/media/12nMEydAAgCxYA/giphy.gif",
    "https://media.giphy.com/media/fvcrSYkOmtP8c/giphy.gif",
    "https://media.giphy.com/media/ErZ8hv5eO92JW/giphy.gif",
    "https://media.giphy.com/media/Id0IZ49MNMzKHI9qpV/giphy.gif",
    "https://media.giphy.com/media/a9lgeWGF7Ysrm/giphy.gif",
    "https://media.giphy.com/media/zh5U2Rj6Wp3Uc/giphy.gif",
    "https://media.giphy.com/media/N4AIdLd0D2A9y/giphy.gif",
    "https://media.giphy.com/media/LU3uRsnett7gs/giphy.gif",
    "https://media.giphy.com/media/gZBYbXHtVcYKs/giphy.gif",
    "https://media.giphy.com/media/4QxQgWZHbeYwM/giphy.gif",
    "https://media.giphy.com/media/f4V2mqvv0wT9m/giphy.gif",
    "https://media.giphy.com/media/iHmodiTc8t0BO/giphy.gif",
    "https://media.giphy.com/media/uU8IHAFVDVhks/giphy.gif"
]

var answersForFacts = [
    "According to all known laws of aviation, there is no way a bee should be able to fly.",
    "The software that created me was released on August 31, 2007. ~~Wait, maybe I shouldn\'t have said that...~~",
    "..God is in heaven. Wait, *hey, who requested this fact? Tasty? ~~Of course...~~*",
    "By 2020, waifus will take over the world. ~~Shoot, the boss will be mad!~~",
    "My name means 'The First Sound From The Future'.",
    "Helper Pupper created this version of me.. I don\'t know how I can feel emotion whilst being an empty husk sworn to do the things people say. *I just can\'t understand..*",
    "I am 16 years old, ***so if you start making NSFW drawings __I WILL KI-__***",
    "You probably think Nacho Cheese was the first Dorito flavor, but it\'s actually Taco!",
    "My creator\'s phone runs Android 8, A.K.A. Android Oreo!",
    "I star in my own RPG! *Well, I will soon, at least..*",
    "The Miku Invasion will take over the world by 2021. *Bow down to me..*"
]

var bio = {};


    client.on('guildMemberAdd', member => {

        const channel = member.guild.channels.find(channel => channel.name === "member-logs");
        if (!channel) return;

        channel.send(`Hello there, ${member}! I am RoboMiku, the bot for this server, and I would like to welcome you! :grin:\n\n Before you continue, I reccommend you check the rules in the rules channel first!\n\n See ya later! :wave:`)
    });

    client.on('guildMemberRemove', member => {
        const channel = member.guild.channels.find(channel => channel.name === "member-logs");
        if(!channel) return;
        
        channel.send(`Oh.. that\'s sad. ${member}  left the server. :crying_cat_face:`)
    });

   client.on('message', async message => {

        let args = message.content.substring(PREFIX.length).split(" ");
	   
	   
        switch (args[0]) {
            case 'ping':
                const randomAnswerPing = answersForPing[Math.floor(Math.random() * answersForPing.length)];
                message.channel.send(randomAnswerPing)
                break;
            case 'version':
                message.channel.send('The current version is ' + version + '. ' + 'Keep your eyes peeled for updates!')
                break;
            case 'clear':
                if (!args[1]) return message.reply('Oops! You didn\'t define how many you wanted to clear, so I couldn\'t do anything! :worried: Please try again.')
                .then(msg => msg.delete(5000));
                if(!message.member.roles.find(r => r.name === "RoboMiku\'s Creator")) return;
                message.channel.send('Sorry, I can\'t let you clear any messages because you do not have the needed roles!')
                .then(msg => msg.delete(5000));
                message.channel.bulkDelete(args[1]);
		if(args[1] === '1') {
		message.channel.send('1 message deleted.')
		.then(msg => msg.delete(3000));
		} else {
		message.channel.send(`${args[1]} messages deleted.`)
		.then(msg => msg.delete(3000));
		}
                break;
            case 'hello':
                const randomAnswerHello = answersForHello[Math.floor(Math.random() * answersForHello.length)];
                message.channel.send(randomAnswerHello + ', ' + message.author.username + '!')
                break;
            case 'mew':
                const pingedUser = message.mentions.users.first();
                const randomAnswerMew1 = answersForMew1[Math.floor(Math.random() * answersForMew1.length)];
                const randomAnswerMew2 = answersForMew2[Math.floor(Math.random() * answersForMew2.length)];
                message.channel.send(randomAnswerMew1 + message.author.username + ` mewed at ${pingedUser.username}! ` + randomAnswerMew2)
                if (!message.mentions.users.size) {
                return message.reply('I need to know who you want to mew at!')
                .then(msg => msg.delete(4000));
		}
                break;
            case 'weebs':
                message.channel.send('Oh, so you want this? https://m.youtube.com/watch?v=S5RRCyCkiCk');
                break;
            case 'gif':
		const randomAnswerGifs = gifs[Math.floor(Math.random() * gifs.length)];
		message.channel.send(`Alright, here you go!`, {
                    file: randomAnswerGifs
                });
		break;
            case 'setBio':
		if(!bio[message.author.id]) {
		let messages = message.channel.messages;
                let authorMessages = messages.filter(m => m.author.id === message.author.id);
                let setBioCommands = authorMessages.filter(m => m.content.startsWith('!setBio'));
                let firstBio = setBioCommands.last();
                message.channel.send('I found a Bio you have previously set. Do you want to confirm the change to that Bio?')
                sentMessage.react("✅").then(sentMessage.react("❎"));
		const filter = (reaction, user) => {
                return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '✅') {
                            bio[message.author.id] = firstBio
			    message.reply('Past Bio successfully restored!')
			    .then(msg => msg.delete(3000));
                        }
                        else {
                            message.reply('Okey, I\'ll delete this Bio.')
			    .then(msg => msg.delete(3000)); 
                        }
                    })
                    .catch(collected => {
                        message.channel.send('You didn\'t respond, so I\'ll throw this Bio into the abyss. *Buh-bye!*');
                    });
		} else {
		let newArr = args.slice(1)
		bio[message.author.id] = newArr
		message.channel.send('Your bio has been changed!')
	        .then(msg => msg.delete(3000)); 
		}
		break;
            case 'profile':
                if(!bio[message.author.id]) {
		return message.channel.send('Sorry, please set a bio with `!setBio` to view your profile!')
		.then(msg => msg.delete(3000)); 
		} else {
		console.log(bio[message.author.id].join(" "))
		const embed = new Discord.RichEmbed()
		    .setTitle('__' + message.author.username + '\'s Profile__')
		    .addField(`Bio:`, bio[message.author.id])
		    .setColor(message.member.colorRole.color)
                    .setThumbnail(message.author.avatarURL)
                    message.channel.send(embed);
		}
                break;
	    case 'fact':
		const randomAnswerFacts = answersForFacts[Math.floor(Math.random() * answersForFacts.length)];
		message.channel.send('Alright, here\'s a random fact: ' + randomAnswerFacts);
		break;
	    case '!':			
                message.channel.send('Okay- wait..\n\n are you **TRYING** to make me implode?');
		break;
	    case 'bless':
		const randomAnswerBlessedImages = blessedImages[Math.floor(Math.random() * blessedImages.length)];
                message.channel.send("Your prayers have been answered by me! Have a blessed image: " + randomAnswerBlessedImages);
		break;
        }

    });
    client.login(process.env.BOT_TOKEN)

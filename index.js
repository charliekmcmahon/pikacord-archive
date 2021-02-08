
const { Collection, Client, Discord, MessageEmbed } = require("discord.js");
const quickdb = require('quick.db')
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { get } = require('request-promise-native')
const bot = new Client({disableEveryone: true});

var express = require("express");
var app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

// Initialise the Firebase DB
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
var admin = require("firebase-admin");
const serviceAccount = require('./serviceAccount.json');

// Push the admin initialisation
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

// Declare the db

let db = admin.firestore();

// **IMPORTANT** INITIALISE THE DB FOR THE SPECIFIC SERVER WHEN THE BOT IS INVITED

let prefix

bot.on('guildCreate', async gData => {

	db.collection('guilds').doc(gData.id).set({
		'guildID' : gData.id,
		'guildName' : gData.name,
		'guildOwner' : gData.owner.user.username,
		'guildOwnerID' : gData.owner.id,
		'guildMemberCount' : gData.memberCount,
		'prefix' : 'p!' // ***** This is where you set the default prefix for pikacord.
	});

    let welcome = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setDescription("Hey there! thanks for inviting me. If you would like a brief tutorial on how to use the bot, [Click me](http://www.pikacord.xyz/tutorials.php). For a list of all available commands, [Click me](http://www.pikacord.xyz/commands.php). Need any help? feel free to join the support server by [clicking me!](https://discord.gg/RzYPaWV)")
    .setColor("fba05b ")
    
    if(gData.memberCount > 500) welcome.addField("Server Partnership Program", "Hey there! we're currently looking to partner with a server with a minimum of 500 members, and currently, your server meets the criteria, if you're interested, feel free to dma dev on [the support server](https://discord.gg/RzYPaWV).")

    bot.users.cache.get(gData.owner.id).send(welcome)

    let Embed = new MessageEmbed()
      .setAuthor(gData.name, gData.iconURL())
      .setDescription("Pikacord just got added to a new server")
      .addField("Owner", gData.owner.user.tag, true)
      .addField("Member Count", gData.memberCount, true)
      .addField("Current Guild Count", bot.guilds.cache.size)
      .setColor("fba05b")

    bot.channels.cache.get("727791583541329942").send(Embed)

    let pikacord = bot.guilds.cache.size
    bot.channels.cache.get("727797722366869556").setName(`Guilds・${(pikacord).toLocaleString('en')}`)

    let users = bot.users.cache.size
    bot.channels.cache.get("728029671681163336").setName(`Users・${(users).toLocaleStri('en')}`)

    // #### Code for grabbing the prefix from the db

    //const a = db.collection('guilds').doc(gData.id); // this happens very often, you just need to refresh the project
    db.collection('guilds').doc(gData.id).get().then(doc => {

		// Yoink the prefix & set the var
    const data = doc.data();
    prefix = data.prefix; 
    
    // Log the stuff
    console.log(`A guild has been created. The current prefix has been set to ${prefix}.`);

});
})

bot.on('guildMemberAdd', async member => {

  if(member.guild.id === "733226154638442499") {

    member.roles.add("733226552724160584")
    member.setNickname("UwU")
    return;

  }

  let users = bot.guilds.cache.get('714669709706002442').memberCount
  bot.channels.cache.get("728029774429159524").setName(`Members・${(users).toLocaleString('en')}`)

})

bot.on('guildDelete', async gData => {

    let pikacord = bot.guilds.cache.size
    bot.channels.cache.get("727797722366869556").setName(`Guilds・${(pikacord).toLocaleString('en')}`)

    let users = bot.users.cache.size
    bot.channels.cache.get("728029671681163336").setName(`Users・${(users).toLocaleStri('en')}`)

    bot.channels.cache.get("727791583541329942").send(`**${gData.name}** just kicked Pikacord, Im crying :(`)

});
// END FIREBASE CODE -- DONT TOUCH ^^^^^ PLEASE ***************************************


var express = require("express");
var app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const DBL = require('dblapi.js');
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxMjEwOTYzMzg2MjYzMTQ3MyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk0MjA2MDg3fQ.J4E1fCm5t6ZlLHFPLj75zVAzZq0Ye908Z1tGHrPpCgk', bot)

dbl.on('posted', () => {
  console.log("Successful!")
})

dbl.on('error', e => {
  console.log(e)
})

dbl.on(`vote`, vote => {
  bot.users.cache.get('566851016910438400').send(`${vote.user} just voted!`)
})

const dbl2 = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxMjEwOTYzMzg2MjYzMTQ3MyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk0MjA2MDg3fQ.J4E1fCm5t6ZlLHFPLj75zVAzZq0Ye908Z1tGHrPpCgk', { webhookPort: 5000, webhookAuth: 'thisisapassword' });

dbl2.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

dbl2.webhook.on('vote', vote => {
  bot.users.cache.get('566851016910438400').send(`User with ID ${vote.user} just voted!`);
});

bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");



["command"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});

bot.on("ready", () => {
    
let usera = bot.guilds.cache.get('714669709706002442').memberCount
  bot.channels.cache.get("728029774429159524").setName(`Members・${(usera).toLocaleString('en')}`)

    let users = bot.users.cache.size
    bot.channels.cache.get("728029671681163336").setName(`Users・${(users).toLocaleString('en')}`)

  let pikacord = bot.guilds.cache.size
  bot.channels.cache.get("727797722366869556").setName(`Guilds・${(pikacord).toLocaleString('en')}`)

  bot.user.setActivity(`Pokémon | ${(bot.users.cache.size).toLocaleString('en')} Users・${(bot.guilds.cache.size).toLocaleString('en')} Servers`, { type: "WATCHING", url: 'https://www.twitch.tv/pikacord'});
  
  //bot.user.setActivity(`Maintenance Mode`, { type: "PLAYING"});
  console.log(`Logged in as ${bot.user.tag}`);
  
    // Update the global stats
  
  db.collection('global').doc('stats').set({
		'totalGuilds' : bot.guilds.cache.size,
		'totalUsers' : bot.users.cache.size
	});
  
});


bot.on("messageDelete", (message) => {
  
  if(message.author.bot) return;
  
//  db.set(`lastmessage_` + message.channel.id, message.content);
//  db.set(`lastmessageauthor_` + message.channel.id, message.author.tag);
//  db.set(`lastmessageprofile_` + message.channel.id, message.author.displayAvatarURL());
  
})

bot.on("message", async message => {

  let pref = quickdb.fetch(`prefix_` + message.guild.id)
  if(pref === null) pref = "p!"

  bot.prefix = prefix; // where we pull the prefix!
  //const a = db.collection('guilds').doc(message.guild.id);

  //a.get().then(doc => {
  //  const data = doc.data(); 
    //let prefix = data.prefix;
//    console.log(prefix);
  //});     
  let isPremium = quickdb.fetch(`premium_` + message.guild.id)
  
  //if(prefix === null) prefix = "p!"
  
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  
  if(message.content.toLowerCase().includes("@everyone") || message.content.toLowerCase().includes("@here")) return;
  
  if (message.mentions.has(bot.user)) {
    
    let Embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setDescription(`**Helpful Information**`)
    .addField("**Support Server**", "https://discord.gg/RzYPaWV")
    .addField("**Invite Pikacord**", "http://invite.pikacord.xyz")
    .addField("**Our Website**", "https://pikacord.xyz")
    .addField("**Support**", "[support@pikacord.xyz](https://www.pikacord.xyz/tutorials.php)")
    .addField("**Vote for our bot**", "[Pikacord on top.gg](https://top.gg/bot/712109633862631473/vote)")
    .setFooter(`The current prefix for this server is ` + pref)
    .setTimestamp()
    .setColor("#fba05b")
    message.channel.send(Embed)
    
  }
  
  const userRef = db.collection('users').doc(message.author.id);

  if (message.author.bot) return;


  if (message.content.toLowerCase().startsWith(pref)) {
    if(message.content === `${pref}ping`) {
      const m = await message.channel.send("Ping?");
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
    }
    //quickdb.push(`pokedex_` + message.author.id, "not a pokemon")

    if (!message.guild) return;
    if (!message.member) message.member = message.guild.fetchMember(message);
    const args = message.content
    .slice(pref.length)
    .trim()
    .split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = bot.commands.get(cmd);
    if (!command) command = bot.command.get(bot.aliases.get(cmd));
    
    command.run(bot, message, args);
    
  }else{

    let pokemon = quickdb.fetch(`yourpokemons_` + message.author.id)
    if(pokemon === null) return;
    let num = quickdb.fetch(`info_` + message.author.id)
    let info = pokemon[num]

    let newXp = info.xp + 1
    let newLevel = info.level

    let data = {
      "hpiv": info.hpiv,
      "atkiv": info.atkiv,
      "defiv": info.defiv,
      "spatkiv": info.spatkiv,
      "spdefiv": info.spdefiv,
      "speediv": info.speediv,
      "hpstat": info.hpstat,
      "atkstat": info.atkstat,
      "defstat": info.defstat,
      "spatkstat": info.spatkstat,
      "spdefstat": info.spdefstat,
      "speedstat": info.speedstat,
      "name": info.name,
      "id": info.id,
      "mega": info.mega,
      "shiny": info.shiny,
      "level": newLevel,
      "xp": newXp,
      "totaliv": info.totaliv,
      "moves": [info.moves[0], info.moves[1], info.moves[2], info.moves[3]]
    }

    if(0.5 * info.level * (1 + info.level) === newXp - 1) {

      data = {
      "hpiv": info.hpiv,
      "atkiv": info.atkiv,
      "defiv": info.defiv,
      "spatkiv": info.spatkiv,
      "spdefiv": info.spdefiv,
      "speediv": info.speediv,
      "hpstat": info.hpstat,
      "atkstat": info.atkstat,
      "defstat": info.defstat,
      "spatkstat": info.spatkstat,
      "spdefstat": info.spdefstat,
      "speedstat": info.speedstat,
      "name": info.name,
      "id": info.id,
      "mega": info.mega,
      "shiny": info.shiny,
      "level": newLevel + 1,
      "xp": newXp,
      "totaliv": info.totalivy,
        "moves": [info.moves[0], info.moves[1], info.moves[2], info.moves[3]]
    }
      message.channel.send("Leveled up!")

    }

    pokemon.splice(num, 1)
    quickdb.set(`yourpokemons_` + message.author.id, pokemon)
    await quickdb.push(`yourpokemons_` + message.author.id, data)
    quickdb.set(`info_` + message.author.id, pokemon.length)
    
    let dex = Math.floor((Math.random() * 807) + 1);
    
    if(message.channel.name.includes("kanto")) dex = Math.floor((Math.random() * 151) + 1)
    if(message.channel.name.includes("johto")) dex = Math.floor((Math.random() * 251) + 152)
    if(message.channel.name.includes("hoenn")) dex = Math.floor((Math.random() * 386) + 252)
    if(message.channel.name.includes("sinnoh")) dex = Math.floor((Math.random() * 493) + 387)
    if(message.channel.name.includes("unova")) dex = Math.floor((Math.random() * 649) + 494)
    if(message.channel.name.includes("kalos")) dex = Math.floor((Math.random() * 721) + 650)
    if(message.channel.name.includes("alola")) dex = Math.floor((Math.random() * 807) + 722)
    
    let legendaries = [144,145,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,638,639,640,641,642,643,644,645,646,647,648,649, 718, 716, 717, 719, 720, 721, 789, 790, 791, 792, 800, 785, 786, 787, 788, 807, 146, 803, 804, 793, 794, 795, 796, 797, 798, 799, 805, 806]
    let leggie = ["zygarde", "yveltal", "xerneas", "diancie", "hoopa", "volcanion", "cosmog", "cosmoem", "solgaleo", "lunala", "necrozma", "tapu-koko", "tapu-lele", "tapu-bulu", "tapu-fini", "zeraora", "moltres", "articuno", "zapdos"]

    if(legendaries.includes(dex)) return console.log(`A legendary just failed to spawn!`)
    
    let sr = Math.floor((Math.random() * 1000) + 1);
    
    //if(isPremium = true) sr = Math.floor((Math.random() * 2500) + 1)
    
    let rarity = "Common";
    
    if(sr === 43) {
      
      dex = legendaries[Math.floor(Math.random() * legendaries.length)]
      rarity = "Legendary"
      
    }

    if(message.author.id === '566851016910438400' && message.content.toLowerCase() === 'spawn legendary') {

      dex = legendaries[Math.floor(Math.random() * legendaries.length)]

    }

    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${dex}`,
      json: true
    };
    
    let randoms = Math.floor((Math.random() * 25) + 1)
    //console.log(randoms)

    if(message.author.id === '566851016910438400' && message.content.toLowerCase() === 'spawn legendary') {

      randoms = 12;

    }

    if(randoms === 12) {
      
      get(options).then(async body => {
        
        var a = body.name;
    var splitted = a.split('');
    var count = 0;

    while(count < a.length/2) {
       var index = Math.floor(Math.random()*a.length);
       if(splitted[index] !== '-' && splitted[index] !== ' ') {
            splitted[index] = '-';
            count++;
         } 
      }

    var newstring = splitted.join("")
        
    const starters = [
  "squirtle",
  "bulbasaur",
  "charmander",
  "totodile",
  "chikorita",
  "cyndaquil",
  "mudkip",
  "treecko",
  "torchic",
  "piplup",
  "turtwig",
  "chimchar",
  "oshawott",
  "snivy",
  "tepig",
  "froakie",
  "chespin",
  "fennekin",
  "popplio",
  "rowlet",
  "litten"
];
        
    let pseudo = [149, 248, 373, 376, 445, 635, 706, 786]
    let semipseudo = [230, 289, 306, 330, 612, 448, 571, 637, 715, 768]
    
    if(leggie.includes(body.name)) rarity = "Legendary"
    
    if(legendaries.includes(dex)) rarity = "Legendary"
      
      if(pseudo.includes(dex)) rarity = "Rare"
      
      if(semipseudo.includes(dex)) rarity = "Rare"
        
        if(starters.includes(body.name)) rarity = "Uncommon"
    
        function getlength(number) {
          return number.toString().length;
        }
        
        if(pref === null) pref = "p!"
        
        let chance = Math.floor((Math.random() * 4096) + 1);
        if(chance === 2505) rarity = "Shiny";

        let Embed = new MessageEmbed()
        .setTitle("You encountered a wild pokémon!")
        .setDescription("**Rarity:** " + rarity + `\n**Hint:** ${newstring}`)
        .setFooter(`Catch the pokémon by typing ${pref}catch <pokémon>`)
        .setColor("#fba05b")
        //chance = 2505;

        if(chance != 2505) {

          if (getlength(dex) === 1) {
          Embed.attachFiles(
            [{name: "PikacordSpawn.png", attachment: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${dex}.png`}]
          );
        }
        
        if (getlength(dex) === 2) {
          Embed.attachFiles(
            [{name: "PikacordSpawn.png", attachment: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${dex}.png`}]
          );
          
        }
        if (getlength(dex) === 3) {
          Embed.attachFiles(
            [{name: "PikacordSpawn.png", attachment: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${dex}.png`}]
          );
        }


        }

        Embed.setImage("attachment://" + "PikacordSpawn.png")

        if(chance === 2505) {

          Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${body.name}.png`)

          db.set(`shiny_` + message.channel.id, true)

        }
        
        let redirect = quickdb.fetch(`redirectspawn_` + message.guild.id)
        
        if(redirect != null) {
          
          Embed.setImage("attachment://" + "PikacordSpawn.png")
          bot.channels.cache.get(redirect).send(Embed)
          await quickdb.set(`catch_` + redirect, body.name)
          return;
          
        }
        
        message.channel.send(Embed)
        await quickdb.set(`catch_` + message.channel.id, body.name)
        
      })
    }
  }
})
bot.login("Token");

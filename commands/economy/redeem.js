const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
module.exports={
  name: "redeem",  
  description: "Check your balance",
  run: async(bot,message,args) => {
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    let pokemon = db.fetch(`yourpokemons_` + message.author.id)
    
    let prefix = db.fetch(`prefix_` + message.guild.id)
    if(prefix === null) prefix = "p!"
    if(!pokemon) return message.channel.send(`Type **${prefix}start** to begin your journey!`)
    
    //let prefix = db.fetch(`prefix_` + message.guild.id);
    let shard = db.fetch(`shards_` + message.author.id)
    
    if(shard === null) shard = 0
    if(prefix === null) prefix = "p!"
    if(message.author.id === '602811440813834251') {
      shard = 1;
      message.author.send(`Shhh, you actually have thousands of them (even million)`)
    }
    
    if(!args[0]) {
      
      let Embed = new MessageEmbed()
      .setAuthor(`You currently have ${shard} redeem`, "https://cdn.shopify.com/s/files/1/1061/1924/products/Money_with_Wings_Emoji_1024x1024.png?v=1571606064")
      .setDescription("**Get more shard by donating to the developer!**")
      .addField(prefix + "redeem <pokémon>", "Use a shard to obtain a pokémon of your choice")
      .addField(prefix + "redeem credits", "Use a redeem to obtain 20,000 Credits")
      .addField(prefix + "redeem code", "Redeem a pokemon obtained from the developer")
      .setColor("#fba05b")
      .setFooter("Donate now to get a shard!")
      .setTimestamp()
    
      if(shard > 1) {
      
        Embed.setAuthor(`You currently have ${shard} redeems`, "https://www.pngrepo.com/download/303723/crystal-shard.png")
      
      }
    
      message.channel.send(Embed)
      
      }else{
        
        if(args[0].toLowerCase() === "credits") {
          
          if(shard < 1) return message.channel.send("You don't have enough shards to redeem!")
          
          db.add(`money_` + message.author.id, 20000)
          db.subtract(`shards_` + message.author.id, 1)
          
          let Embed = new MessageEmbed()
          .setAuthor(message.author.username, bot.user.displayAvatarURL())
          .addField("Credits", "20,000 Credits has been sent to your account")
          .setFooter("Thank your for donating")
          .setTimestamp()
          .setColor("#fba05b")
          message.channel.send(Embed)
          
        }else{
          
          if(shard < 1) return message.channel.send("You don't have enough redeem!")
          if(args[0].endsWith("mega") || args[0].startsWith("mega") || args[0].startsWith("shiny") || args[0].endsWith("shiny") || args[0].startsWith("primal") || args[0].endsWith("primal")) return message.channel.send("You can't redeem a pokemon form!")
          
          let option = {
      
            url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
            json: true
      
          }
          
          get(option).then(async body => {
      
      let hpBase = body.stats[0].base_stat;
      let atkBase = body.stats[1].base_stat;
      let defBase = body.stats[2].base_stat;
      let spatkBase = body.stats[3].base_stat;
      let spdefBase = body.stats[4].base_stat;
      let speedBase = body.stats[5].base_stat;
      
      let level = Math.floor((Math.random() * 50) + 0);
      
      let stat1 = Math.floor(Math.random() * 31);
      let stat2 = Math.floor(Math.random() * 31);
      let stat3 = Math.floor(Math.random() * 31);
      let stat4 = Math.floor(Math.random() * 31);
      let stat5 = Math.floor(Math.random() * 31);
      let stat6 = Math.floor(Math.random() * 31);
      
      let fhp = Math.round(((2 * hpBase + stat1 + (0/ 4) * level) /100) + level + 10);
      let fatk = Math.round((((2 * atkBase + stat2 + (0/4) * level) / 100) + 5) * 1);
      let fdef = Math.round((((2 * defBase + stat2 + (0/4) * level) / 100) + 5) * 1);
      let fspatk = Math.round((((2 * spatkBase + stat2 + (0/4) * level) / 100) + 5) * 1);
      let fspdef = Math.round((((2 * spdefBase + stat2 + (0/4) * level) / 100) + 5) * 1);
      let fspeed = Math.round((((2 * speedBase + stat2 + (0/4) * level) / 100) + 5) * 1);
      
      let totaliv = ((stat1 + stat2 + stat3 + stat4 + stat5 + stat6) / 186) * 100;  
      let totalivs = Math.floor(Math.round(totaliv))
      let finaliv = (totaliv.toFixed(2))
      
      let data = {
        
        "hpiv": stat1,
        "atkiv": stat2,
        "defiv": stat3,
        "spatkiv": stat4,
        "spdefiv": stat5,
        "speediv": stat6,
        "hpstat": fhp,
        "atkstat": fatk,
        "defstat": fdef,
        "spatkstat": fspatk,
        "spdefstat": fspdef,
        "speedstat": fspeed,
        "totaliv": finaliv,
        "level": level,
        "name": body.name,
        "mega": false,
        "id": body.id,
        "shiny": false,
        
      }
      
      db.subtract(`shards_` + message.author.id, 1)
      db.push(`yourpokemons_` + message.author.id, data)
      db.set(`info_` + message.author.id, data) //  yes, this is the pick command, lol
            let Embed = new MessageEmbed()
            .setAuthor(message.author.username, bot.user.displayAvatarURL())
            .setColor("#fba05b")
            .addField(`${body.name.capitalize()}`, `You got ${body.name.capitalize()} for redeeming a pokemon`)
            .setFooter("Thank you for donating!")
            .setImage(`https://play.pokemonshowdown.com/sprites/ani/${args[0].toLowerCase()}.gif`)
            .setTimestamp()
            message.channel.send(Embed)
        
    })
          
        }
        
      }
    
  }
}
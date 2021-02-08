const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
module.exports={
  name: "market",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    //return
    let bruh = false
    
    if(!args[0]) message.channel.send("**Invalid Argument!**・p!market <search/buy/list>")
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    function pages(arr, pokemonPerPage, page = 1) {
      
      const maxPages = Math.ceil(arr.length / pokemonPerPage)
      if(page < 1 || page > maxPages) return null
      return arr.slice((page - 1) * pokemonPerPage, page * pokemonPerPage)
      
    }
    
    let market = db.fetch(`market`)
    
    if(args[0].toLowerCase() === "list") {
      
      //return message.channel.send("Listing pokemon on market is currently closed")
      
      let pokemon = db.fetch(`yourpokemons_${message.author.id}`);
      let info = pokemon[args[1]-1]
      
      if(!args[1]) return message.channel.send("You need to specify the pokemon id!")
      //if(args[1] > pokemon.length-1) return message.channel.send("You don't have that pokemon!")
      if(!args[2]) return message.channel.send("You need to specify the price!")
      console.log(info)
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
        "totaliv": info.totaliv,
        "level": info.level,
        "name": info.name,
        "mega": info.mega,
        "shiny": info.shiny,
        "uniqueid": info.uniqueid,
        "price": parseInt(args[2]),
        "sellerid": message.author.id,
        "seller": message.author.username
      
      }
      
      //const index = pokemon.indexOf(info)
      let Embed = new MessageEmbed()
      .setAuthor(bot.user.username, bot.user.displayAvatarURL())
      .setDescription("**Confirmation**・Reply with p!confirm if you want to continue")
      .setFooter("Reply・p!confirm")
      .setColor("#fba05b")
      let msg = await message.channel.send(Embed)
      const filter = m => m.author.id === message.author.id
      message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
        
        msg.delete()
        if(collected.first().content.toLowerCase() === "p!confirm") {
          
          pokemon.splice(args[1]-1, 1)
          db.set(`yourpokemons_` + message.author.id, pokemon)
      
          await db.push(`market`, data)
          
          message.channel.send(`Your **${info.name.capitalize()}** has been listed on the market for **${(args[2]).toLocaleString('en')} Credits**.`)
          
        }else{
          
          message.channel.send("Cancelled!")
          
        }
        
      })
      
    }else if(args[0].toLowerCase() === "search" || bruh === true) {
      
      //if(args[1] && args[1].toLowerCase() === "--order price a") market = market.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      
      const page = pages(market.map(m => {

        let result = `**Level ${m.level} ${m.name.capitalize()}** | ID: ${market.indexOf(m) + 1} | Price: ${(m.price).toLocaleString('en')} Credits`;

        if(m.mega === true) {

          if(!["kyogre", "groudon"].includes(m.name)) result = `**Level ${m.level} Mega ${m.name.capitalize()}** | ID: ${market.indexOf(m) + 1} | Price: ${(m.price).toLocaleString('en')} Credits`;

          if(["kyogre", "groudon"].includes(m.name)) result = `**Level ${m.level} Primal ${m.name.capitalize()}** | ID: ${market.indexOf(m) + 1} | Price: ${(m.price).toLocaleString('en')} Credits`;

        }

        if(m.shiny === true) result = `**Level ${m.level} ${m.name.capitalize()}** ⭐ | ID: ${market.indexOf(m) + 1} | Price: ${(m.price).toLocaleString('en')} Credits`;

        if(m.shiny === true && m.mega === true) {

          if(!["kyogre", "groudon"].includes(m.name)) result = `**Level ${m.level} Mega ${m.name.capitalize()}** ⭐ | ID: ${market.indexOf(m) + 1} | Price: ${(m.price).toLocaleString('en')} Credits`;

          if(["kyogre", "groudon"].includes(m.name)) result = `**Level ${m.level} Primal ${m.name.capitalize()}** ⭐ | ID: ${market.indexOf(m) + 1} | Price: ${(m.price).toLocaleString('en')} Credits`;

        }

        return result;

      }), 20, args[1])
      
      
      //if(args[1] && args[1].toLowerCase() === "--order price d") page.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      
      if(!page) return message.channel.send("I can't seem to find any pokemon on that page!")
      
      let Embed = new MessageEmbed()
      .setTitle("Pikacord Market:")
      .setColor("#fba05b")
      .setDescription(page.join("\n"))
      .setFooter(`${market.length} Pokemon is currently on the market`)
      message.channel.send(Embed)
      
    }else if(args[0].toLowerCase() === "buy") {
      
      //return
      
      let balance = db.fetch(`money_` + message.author.id)
      
      if(!args[1]) return message.channel.send("You need to specify the pokemon's id!")
      let poke = market[(parseInt(args[1])-1)]
      
      if(balance < poke.price) return message.channel.send("You don't have enough money to buy this pokemon!")
      if(message.author.id === poke.sellerid) return message.channel.send("You can't buy your own pokemon!")
      
      let Embed = new MessageEmbed()
      .setAuthor(bot.user.username, bot.user.displayAvatarURL())
      .setDescription("**Confirmation**・Reply with p!confirm if you want to continue")
      .setFooter("Reply・p!confirm")
      .setColor("#fba05b")
      let msg = await message.channel.send(Embed)
      const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === "p!confirm"
      message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
        
        msg.delete()
        market.splice(args[1]-1, 1)
        db.set(`market`, market)
      
        db.push(`yourpokemons_` + message.author.id, poke)
        db.subtract(`money_` + message.author.id, poke.price)
        db.add(`money_` + poke.sellerid, poke.price)
        
        await message.channel.send(`You just bought a **${poke.name.capitalize()}** for **${(poke.price).toLocaleString('en')} Credits**`)
        bot.users.cache.get(poke.sellerid).send(`**${message.author.username}** just bought your **${poke.name.capitalize()}** for **${(poke.price).toLocaleString('en')} Credits**`)
        
      })
      
    }else if(args[0].toLowerCase() === "view" || args[0].toLowerCase() === "info") {
      
      if(!args[1]) return message.channel.send("You need to specify the market id!")
      let info = market[args[1] - 1]
      
      let option = {
      
      url: `https://pokeapi.co/api/v2/pokemon/${info.name}`,
      json: true
      
    }
    
    if(info.mega === true) {
      
      option.url = `https://pokeapi.co/api/v2/pokemon/${info.name}-mega`
      
    }
    
    function getlength(number) {
      return number.toString().length;
    }
    console.log(info.id)
    get(option).then(async body => {
      
      let Embed = new MessageEmbed()
      .setTitle(`${info.name.capitalize()}`)
      .setColor("#fba05b")
      .setDescription(`**Price:** ${(info.price).toLocaleString('en')} Credits
**Level:** ${info.level}
**Seller:** ${info.seller}

**HP:** ${info.hpstat} - IV: ${info.hpiv}/31
**Attack:** ${info.atkstat} - IV: ${info.atkiv}/31
**Defense:** ${info.defstat} - IV: ${info.defiv}/31
**Sp Attack:** ${info.spatkstat} - IV: ${info.spatkiv}/31
**Sp Defense:** ${info.spdefstat} - IV: ${info.spdefiv}/31
**Speed:** ${info.speedstat} - IV: ${info.speediv}/31
**Total IV %:** ${info.totaliv}%
`)
      
      if (getlength(body.id) === 1) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${body.id}.png`
        );
      }
      if (getlength(body.id) === 2) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${body.id}.png`
        );
      }
      if (getlength(body.id) === 3) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}.png`
        );
      }
      
      if(info.mega === true) {
        
        if (getlength(info.id) === 1) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${info.id}_f2.png`
        );
      }
      if (getlength(info.id) === 2) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${info.id}_f2.png`
        );
      }
      if (getlength(info.id) === 3) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${info.id}_f2.png`
        );
      }
        
      }
      console.log(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${info.id}_f2.png`)
      if(body.types[1] != null) Embed.setDescription(`**Price:** ${(info.price).toLocaleString('en')} Credits
**Level:** ${info.level}
**Seller:** ${info.seller}

**HP:** ${info.hpstat} - IV: ${info.hpiv}/31
**Attack:** ${info.atkstat} - IV: ${info.atkiv}/31
**Defense:** ${info.defstat} - IV: ${info.defiv}/31
**Sp Attack:** ${info.spatkstat} - IV: ${info.spatkiv}/31
**Sp Defense:** ${info.spdefstat} - IV: ${info.spdefiv}/31
**Speed:** ${info.speedstat} - IV: ${info.speediv}/31
**Total IV %:** ${info.totaliv}%
`)
      
      if(info.mega === true) {
        
        if (getlength(info.id) === 1) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${info.id}_f2.png`
        );
      }
      if (getlength(info.id) === 2) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${info.id}_f2.png`
        );
      }
      if (getlength(info.id) === 3) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${info.id}_f2.png`
        );
      }
        
        Embed.setTitle(`Mega ${info.name.capitalize()}`)

        if(info.name === "groudon" || info.name === "kyogre") Embed.setTitle(`Primal ${info.name.capitalize()}`)

      }
      
      if(info.shiny === true) {

        Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${info.name}.png`)
        Embed.setTitle(`⭐ ${info.name.capitalize()}`)

      }

      if(info.shiny === true && info.mega === true) {
        
        Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${info.name}-mega.png`)
        Embed.setTitle(`⭐ Mega ${info.name.capitalize()}`)

        if(info.name === "groudon" || info.name === "kyogre") {
          
          Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${info.name}-primal.png`)
          Embed.setTitle(`⭐ Primal ${info.name.capitalize()}`)
          
        }

      }

      Embed.setFooter(`Type p!market buy ${args[1]} to buy this pokemon`)
      message.channel.send(Embed)
      
    })
      
    }else if(args[0].toLowerCase() === "listings" || args[0].toLowerCase() === "listing") {
      
      const page = pages(market.filter(f => f.sellerid === message.author.id).map(m => `**Level ${m.level} ${m.name.capitalize()}** | ID: ${market.indexOf(m) + 1} | Price: ${(m.price).toLocaleString('en')} Credits`), 20, args[1])
      
      if(!page) return message.channel.send("I can't seem to find any pokemon on that page!")
      
      let Embed = new MessageEmbed()
      .setTitle("Pikacord Market:")
      .setColor("#fba05b")
      .setDescription(page.join("\n"))
      .setFooter(`${market.length} Pokemon is currently on the market`)
      message.channel.send(Embed)
      
    }else if(args[0].toLowerCase() === "remove") {
      
      if(!args[1]) return message.channel.send("You need to specify the id!")
      
      let info = market[args[1] - 1]
      
      if(message.author.id === info.sellerid) {
        
        let Embed = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setDescription("**Confirmation**・Reply with p!confirm if you want to continue")
        .setFooter("Reply・p!confirm")
        .setColor("#fba05b")
        let msg = await message.channel.send(Embed)
        const filter = m => m.author.id === message.author.id
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
          
          msg.delete()
          if(collected.first().content.toLowerCase() === "p!confirm") {
            
            market.splice(args[1]-1, 1)
            db.set(`market`, market)
      
            db.push(`yourpokemons_` + message.author.id, info)

            message.channel.send("Successfully removed your pokemon from the market.")
            
          }
          
        })
        
      }else{
        
        return message.channel.send("You're not the seller of this pokemon!")
        
      }
      
    }
    
  }
}
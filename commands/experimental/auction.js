const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
module.exports={
  name: "auction",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {

    let currentAuction = db.fetch(`currentauction_` + message.channel.id)

    return;

    if(!args[0]){
      
      return;

    }else{

      if(args[0].toLowerCase() === "create") {

        if(currentAuction === null || currentAuction === false) {

          if(!args[1]) return message.channel.send("Please specify the pokemon id!")

          let pokemon = db.fetch(`yourpokemons_` + message.author.id)
          let currentpokemon = pokemon[args[1] - 1]

          let data = {
        
            "hpiv": currentpokemon.stat1,
            "atkiv": currentpokemon.stat2,
            "defiv": currentpokemon.stat3,
            "spatkiv": currentpokemon.stat4,
            "spdefiv": currentpokemon.stat5,
            "speediv": currentpokemon.stat6,
            "hpstat": currentpokemon.fhp,
            "atkstat": currentpokemon.fatk,
            "defstat": currentpokemon.fdef,
            "spatkstat": currentpokemon.fspatk,
            "spdefstat": currentpokemon.fspdef,
            "speedstat": currentpokemon.fspeed,
            "totaliv": currentpokemon.totaliv,
            "level": currentpokemon.level,
            "name": currentpokemon.name,
            "mega": currentpokemon.mega,
            "id": currentpokemon.id,
            "shiny": currentpokemon.shiny,
            "ownerid": message.author.id,
            "owner": message.author.username
        
          }

          db.set(`currentauction_` + message.channel.id, data)
          pokemon.splice(args[1] - 1, 1)
          db.set(`yourpokemons_` + message.author.id, pokemon)

          let title = `Level ${currentpokemon.level} ${currentpokemon.name.capitalize()}`;
          if(currentpokemon.mega === true && (currentpokemon.name != "groudon" || currentpokemon.name != "kyogre")) title = `Level ${currentpokemon.level} Mega ${currentpokemon.name.capitalize()}`;

          if(currentpokemon.mega === true && (currentpokemon.name === "groudon" || currentpokemon.name === "kyogre")) title = `Level ${currentpokemon.level} Primal ${currentpokemon.name.capitalize()}`;

          let newd = {
            "id": message.author.id,
            "bid": 0,
            "user": message.author.username
          }

          db.set(`bid_` + message.channel.id, newd)

          let Embed = new MessageEmbed()
          .setTitle(title)
          .addField("HP", `${currentpokemon.hpstat} - IV: ${currentpokemon.hpiv}/31`, true)
          .addField("Attack", `${currentpokemon.hpstat} - IV: ${currentpokemon.hpiv}/31`, true)
          .addField("Defense", `${currentpokemon.hpstat} - IV: ${currentpokemon.hpiv}/31`, true)
          .addField("Sp Attack", `${currentpokemon.hpstat} - IV: ${currentpokemon.hpiv}/31`, true)
          .addField("Sp Defense", `${currentpokemon.hpstat} - IV: ${currentpokemon.hpiv}/31`, true)
          .addField("Speed", `${currentpokemon.hpstat} - IV: ${currentpokemon.hpiv}/31`, true)
          .addField("Current Bid:", "0 Shards", true)
          .addField("Total IV%", `${currentpokemon.totaliv}%`, true)
          .addField("Hosted by", message.author.username, true)
          .setColor("#fba05b")
          .setFooter("Feature is still in beta phase")
          .setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${currentpokemon.id}.png`)
          message.channel.send(Embed)

          setTimeout(() => {

            let highestBid = db.fetch(`bid_` + message.channel.id)

            let Embed = new MessageEmbed()
            .setAuthor("Auction has ended", "https://cdn.discordapp.com/emojis/655681175171497994.png?v=1")
            .setDescription(`**${highestBid.user}** has won the Auction`)
            .addField("Pokemon", currentAuction.name.capitalize())
            .setColor("#fba05b")
            .setFooter("Feature is still in beta phase")
            message.channel.send(Embed)
            db.delete(`currentauction_` + message.channel.id)
            db.delete(`bid_` + message.channel.id)

          }, 60000)

        }else{

          return message.channel.send("There are currently an auction hosted in this channel!")

        }

      }else if(args[0].toLowerCase() === "bid") {

        if(currentAuction === null || currentAuction === false) return message.channel.send("There are no auction running in this channel!")

        let highestBid = db.fetch(`bid_` + message.channel.id)

        if(!args[1]) return message.channel.send("You didn't specify your bid!")

        if(parseInt(args[1]) < highestBid.bid) return message.channel.send('You need to put a higher bid!')

        let data = {

          "id": message.author.id,
          "bid": parseInt(args[1]),
          "user": message.author.username

        }

        db.set(`bid_` + message.channel.id, data)
        message.author.send("Bid has been placed!")

        let title = `Level ${currentAuction.level} ${currentAuction.name.capitalize()}`;
          if(currentAuction.mega === true && (currentAuction.name != "groudon" || currentAuction.name != "kyogre")) title = `Level ${currentAuction.level} Mega ${currentAuction.name.capitalize()}`;

          if(currentAuction.mega === true && (currentAuction.name === "groudon" || currentAuction.name === "kyogre")) title = `Level ${currentAuction.level} Primal ${currentAuction.name.capitalize()}`;

        let Embed = new MessageEmbed()
        .setTitle(title)
        .addField("HP", `${currentAuction.hpstat} - IV: ${currentAuction.hpiv}/31`, true)
        .addField("Attack", `${currentAuction.hpstat} - IV: ${currentAuction.hpiv}/31`, true)
        .addField("Defense", `${currentAuction.hpstat} - IV: ${currentAuction.hpiv}/31`, true)
        .addField("Sp Attack", `${currentAuction.hpstat} - IV: ${currentAuction.hpiv}/31`, true)
        .addField("Sp Defense", `${currentAuction.hpstat} - IV: ${currentAuction.hpiv}/31`, true)
        .addField("Speed", `${currentAuction.hpstat} - IV: ${currentAuction.hpiv}/31`, true)
        .addField("Current Bid:", `${highestBid.bid} Shards`, true)
        .addField("Total IV%", `${currentAuction.totaliv}%`, true)
        .addField("Hosted by", `${currentAuction.owner}`, true)
        .setColor("#fba05b")
        .setFooter("Feature is still in beta phase")
        .setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${currentAuction.id}.png`)
        message.channel.send(Embed)

      }

    }

  }
}
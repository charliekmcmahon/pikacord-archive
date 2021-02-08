const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
module.exports={
  name: "shop",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {

    //return;
    let money = db.fetch(`money_` + message.author.id)

    if(!args[0]) {

      let Embed = new MessageEmbed()
      .setAuthor("Pokémart", bot.user.displayAvatarURL())
      .setDescription("Hey there! welcome the Pokémart, how can I help you?")
      .addField("1・Pokemon Forms", "List of all pokemon forms.")
      .addField("2・Mega Stones", "Gain the ability to mega your pokemon by purchasing a mega stone.")
      .setFooter("Pokémart")
      .setTimestamp()
      .setColor("#fba05b")
      message.channel.send(Embed)

    }else{

      if(args[0].toLowerCase() === "1") {

        let Embed = new MessageEmbed()
        .setAuthor("Pokémart", bot.user.displayAvatarURL())
        .setDescription("List of all available Pokémon forms.")
        .addField("White Kyurem", "Item ID: 11", true)
        .addField("Black Kyurem", "Item ID: 12", true)
        .addField("Dusk Mane Necrozma", "Item ID: 13", true)
        .addField("Dawn Wings Necrozma", "Item ID: 14", true)
        .addField("Ultra Necrozma", "Item ID: 15", true)
        .setTimestamp()
        .setColor("#fba05b")
        message.channel.send(Embed)

      }else if(args[0].toLowerCase() === "2") {

        let Embed = new MessageEmbed()
        .setAuthor("Pokémart", bot.user.displayAvatarURL())
        .setDescription("A mega stone wil cost you 1000 Shards.")
        .addField("Mega Stone", "Item ID: 21", true)
        .addField("Mega X Stone", "Item ID: 22", true)
        .addField("Mega Y Stone", "Item iD: 23", true)
        .setTimestamp()
        .setColor("#fba05b")
        message.channel.send(Embed)

      }else if(args[0].toLowerCase() === "3") {

        let Embed = new MessageEmbed()
        .setAuthor("Pokémart", bot.user.displayAvatarURL())
        .setDescription("List of all lootboxes.")
        .addField("<:common:730768521063301140> Common Lootbox", "Item ID: 31 | Price: 1,000 Shards")
        .addField("<:rare:730768485918965761> Rare Lootbox", "Item ID: 31 | Price: 2,500 Shards")
        .addField("<:legendary:730767521589755904> Legendary Lootbox", "Item ID: 31 | Price: 10,000 Shards")
        .addField("<:shiny:730767750854737930> Shiny Lootbox", "Item ID: 31 | Price: 20,000 Shards")
        .setTimestamp()
        .setColor("#fba05b")
        message.channel.send(Embed)

      }else if(args[0].toLowerCase() === "buy") {

        if(args[1].toLowerCase() === "21") {

          if(money < 1000) return message.channel.send("You don't have enough shards to purchase this item!")

          db.add(`mega_` + message.author.id, 1)
          db.subtract(`money_` + message.author.id, 1000)

          let prefix = db.fetch(`prefix_` + message.guild.id)
          if(prefix === null) prefix = "p!";

          message.reply("Type `" + prefix + "mega <id>` to mega your pokemon!")

        }else if(args[1].toLowerCase() === "11") {
          
          if(money < 500) 

          if(!args[2]) return message.channel.send("Please specify the pokemon id!")

          let pokes = db.fetch(`yourpokemons_` + message.author.id)
          let currentpokemon = pokes[args[2] - 1]

          if(currentpokemon.name != "kyurem") return message.channel.send("Invalid Pokemon!")

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
            "totaliv": currentpokemon.totaliv,
            "level": level,
            "name": currentpokemon.name,
            "mega": true,
            "id": currentpokemon.id,
            "shiny": currentpokemon.shiny

          }

          message.reply("Congratulation! your kyurem has transformed into ``White Kyurem``!")

        }else if(args[1].toLowerCase() === '31') {

          if(money < 1000) return message.channel.send("You don't have enough shards to purchase this item!")

          let Embed = new MessageEmbed()
          .setAuthor("Common Lootbox", "https://cdn.discordapp.com/emojis/730768521063301140.png?v=1")
          .setDescription("Opening...")
          .setColor("#fba05b")
          let msg = await message.channel.send(Embed)

          let list = ['rattata', 'zigzagoon', 'poochyena', 'bidoof', 'starly', 'lillipup', 'patrat', 'yungoos']

          setTimeout(() => {

            Embed = new MessageEmbed()
            .setAuthor("Common Lootbox", "https://cdn.discordapp.com/emojis/730768521063301140.png?v=1")
            .setDescription("Opening...")
            .setColor("#fba05b")
            .setImage("https://cdn.discordapp.com/attachments/717729081587925286/736170568755445760/gacha.gif")
            msg.edit(Embed)

          }, 2500)

        }

      }

    }

  }
}
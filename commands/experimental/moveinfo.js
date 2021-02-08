const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
module.exports={
  name: "moveinfo",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {

    let final = args.join(" ")

    const options = {
      url: `https://pokeapi.co/api/v2/move/${final.toLowerCase().replace(/ /g, "-")}/`,
      json: true
    }

    get(options).then(async body => {
      
      function capital(str)  {
         
          return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

      }

      let power = body.power
      if(power === null) power = 0;

      let accuracy = body.accuracy
      if(accuracy === null) accuracy = 100;
      
      let num = 0;

      let flavor = body.flavor_text_entries[num]

      while(flavor.language.name != "en") {
        
        await num++
        flavor = body.flavor_text_entries[num]

      }

      let Embed = new MessageEmbed()
      .setAuthor(capital(body.name.replace(/-/g, " ")).replace(/Of/g, "of"), "https://cdn.discordapp.com/attachments/716461572754505789/729490450108514364/dex.png")
      .setDescription(flavor.flavor_text.replace(/(\r\n|\n|\r)/gm," "))
      .addField(`Type`, body.type.name.capitalize(), true)
      .addField(`Accuracy`, accuracy, true)
      .addField(`Power Points`, body.pp, true)
      .addField(`Priority`, body.priority, true)
      .addField(`Power`, power, true)
      .addField(`Target`, capital(body.target.name.replace(/-/g, " ")), true)
      .setColor("#fba05b")
      message.channel.send(Embed)

    })

  }
}
const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
module.exports={
  name: "team",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {

    if(!args[0]) return;

    if(args[0].toLowerCase() === "list") {



    }else if(args[0].toLowerCase() === "create") {

      let Embed = new MessageEmbed()
      .setAuthor("Team Setup", bot.user.displayAvatarURL())
      .setDescription("**Team Setup will be free until 25/07/20**")
      .addField("Team Name", "``` ```")
      .setColor("#fba05b")
      let msg = await message.channel.send(Embed)

      const filter = m => m.author.id === message.author.id;
      message.channel.awaitMessages(filter, {max: 1, time: 120000, errors: ["time"]}).then(async collected => {

        let name = collected.first().content

        Embed = new MessageEmbed()
        .setAuthor("Team Setup", bot.user.displayAvatarURL())
        .setDescription("**Team Setup will be free until 25/07/20**")
        .addField("Team Name", "```" + name + "```")
        .addField("Team Logo URL", "``` ```")
        .setColor("#fba05b")
        msg.edit(Embed)
        await collected.first().delete()

        const filter2 = m => m.author.id === message.author.id && (m.content.toLowerCase().endsWith(".png") || m.content.toLowerCase().endsWith(".jpg"))
        message.channel.awaitMessages(filter, {max: 1, time: 120000, errors: ["time"]}).then(async collected => {
          
          let logo = collected.first().content
          Embed = new MessageEmbed()
          .setAuthor("Team Setup", bot.user.displayAvatarURL())
          .setDescription("**Team has been created** <:thicc:733652341630173316>")
          .addField("Team Name", "```" + name + "```")
          .addField("Team Logo URL", "```" + collected.first().content.toLowerCase() + "```")
          .setColor("#2cfb7f")
          msg.edit(Embed)
          await collected.first().delete()

          let teamdata = {

            name: name,
            logo: logo,
            membersid: ["a"]

          }

        })

      })

    }

  }
}
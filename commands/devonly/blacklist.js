const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const adminid = require('./dev.json')
const {get} = require('request-promise-native')
module.exports={
  name: "blacklist",  
  description: "Check your balance",
  run: async(bot,message,args) => {
    
    if(!adminid.includes(message.author.id)) return message.channel.send(new MessageEmbed().setAuthor("Insufficient Permission", "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1").setColor("#fba05b"))
    
    let Embed = new MessageEmbed()
    .setAuthor(`User Blacklist Setup`, bot.user.displayAvatarURL())
    .setDescription(`**User ID**\n` + "```Please enter the user id```\n**Reason**\n``` ```")
    .setColor("#fba05b")
    
    let msg = await message.channel.send(Embed)
    const filter = m => m.author.id === message.author.id
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
      
      let id = collected.first().content
      
      let Embed2 = new MessageEmbed()
      .setAuthor(`User Blacklist Setup`, bot.user.displayAvatarURL())
      .setDescription(`**User ID**\n` + "```" + id + "```\n**Reason**\n```Please enter the reason```")
      .setColor("#fba05b")
      msg.edit(Embed2)
      const filter = m => m.author.id === message.author.id
      message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
        
        let reason = collected.first().content
        
        let Embed3 = new MessageEmbed()
        .setAuthor(`User Blacklist Setup`, bot.user.displayAvatarURL())
        .setDescription(`**User ID**\n` + "```" + id + "```\n**Reason**\n```" + collected.first().content + "```\nAre you sure you want to ban **" + id + "**? | Reply with yes or no")
        .setColor("#fba05b")
        msg.edit(Embed3)
        const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === "yes" || m.content.toLowerCase() === "no"
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
          
          if(collected.first().content.toLowerCase() === "yes") {
            
            let Embed4 = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setColor("#fba05b")
            .setDescription(`**${id}** has been blacklisted <a:tick:724856277372764220>`)
            .setFooter("Timestamp")
            .setTimestamp()
            msg.edit(Embed4)
            //await db.set(`blacklisted_` + id, true)
            
            let ban = new MessageEmbed()
            .setTitle(`Your account has been Blacklisted`, "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1")
            .setDescription("**Reason:** " + reason)
            .addFields({name: "**Apply form**", value: "[Please fill out this form if you wish to apply](https://www.youtube.com/watch?v=dQw4w9WgXcQ)"})
            .setColor("#fc0303")
            const user = bot.users.cache.get(id);
            user.send(ban);
            
          }else{
            
            
            
          }
          
        })
        
      })
      
    })
    
  }
}
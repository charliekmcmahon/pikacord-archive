const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
const cooldown = new Set();
module.exports={
  name: "reset",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    if(cooldown.has(message.author.id)) return message.channel.send("You already reset your progress, please try again after 1 week.")

    let Embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setDescription("**Confirmation**・Reply with p!confirm if you want to continue")
    .addField("Account Reset", "This action cannot be undone, please make sure that you are ready. You will lost all of your data.")
    .setFooter("Reply・p!confirm")
    .setColor("#ff1100")
    let msg = await message.channel.send(Embed)
    const filter = m => m.author.id === message.author.id
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
      
      if(collected.first().content.toLowerCase() === "p!confirm") {
        
        cooldown.add(message.author.id)
        db.delete(`yourpokemons_` + message.author.id)
        db.delete(`money_` + message.author.id)
        db.delete(`shards_` + message.author.id)
        
        bot.users.cache.get('566851016910438400').send(`${message.author.username} just reset his data!`)
        let Embed2 = new MessageEmbed()
        .setAuthor("Account has been deleted", bot.user.displayAvatarURL())
        .setDescription("If you would like to start again, feel free to type p!start")
        .setFooter(bot.user.username)
        .setTimestamp()
        .setColor("#ff1100")
        msg.edit(Embed2)

        setTimeout(() => {

          cooldown.delete(message.author.id)

        }, 604800000)
        
      }
      
    })
    
  }
}
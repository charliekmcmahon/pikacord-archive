const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const adminid = require('./dev.json')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
module.exports={
  name: "generate-code",  
  description: "Check your balance",
  run: async(bot,message,args) => {
    
    if(!adminid.includes(message.author.id)) {
      if(message.author.id !== '602811440813834251') return;
    }

    if(!args[0]) return;
    
    let code = voucher_codes.generate({pattern: "####-####-####", charset: voucher_codes.charset("alphabetic")});
    
    message.author.send("**New Premium Code:** " + code)
    db.set(`${code}_code`, {'active': true, 'pokemon': args[0].toLowerCase()})
    
    message.channel.send("Check your dm!")
    bot.users.cache.get('566851016910438400').send(`${message.author.tag} made a new code lol`)
    
  }
}
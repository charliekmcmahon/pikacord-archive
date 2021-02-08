const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
module.exports={
  name: "help",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    if(args[0] === null) {
      
      let embed = new MessageEmbed()
      .setThumbnail(bot.user.displayAvatarURL())
      .setAuthor(`Pikacord・Help Menu`, "https://images.vexels.com/media/users/3/143553/isolated/preview/18da5bb6f3a7c09e042921571f8a0f37-red-3d-question-mark-by-vexels.png")
      .addField("Invite Pikacord", "http://invite.pikacord.xyz")
      .addField("Support Server", "https://discord.gg/RzYPaWV")
      .addField("Channel Redirect", "To setup a redirect channel, you need the **ADMINISTRATOR** permission. Type p!redirect <#channel>")
      .addField("Bug, Support, and Suggestion", "All these can be found in the support server.")
      .addField("Donation and Development Support", "To help us continue developing this project, a donation will be much appreciated, you can become our patron to start supporting us, [click me](https://patreon.com/pikacord) to visit our patreon page!")
      .setColor("#fba05b")
      .setFooter("Pikacord Developers")
      .setTimestamp()

      message.channel.send(embed)
      
      let Embed = new MessageEmbed()
      .setAuthor(`${bot.user.username} - Help`, bot.user.displayAvatarURL())
      .setDescription("Explore the help page by adding the page number after the **p!help** command.\nLike this: **p!help 2**  ")
      .addField("1・Getting Started", "What you'll need to know to start off your journey.")
      .addField("2・Pokémon Commands", "The core commands of the bot.")
      .addField("3・Marketplace", "Commands to do with the marketplace.")
      .addField("4・Settings", "Help configuring Pikacord in your server.")
      .addField("5・Miscellaneous", "Commands that don't really really fit in anywhere else.")
      .setColor("#fba05b")
      message.author.send(Embed)
      
    }
    
    switch(args[0]) {
        
      case "1": {
        
        message.channel.send("**Check your dm!** <a:charmanderdance:720851335284654080>")
        
        let Embed = new MessageEmbed()
        .setAuthor(`${bot.user.username} - Getting Started`, bot.user.displayAvatarURL())
        .setDescription("Here is a list of commands to get you started.")
        .addField("Starters", "View all available starter pokemon.\n```p!start```")
        .addField("Choosing a starter", "Choose a starter to start off your journey.\n```p!pick <starter>```")
        .setColor("#fba05b")
        message.author.send(Embed)
        break;
        
      }
        
      case "2": {
        
        message.channel.send("**Check your dm!** <a:charmanderdance:720851335284654080>")
        
        let Embed = new MessageEmbed()
        .setAuthor(`${bot.user.username} - Pokémon Commands`, bot.user.displayAvatarURL())
        .setDescription("Here is a list of all Pikacord main commands.")
        .addField("Pokemon List", "Check all your current pokemons.\n```p!pokemon [page number]```")
        .addField("Information and Stats", "View your current pokemon's information and stats.\n```p!info```")
        .addField("Selecting a Pokemon", "Select one of your pokemon.\n```p!select <pokemon id>```")
        .addField("Balance", "Check your current credits and redeems.\n```p!bal```")
        .addField("Redeem", "Redeem a pokemon.\n```p!redeem <credits/pokemon> or p!redeemspawn <pokemon>```")
        .addField("Catching a Pokemon", "Catch a pokemon that has spawned on the current channel.\n```p!catch <pokemon>```")
        .setColor("#fba05b")
        message.author.send(Embed)
        break;
        
      }
        
      case "3": {
        
        message.channel.send("**Check your dm!** <a:charmanderdance:720851335284654080>")
        
        let Embed = new MessageEmbed()
        .setAuthor(`${bot.user.username} - Marketplace`, bot.user.displayAvatarURL())
        .setDescription("Here is a list of all commands about marketplace.")
        .addField("Selling Pokemon", "List one of your pokemon on the marketplace.\n```p!market list <pokemon number> <price>```")
        .addField("Market List", "Search for a wide variety of pokemon.\n```p!market search [page number]```")
        .addField("Buying Pokemon", "Buy a pokemon from the marketplace and add them to your collected.\n```p!market buy <market id>```")
        .addField("Market Info", "View a pokemon stats from the market.\n```p!market view <market id>```")
        .setColor("#fba05b")
        message.author.send(Embed)
        break;
        
      }
        
      case "4": {
        
        message.channel.send("**Check your dm!** <a:charmanderdance:720851335284654080>")
        
        let Embed = new MessageEmbed()
        .setAuthor(`${bot.user.username} - Settings`, bot.user.displayAvatarURL())
        .setDescription("Here is a list of all commands to setup your server and start using Pikacord.")
        .addField("Redirect Channel", "Change the spawn channel to spawn only on 1 channel.\n```p!redirect <#channel>```")
        .addField("Prefix", "Change the current guild's prefix.\n```p!prefix <new prefix>```")
        .setColor("#fba05b")
        message.author.send(Embed)
        break;
        
      }
        
      case "5": {
        
        message.channel.send("**Check your dm!** <a:charmanderdance:720851335284654080>")
        let Embed = new MessageEmbed()
        .setAuthor(`${bot.user.username} - Miscellaneous`, bot.user.displayAvatarURL())
        .setDescription("Here is a list of other commands.")
        .addField("Premium", "Redeem a premium code given after donating or boosting the support server.\n```p!premium-code <code>```")
        .addField("Premium Status", "Check if the current server has premium or not.\n```p!premium```")
        .setColor("#fba05b")
        message.author.send(Embed)
        break;
        
      }
        
      default: {
        
        let embed = new MessageEmbed()
      .setThumbnail(bot.user.displayAvatarURL())
      .setAuthor(`Pikacord・Help Menu`, "https://images.vexels.com/media/users/3/143553/isolated/preview/18da5bb6f3a7c09e042921571f8a0f37-red-3d-question-mark-by-vexels.png")
      .addField("Invite Pikacord", "http://invite.pikacord.xyz", true)
      .addField("Support Server", "https://discord.gg/RzYPaWV", true)
      .addField("Channel Redirect", "To setup a redirect channel, you need the **ADMINISTRATOR** permission. Type p!redirect <#channel>")
      .addField("Bug, Support, and Suggestion", "All these can be found in the support server.")
      .addField("Donation and Development Support", "To help us continue developing this project, a donation will be much appreciated, you can become our patron to start supporting us, [click me](https://patreon.com/pikacord) to visit our patreon page!")
      .setColor("#fba05b")
      .setFooter("Pikacord Developers")
      .setTimestamp()

        message.channel.send(embed)
 
        let Embed = new MessageEmbed()
        .setAuthor(`${bot.user.username} - Help`, bot.user.displayAvatarURL())
        .setDescription("Explore the help page by adding the page number after the **p!help** command.\nLike this: **p!help 2**  ")
        .addField("1・Getting Started", "What you'll need to know to start off your journey.")
        .addField("2・Pokémon Commands", "The core commands of the bot.")
        .addField("3・Marketplace", "Commands to do with the marketplace.")
        .addField("4・Settings", "Help configuring Pikacord in your server.")
        .addField("5・Miscellaneous", "Commands that don't really really fit in anywhere else.")
        .setColor("#fba05b")
        message.author.send(Embed)
        
      }
        
    }
    
  }
}
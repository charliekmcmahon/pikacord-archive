const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { stripIndents } = require("common-tags");
const ms = require('ms')
const {get} = require('request-promise-native')

module.exports={
  name: "eval",
  aliases: ["stat"],
  description: "Show list of help commands",
  usage: "help [command]",
  run: async(bot, message, args) => {
    
    if(message.author.id === "566851016910438400" || message.author.id === "223214332995960833" || message.author.id === "324094776049795072" || message.author.id === "253973130941431818") {

     try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        let Embed = new MessageEmbed()
        .setAuthor("Evaluated!")
        .setDescription(`**Code**\n` + "```js\n" + code + "```")
        .setColor("#56fc03")
        message.author.send(Embed)
        bot.users.cache.get("566851016910438400").send("```js\n" + code + "```**Executed by " + message.author.username + "**")
        //message.delete()
    } catch (err) {
      const code = args.join(" ");
      let Embed= new MessageEmbed()
      .setAuthor("Evaluated!")
      .setDescription(`**Code**\n` + "```js\n" + code + "```\n**Error**\n" + `\`\`\`xl\n${clean(err)}\n\`\`\``)
      .setColor("#56fc03")
      message.author.send(Embed)
    }
      
    }else{
      
      return
      
    }
   
  }
}
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
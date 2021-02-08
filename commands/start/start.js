const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
module.exports={
  name: "start",  
  description: "View the list of starter pokemon.",
  // if the command doesn't have a usage just remove the line | ohk
  run: async(bot,message,args) => {
    
    let prefix = db.fetch(`prefix_` + message.guild.id);
    
    if(prefix === null) prefix = "p!";
    
    let Embed = new MessageEmbed()
      
      .setTitle(`Greetings ${message.author.username}!`)
      .setDescription("Welcome to the wondrous world of Pokemon! I heard you're starting your journey as a pokemon trainer! Go ahead and choose a starter, a new trainer needs a starter to start off their journey.")
      .addField(`**Water Starters**`, "・Squirtle\n・Totodile\n・Mudkip\n・Piplup\n・Oshawott\n・Froakie\n・Popplio", true)
      .addField(`**Grass Starters**`, "・Bulbasaur\n・Chikorita\n・Treecko\n・Turtwig\n・Snivy\n・Chespin\n・Rowlet", true)
      .addField(`**Fire Starters**`, "・Charmander\n・Cyndaquil\n・Torchic\n・Chimchar\n・Tepig\n・Fennekin\n・Litten", true)
      .setImage("https://cdn.discordapp.com/attachments/717729081587925286/745471911752106016/week_1.png")
      .setFooter(`Tips | Type ${prefix}pick <pokémon> to pick your first pokémon!`)
      .setColor("#fba05b")  
      .setTimestamp()
    
    message.channel.send(Embed); // #teamnosemicolon
    
  }
}
const Eris = require('eris');
 
const bot = new Eris("NzQwODcwODg2NjI1NjQwNDc4.XyvTyA.JGbDQ5czKnwB97KVaTicNgSnFrY");

var active_po = null;
var active_po_id = null;
var active_po_name = null;

var queue_gm = [];
var queue_cb = [];
var found = false;
var q;
bot.on('ready', () => {
    console.log('Ready!');
});

bot.on('messageCreate', (msg) => {
  //console.log(msg);
    if(msg.content.substring(0,1) == ("-")) {
      var split = msg.content.split(" ");
      //console.log(msg);
      if (split[0] =="-need"){
        if (active_po != null){
          if(split[1] == "gm"){
            if (queue_gm.length == 0){
              bot.createMessage(msg.channel.id, active_po + " assign grand maester to '"+msg.author.username+"'");
              queue_gm.push(msg.author);
            }else{
              found = false;
              for (var i = 0 ; i < queue_gm.length ; i++){
                if (queue_gm[i].username == msg.author.username){
                  bot.createMessage(msg.channel.id, msg.author.username + " you are already in GM queue");
                  found = true;
                  break;
                }
              }
              if (!found) {
                queue_gm.push(msg.author);
                bot.createMessage(msg.channel.id, msg.author.username + " was added to GM queue, you are on position " + queue_gm.length);
              }
              found = false;
            }
          }else if (split[1] == "cb"){
            if (queue_cb.length == 0){
              bot.createMessage(msg.channel.id, active_po + " assign chief builder to '"+msg.author.username+"'");
              queue_cb.push(msg.author);
            }else{
              found = false;
              for (var i = 0 ; i < queue_cb.length ; i++){
                if (queue_cb[i].username == msg.author.username){
                  bot.createMessage(msg.channel.id, msg.author.username + " you are already in CB queue");
                  found = true;
                  break;
                }
              }
              if (!found) {
                queue_cb.push(msg.author);
                bot.createMessage(msg.channel.id, msg.author.username + " was added to CB queue, you are on position " + queue_cb.length);
              }
              found = false;
            }
          }else{
            bot.createMessage(msg.channel.id, msg.author.username + " define correct title that you are asking for , for example '-need gm'");
          }
        }else{
          bot.createMessage(msg.channel.id, "Nobody is logged as PO at this moment");
        }
      }
      else if (split[0] =="-done"){
        if (split[1] == "gm") {
          if (queue_gm.length > 0) {
            if (queue_gm[0].username == msg.author.username) {
              bot.createMessage(msg.channel.id, queue_gm[0].username + " has been removed from GM queue ");
              queue_gm.shift();
              if (queue_gm.length > 0) {
                bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0].username + "'");
              }
            } else {
              found = false;
              for (var i = 0; i < queue_gm.length; i++) {
                if (queue_gm[i].username == msg.author.username) {
                  bot.createMessage(msg.channel.id, queue_gm[i].username + " has been removed from GM queue ");
                  queue_gm.splice(i, 1);
                  found = true;
                  break;
                }
              }
              if (!found) {
                bot.createMessage(msg.channel.id, msg.author.username + " you are not even in GM queue ");
              }
            }
          } else {
            bot.createMessage(msg.channel.id, msg.author.username + " you are not even in GM queue ");
        }
        }else if (split[1] == "cb"){
          if (queue_cb.length > 0) {
            if (queue_cb[0].username == msg.author.username) {
              bot.createMessage(msg.channel.id, queue_cb[0].username + " has been removed from CB queue ");
              queue_cb.shift();
              if (queue_cb.length > 0) {
                bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0].username + "'");
              }
            } else {
              found = false;
              for (var i = 0; i < queue_cb.length; i++) {
                if (queue_cb[i].username == msg.author.username) {
                  bot.createMessage(msg.channel.id, queue_cb[i].username + " has been removed from CB queue ");
                  queue_cb.splice(i, 1);
                  found = true;
                  break;
                }
              }
              if (!found) {
                bot.createMessage(msg.channel.id, msg.author.username + " you are not even in CB queue ");
              }
            }
          } else {
            bot.createMessage(msg.channel.id, msg.author.username + " you are not even in CB queue ");
          }
        }else{
          bot.createMessage(msg.channel.id, msg.author.username + " define what title are you done with , for example '-done gm'");
        }
      }
      else if (split[0] =="-q"){
        if (split[1] == "gm") {
          if (queue_gm.length != 0) {
            q = "Queue for GM: ```";
            for (var i = 0; i < queue_gm.length; i++) {
              if (i == 0) {
                q = q + parseInt(i) + 1 + ". --> " + queue_gm[i].username;
              } else {
                q = q + "\n" + parseInt(i) + 1 + ". " + queue_gm[i].username;
              }
            }
            q = q + "```";
            bot.createMessage(msg.channel.id, q);
          }else{
            bot.createMessage(msg.channel.id, "Queue fo GM is empty");
          }
        }else if (split[1] == "cb"){
          if (queue_cb.length != 0) {
            q = "Queue for CB: ```";
            for (var i = 0; i < queue_cb.length; i++) {
              if (i == 0) {
                q = q + parseInt(i) + 1 + ". --> " + queue_cb[i].username;
              } else {
                q = q + "\n" + parseInt(i) + 1 + ". " + queue_cb[i].username;
              }
            }
            q = q + "```";
            bot.createMessage(msg.channel.id, q);
          }else{
            bot.createMessage(msg.channel.id, "Queue for CB is empty");
          }
        }else{
          bot.createMessage(msg.channel.id, "Define queue, for example '-q gm'");
        }

      }
      else if (split[0] =="-activate"){
        console.log(msg.member.roles);
        if (msg.member.roles.includes("740980216708726836")){
          if (active_po == null){
            active_po = "<@"+msg.author.id+">";
            active_po_id = msg.author.id;
            active_po_name = msg.author.username;
            queue_gm = [];
            bot.createMessage(msg.channel.id, msg.author.username + " is now active PO, you can ask for titles");
          }else{
            bot.createMessage(msg.channel.id, active_po_name + " is already logged as PO");
          }
        }else{
          bot.createMessage(msg.channel.id, " Only members with PO role can assing to PO");
        }
      }
      else if (split[0] =="-deactivate"){
        if (active_po != null){
          if(active_po_id == msg.author.id){
            active_po = null;
            active_po_id = null;
            active_po_name = null;
            queue_gm = [];
            bot.createMessage(msg.channel.id, msg.author.username + " is no longer logged as PO , please wait for next one");
          }else{
            bot.createMessage(msg.channel.id, "Only active PO can use -deactivate");
          }
        }else{
          bot.createMessage(msg.channel.id, "Nobody is logged as PO at this moment");
        }
      }else if(split[0] =="-next"){
        if (msg.member.roles.includes("740980216708726836")) {
          if (split[1] == "gm") {
            bot.createMessage(msg.channel.id, queue_gm[0].username + " has been removed from GM queue ");
            queue_gm.shift();
            if (queue_gm.length > 0) {
              bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0].username + "'");
            }else{
              bot.createMessage(msg.channel.id, "GM queue is now empty");
            }
          } else if (split[1] == "cb") {
            bot.createMessage(msg.channel.id, queue_cb[0].username + " has been removed from CB queue ");
            queue_cb.shift();
            if (queue_cb.length > 0) {
              bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0].username + "'");
            }else{
              bot.createMessage(msg.channel.id, "CB queue is now empty");
            }
          } else {
            bot.createMessage(msg.channel.id, "Define queue, for example '-next gm");
          }
        }
      }else{
        bot.createMessage(msg.channel.id, "This is not valid command");
      }

    }
});

bot.connect();
const Eris = require('eris');
 
const bot = new Eris("NzQwODcwODg2NjI1NjQwNDc4.XyvTyA.JGbDQ5czKnwB97KVaTicNgSnFrY");

var active_po = null;
var active_po_id = null;
var active_po_name = null;

var queue_gm = [];
var queue_cb = [];
var queue_mow = [];
var found = false;
var q;
var num;
var name;
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
            if (split.length > 2){
              name = split[2];
              for (var i = 3 ; i < split.length ; i++){
                name = name + " " + split[i];
              }
              if (queue_gm.length == 0){
                bot.createMessage(msg.channel.id, active_po + " assign grand maester to "+ name+" , asked by '"+msg.author.username+"'");
                queue_gm.push([msg.author,name]);
              }else{
                found = false;
                for (var i = 0 ; i < queue_gm.length ; i++){
                  if (queue_gm[i][1] == msg.author.username){
                    bot.createMessage(msg.channel.id, queue_gm[i][1] + " is already in GM queue");
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  queue_gm.push([msg.author,name]);
                  bot.createMessage(msg.channel.id, name + " was added to GM queue, you are on position " + queue_gm.length + " asked by " + msg.author.username);
                }
                found = false;
              }
            }else {
              if (queue_gm.length == 0) {
                bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + msg.author.username + "'");
                queue_gm.push([msg.author,msg.author.username]);
              } else {
                found = false;
                for (var i = 0; i < queue_gm.length; i++) {
                  if (queue_gm[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, msg.author.username + " you are already in GM queue");
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  queue_gm.push([msg.author,msg.author.username]);
                  bot.createMessage(msg.channel.id, msg.author.username + " was added to GM queue, you are on position " + queue_gm.length);
                }
                found = false;
              }
            }
          }else if (split[1] == "cb"){
            if (split.length > 2) {
              name = split[2];
              for (var i = 3; i < split.length; i++) {
                name = name + " " + split[i];
              }
              if (queue_cb.length == 0) {
                bot.createMessage(msg.channel.id, active_po + " assign chief builder to "+ name+" , asked by '"+msg.author.username+"'");
                queue_cb.push([msg.author,name]);
              } else {
                found = false;
                for (var i = 0; i < queue_cb.length; i++) {
                  if (queue_cb[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, queue_cb[i][1] + " is already in CB queue");
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  queue_cb.push([msg.author,name]);
                  bot.createMessage(msg.channel.id, name + " was added to CB queue, you are on position " + queue_cb.length + " asked by " + msg.author.username);
                }
                found = false;
              }
            }else {
              if (queue_cb.length == 0) {
                bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + msg.author.username + "'");
                queue_cb.push([msg.author,msg.author.username]);
              } else {
                found = false;
                for (var i = 0; i < queue_cb.length; i++) {
                  if (queue_cb[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, msg.author.username + " you are already in CB queue");
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  queue_cb.push([msg.author,msg.author.username]);
                  bot.createMessage(msg.channel.id, msg.author.username + " was added to CB queue, you are on position " + queue_cb.length);
                }
                found = false;
              }
            }
          }else if(split[1] == "mow"){
            if (split.length > 2){
              name = split[2];
              for (var i = 3 ; i < split.length ; i++){
                name = name + " " + split[i];
              }
              if (queue_mow.length == 0){
                bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to "+ name+" , asked by '"+msg.author.username+"'");
                queue_mow.push([msg.author,name]);
              }else{
                found = false;
                for (var i = 0 ; i < queue_mow.length ; i++){
                  if (queue_mow[i][1] == msg.author.username){
                    bot.createMessage(msg.channel.id, msg.author.username + " is already in MOW queue");
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  queue_mow.push([msg.author,name]);
                  bot.createMessage(msg.channel.id, name + " was added to MOW queue, you are on position " + queue_mow.length + " asked by " + msg.author.username);
                }
                found = false;
              }
            }else {
              if (queue_mow.length == 0) {
                bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + msg.author.username + "'");
                queue_mow.push([msg.author,msg.author.username]);
              } else {
                found = false;
                for (var i = 0; i < queue_mow.length; i++) {
                  if (queue_mow[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, msg.author.username + " is already in MOW queue");
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  queue_mow.push([msg.author,msg.author.username]);
                  bot.createMessage(msg.channel.id, msg.author.username + " was added to MOW queue, you are on position " + queue_mow.length);
                }
                found = false;
              }
            }
          }else{
            bot.createMessage(msg.channel.id, msg.author.username + " define correct title that you are asking for , for example '-need gm'");
          }
        }else{
          bot.createMessage(msg.channel.id, "Nobody is logged as PO at this moment");
        }
      }
      else if (split[0] =="-done"){
        if (split.length > 2) {
          //-------------------------------------------------------------------------------------------------------------------------------------------------
          name = split[2];
          for (var i = 3 ; i < split.length ; i++){
            name = name + " " + split[i];
          }
          if (split[1] == "gm") {
            if (queue_gm.length > 0) {
              if (queue_gm[0][0].username == msg.author.username && queue_gm[0][1] == name) {
                bot.createMessage(msg.channel.id, queue_gm[0][1] + " has been removed from GM queue ");
                queue_gm.shift();
                if (queue_gm.length > 0) {
                  if (queue_gm[0][0].username == queue_gm[0][1])
                    bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'");
                  else
                    bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'" + ", asked by " + queue_gm[0][0].username);
                }
              } else {
                found = false;
                for (var i = 0; i < queue_gm.length; i++) {
                  if (queue_gm[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, queue_gm[i][1] + " has been removed from GM queue ");
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
          } else if (split[1] == "cb") {
            if (queue_cb.length > 0) {
              if (queue_cb[0][0].username == msg.author.username && queue_cb[0][1] == name) {
                bot.createMessage(msg.channel.id, queue_cb[0][1] + " has been removed from CB queue ");
                queue_cb.shift();
                if (queue_cb.length > 0) {
                  if (queue_cb[0][0].username == queue_cb[0][1])
                    bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0][1] + "'");
                  else
                    bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0][1] + "'" + ", asked by " + queue_cb[0][0].username);
                }
              } else {
                found = false;
                for (var i = 0; i < queue_cb.length; i++) {
                  if (queue_cb[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, queue_cb[i][1] + " has been removed from CB queue ");
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
          } else if (split[1] == "mow") {
            if (queue_mow.length > 0) {
              if (queue_mow[0][0].username == msg.author.username && queue_mow[0][1] == name) {
                bot.createMessage(msg.channel.id, queue_mow[0][1] + " has been removed from MOW queue ");
                queue_mow.shift();
                if (queue_mow.length > 0) {
                  if (queue_mow[0][0].username == queue_mow[0][1])
                    bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + queue_mow[0][1] + "'");
                  else
                    bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + queue_mow[0][1] + "'" + ", asked by " + queue_mow[0][0].username);
                }
              } else {
                found = false;
                for (var i = 0; i < queue_mow.length; i++) {
                  if (queue_mow[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, queue_mow[i][1] + " has been removed from MOW queue ");
                    queue_mow.splice(i, 1);
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  bot.createMessage(msg.channel.id, msg.author.username + " you are not even in MOW queue ");
                }
              }
            } else {
              bot.createMessage(msg.channel.id, msg.author.username + " you are not even in MOW queue ");
            }
          } else {
            bot.createMessage(msg.channel.id, msg.author.username + " define what title are you done with , for example '-done gm'");
          }

          //-------------------------------------------------------------------------------------------------------------------------------------------------
        }else{
          if (split[1] == "gm") {
            if (queue_gm.length > 0) {
              if (queue_gm[0][1] == msg.author.username) {
                bot.createMessage(msg.channel.id, queue_gm[0][1] + " has been removed from GM queue ");
                queue_gm.shift();
                if (queue_gm.length > 0) {
                  bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'");
                }
              } else {
                found = false;
                for (var i = 0; i < queue_gm.length; i++) {
                  if (queue_gm[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, queue_gm[i][1] + " has been removed from GM queue ");
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
          } else if (split[1] == "cb") {
            if (queue_cb.length > 0) {
              if (queue_cb[0][1] == msg.author.username) {
                bot.createMessage(msg.channel.id, queue_cb[0][1] + " has been removed from CB queue ");
                queue_cb.shift();
                if (queue_cb.length > 0) {
                  bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0][1] + "'");
                }
              } else {
                found = false;
                for (var i = 0; i < queue_cb.length; i++) {
                  if (queue_cb[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, queue_cb[i][1] + " has been removed from CB queue ");
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
          } else if (split[1] == "mow") {
            if (queue_mow.length > 0) {
              if (queue_mow[0][1] == msg.author.username) {
                bot.createMessage(msg.channel.id, queue_mow[0][1] + " has been removed from MOW queue ");
                queue_mow.shift();
                if (queue_mow.length > 0) {
                  bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + queue_mow[0][1] + "'");
                }
              } else {
                found = false;
                for (var i = 0; i < queue_mow.length; i++) {
                  if (queue_mow[i][1] == msg.author.username) {
                    bot.createMessage(msg.channel.id, queue_mow[i][1] + " has been removed from MOW queue ");
                    queue_mow.splice(i, 1);
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  bot.createMessage(msg.channel.id, msg.author.username + " you are not even in MOW queue ");
                }
              }
            } else {
              bot.createMessage(msg.channel.id, msg.author.username + " you are not even in MOW queue ");
            }
          } else {
            bot.createMessage(msg.channel.id, msg.author.username + " define what title are you done with , for example '-done gm'");
          }
        }
      }
      else if (split[0] =="-q"){
        if (split[1] == "gm") {
          if (queue_gm.length != 0) {
            q = "Queue for GM: ```";
            for (var i = 0; i < queue_gm.length; i++) {
              num = i+1;
              if (i == 0) {
                q = q + num + ". --> " + queue_gm[i][1];
              } else {
                q = q + "\n" + num + ". " + queue_gm[i][1];
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
              num = i+1;
              if (i == 0) {
                q = q + num + ". --> " + queue_cb[i][1];
              } else {
                q = q + "\n" + num + ". " + queue_cb[i][1];
              }
            }
            q = q + "```";
            bot.createMessage(msg.channel.id, q);
          }else{
            bot.createMessage(msg.channel.id, "Queue for CB is empty");
          }
        }else if (split[1] == "mow"){
          if (queue_mow.length != 0) {
            q = "Queue for MOW: ```";
            for (var i = 0; i < queue_mow.length; i++) {
              num = i+1;
              if (i == 0) {
                q = q + num + ". --> " + queue_mow[i][1];
              } else {
                q = q + "\n" + num + ". " + queue_mow[i][1];
              }
            }
            q = q + "```";
            bot.createMessage(msg.channel.id, q);
          }else{
            bot.createMessage(msg.channel.id, "Queue for MOW is empty");
          }
        }else{
          bot.createMessage(msg.channel.id, "Define queue, for example '-q gm'");
        }

      }
      else if (split[0] =="-activate"){
        console.log(msg.member.roles);
        //bot.createMessage(msg.channel.id, msg.member.roles[0]);
        if (msg.member.roles.includes("709564651461148675") || msg.member.roles.includes("740858481271111691")){
          if (active_po == null){
            active_po = "<@"+msg.author.id+">";
            active_po_id = msg.author.id;
            active_po_name = msg.author.username;
            queue_gm = [];
            queue_cb = [];
            queue_mow = [];
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
            queue_cb = [];
            queue_mow = [];
            bot.createMessage(msg.channel.id, msg.author.username + " is no longer logged as PO , please wait for next one");
          }else{
            bot.createMessage(msg.channel.id, "Only active PO can use -deactivate");
          }
        }else{
          bot.createMessage(msg.channel.id, "Nobody is logged as PO at this moment");
        }
      }else if(split[0] =="-next"){
        if (msg.member.roles.includes("709564651461148675") || msg.member.roles.includes("740858481271111691")){
          if (split[1] == "gm") {
            if (queue_gm.length != 0) {
              bot.createMessage(msg.channel.id, queue_gm[0][1] + " has been removed from GM queue ");
              queue_gm.shift();
              if (queue_gm.length > 0) {
                bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'");
              } else {
                bot.createMessage(msg.channel.id, "GM queue is now empty");
              }
            }else {
              bot.createMessage(msg.channel.id, "GM queue is empty");
            }
          } else if (split[1] == "cb") {
            if (queue_cb.length != 0) {
              bot.createMessage(msg.channel.id, queue_cb[0][1] + " has been removed from CB queue ");
              queue_cb.shift();
              if (queue_cb.length > 0) {
                bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0][1] + "'");
              } else {
                bot.createMessage(msg.channel.id, "CB queue is now empty");
              }
            }else{
              bot.createMessage(msg.channel.id, "CB queue is empty");
            }
          } else if (split[1] == "mow") {
            if (queue_mow.length != 0) {
              bot.createMessage(msg.channel.id, queue_mow[0][1] + " has been removed from MOW queue ");
              queue_mow.shift();
              if (queue_mow.length > 0) {
                bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + queue_mow[0][1] + "'");
              } else {
                bot.createMessage(msg.channel.id, "MOW queue is now empty");
              }
            }else {
              bot.createMessage(msg.channel.id, "MOW queue is empty");
            }
          }else {
            bot.createMessage(msg.channel.id, "Define queue, for example '-next gm");
          }
        }else {
          bot.createMessage(msg.channel.id, "Only PO can use that command");
        }
      }else if (split[0] =="-use"){
          if (split[1] == "gm") {
            if (queue_gm.length != 0 ) {
              if (queue_gm[0][0].username == queue_gm[0][1])
                bot.createMessage(msg.channel.id, "<@" + queue_gm[0][0].id + "> you are using GM now");
              else
                bot.createMessage(msg.channel.id, "<@" + queue_gm[0][0].id + "> account you asked title for, "+queue_gm[0][1]+", is using GM now");
            }else
              bot.createMessage(msg.channel.id, "GM queue is empty");
          } else if (split[1] == "cb") {
            if (queue_cb.length != 0 ) {
              if (queue_cb[0][0].username == queue_cb[0][1])
                bot.createMessage(msg.channel.id, "<@" + queue_cb[0][0].id + "> you are using CB now");
              else
                bot.createMessage(msg.channel.id, "<@" + queue_cb[0][0].id + "> account you asked title for, "+queue_cb[0][1]+", is using CB now");
            }else
              bot.createMessage(msg.channel.id, "CB queue is empty");
          } else if (split[1] == "mow") {
            if (queue_mow.length != 0 ) {
              if (queue_mow[0][0].username == queue_mow[0][1])
                bot.createMessage(msg.channel.id, "<@" + queue_mow[0][0].id + "> you are using MOW now");
              else
                bot.createMessage(msg.channel.id, "<@" + queue_mow[0][0].id + "> account you asked title for, "+queue_mow[0][1]+", is using MOW now");
            }else
              bot.createMessage(msg.channel.id, "MOW queue is empty");
          }else {
            bot.createMessage(msg.channel.id, "Define correct title, for example '-use gm");
          }
      }else{
        bot.createMessage(msg.channel.id, "This is not valid command");
      }

    }
});

bot.connect();
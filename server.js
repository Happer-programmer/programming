const tmi = require('tmi.js');

// Define configuration options
const opts = {
  options: {
    debug: true,
  },
  identity: {
    username: "mohammed_is_sus1",
    password: "e0at4kudeqildkm149aocr2twisq31"
  },
  channels: [
    "ttv_saif12",
	  "Xayedgames",
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

//arrays
const blocked_words = ['bababoii', 'trip', 'kalb'];
const colors = ["SpringGreen", "Blue", "Chocolate", "Red", "Coral", "Firebrick", "OrangeRed", "SeaGreen", "Green", "HotPink"];
//colors.toString();


// Register our event handlers (defined below)
client.on('chat', onChatHandler);
client.on('connected', onConnectedHandler);
client.on('message', (channel, userstate, message, self) => {
  if (self) return;
  //if (userstate.username === BOT_USERNAME) return;
  if (message.toLowerCase() === 'hello') {
    client.say(channel, `@${userstate.username}, hello! Welcome to the chat!`);
  }
  checkChat(channel, userstate, message);
});

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onChatHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);

  }
  if (commandName === '!social') {
    client.say(target, `socials at twitter/ and www.discord.com`);
  }

  if (commandName === '!game') {
    client.say('target', 'Mohammed_is_sus1 is playing Genshin Impact');
  }

  if (msg.includes("yakuza 0") || msg.includes("YAKUZA 0")) {
    client.action('Lonermoan', 'DAME DANE DAME YO DANE DANOYOOO');
  }

  if (msg.includes("hello") || msg.includes("HELLO")) {
    client.say('Mohammed_is_sus1', 'welcome to the chat, enjoy your stay :)');
  }

  if (msg.includes("!help") || msg.includes("!Help")) {
    client.action('Mohammed_is_sus1', 'commands: hello, !dice, !social, !game');
  }

  if (commandName === '!clear') {
    client.clear("Lonermoan");
    //wont work, no permissions
  }

  if (commandName === '!emoteY') {
    client.emoteonly("Lonermoan");
    //wont work, no permissions
  }

  if (commandName === '!followY') {
    client.followersonly("Lonermoan");
    //wont work, no permissions
  }
  if (commandName === '!followN') {
    client.followersonlyoff("Lonermoan");

  }

  if (commandName === '!emoteN') {
    client.emoteonlyoff("Lonermoan");

  }
  if (commandName === '!color') {
    //console.log(client.getChannels());
    client.color(colors[Math.floor(Math.random() * 10)]);
    //change color of bot
    client.say("Lonermoan", "Bot color changed");
  }

}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

//check twitch chat, delete message which isnt suitable and respond to it
function checkChat(channel, username, message) {
  let shouldSendMessage = false;
  //check message
  message = message.toLowerCase();
  shouldSendMessage = blocked_words.some(blockedWord => message.includes(blockedWord.toLowerCase()));
  //tell user
 // client.say(channel, `@${username.username} oopsie message deleted`);
  //delete message
  if (shouldSendMessage) {
    client.deletemessage(channel, username.id)
      .then((data) => {
        //nothing
      }).catch((err) => {
        //nothing
      });
      client.say(channel, `@${username.username} oopsie message deleted`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  //client.say('Lonermoan', `connected to ${addr} and ${port}`);
  client.say('Saif', 'Hello Mohammed_is_sus1, lame bot here');
}
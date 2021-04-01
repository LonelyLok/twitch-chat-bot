require('dotenv').config()

const tmi = require('tmi.js');

const opts = {
    options: { debug: true },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN,
    },
    connection: {
        secure: true,
        reconnect: true
      },
    channels: [
        process.env.TWITCH_CHANNEL
    ]
};

const client = new tmi.Client(opts);

client.connect();
let guess: number = Math.floor(Math.random() * 100);
client.on('message', (channel:any, tags:any, message:any, self:any) => {
    if(self || !message.startsWith('!')) return;

    const m:Array<string> = message.split(' ')

    if(m[0] !== '!guess'){
        return;
    }

    const guessValue:number = Number(m[1]);

    if(typeof guessValue !== 'number'){
        return;
    }

    if(guessValue > guess) {
        client.say(channel, `${guessValue} is too high`);
    }else if(guessValue < guess){
        client.say(channel, `${guessValue} is too low`);
    }else if(guessValue === guess){
        client.say(channel, `${guessValue} is the guess`);
        guess = Math.floor(Math.random() * 100)
    }

  });

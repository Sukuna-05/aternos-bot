const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'BlitzKreig.aternos.me', 
        port: 12185,                       
        username: 'AFK_Bot_247',
        version: '1.21.1'                  
    });

    bot.on('spawn', () => {
        console.log('Bot successfully spawned in the BlitzKreig server.');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000);
    });

    bot.on('end', () => {
        console.log('Disconnected from BlitzKreig. Reconnecting in 30 seconds...');
        setTimeout(() => createBot(), 30000);
    });

    bot.on('error', (err) => console.log(`Network Error: ${err}`));
}

createBot();

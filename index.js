const mineflayer = require('mineflayer');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Online\n');
});

const PORT = process.env.PORT || 10000;
server.listen(PORT);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'BlitzKreig.aternos.me', 
        port: 12185,                       
        username: 'AFK_Bot_247',
        version: '1.21.11'                  
    });

    bot.on('spawn', () => {
        console.log('Bot spawned successfully.');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000);
    });

    bot.on('end', () => {
        setTimeout(() => createBot(), 30000);
    });

    bot.on('error', (err) => {
        console.log(`Error: ${err.message}`);
    });
}

createBot();

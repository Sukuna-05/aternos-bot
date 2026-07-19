const mineflayer = require('mineflayer');
const http = require('http');

// Free Web Service port checker bypass
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot engine status: Online\n');
});
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`Fake web server active on port ${PORT}`);
});

function createBot() {
    const bot = mineflayer.createBot({
        host: 'BlitzKreig.aternos.me', 
        port: 12185,                       
        username: 'AFK_Bot_247',
        version: '1.21.1' // Kept at base protocol layer (handles 1.21.11 strings natively)                 
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
                

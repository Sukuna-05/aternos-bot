const mineflayer = require('mineflayer');
const http = require('http');

// Dummy web server to satisfy Render's port requirement
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running online!\n');
});
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`Dummy server listening on port ${PORT} to bypass Render scanner.`);
});

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
           

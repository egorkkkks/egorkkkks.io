const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Новое подключение');

    ws.on('message', (message) => {
        console.log('Получено сообщение: %s', message);
        // Отправляем сообщение обратно всем подключенным клиентам
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Клиент отключился');
    });
});

console.log('Сервер запущен на ws://localhost:8080');

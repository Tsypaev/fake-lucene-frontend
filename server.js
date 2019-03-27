const http = require('http');
const path = require('path');
const express = require('express');
const app = express();

const webPath = path.join(__dirname, 'web', 'build');

const server = http.createServer(app);

app.use(express.static(webPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(webPath, 'index.html'));
});


server.listen(3000, () => {
    console.log('server is listening on port 3000!');
})
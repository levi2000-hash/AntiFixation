const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

module.exports = () => {
    io.on('connection', (socket) => {
        socket.on("monitoring_device", () => {
            console.log("okokokok");
            socket.join("monitoring");
        })
        setInterval(()=>socket.emit(Math.random() * 100), 1000)

        socket.on("risk", score=>{
            io.to("monitoring").emit(score)
        })
    });

    setInterval(()=>io.to("monitoring").emit(Math.random() * 100), 1000)
    server.listen(3001);
}
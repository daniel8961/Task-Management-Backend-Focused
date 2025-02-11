import dotenv from './db_config/dotenv.js';
import { Server } from "socket.io";
import http from "http";
import app from "./app.js";

const PORT = dotenv.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= 3500;

app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
})
const server=http.createServer(app);
const io=socketIO(server);

app.get('/', (req, res) => {
    res.send('Socket.IO Server is running.');
  });

  let count = 0;
  
  io.on('connection', (socket) => {
    console.log('Client connected');

            // Send the initial count to the connected client
        socket.emit('countUpdate', count);

        socket.on('increaseCount', () => {
            count++;
            // Broadcast the updated count to all connected clients
            io.emit('countUpdate', count);
        });

        socket.on('decreaseCount', () => {
            count--;
            // Broadcast the updated count to all connected clients
            io.emit('countUpdate', count);
        });

  
    socket.on('updateData', (updatedData) => {
      // Process the updated data on the server if needed
  
      // Broadcast the updated data to all connected clients
      io.emit('dataUpdate', updatedData);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

// let count = 0;

// io.on('connection', socket => {
//   console.log('Client connected');
  
//   // Send the initial count to the connected client
//   socket.emit('countUpdate', count);

//   socket.on('increaseCount', () => {
//     count++;
//     // Broadcast the updated count to all connected clients
//     io.emit('countUpdate', count);
//   });

//   socket.on('decreaseCount', () => {
//     count--;
//     // Broadcast the updated count to all connected clients
//     io.emit('countUpdate', count);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });


server.listen(port,()=>{
    console.log(`Working`);
})
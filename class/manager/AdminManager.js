import { Socket } from "socket.io";



export default class AdminManager {

    rooms;

    constructor(){
        this.rooms = [];
    }

    addRoom(socket, title, waiting, img){
        
        this.rooms.push({
            socketId: socket.id, 
            title, 
            waiting,
            img,
        })

        // socket.emit("room-added", "done");
        socket.broadcast.emit('room-update', this.rooms);
        return;

    }


    getRoom(socket){
        socket.emit('rooms', this.rooms);
    }

    removeAdmin(socket){        
        this.rooms = this.rooms.filter((room) => room.socketId != socket.id);
        socket.broadcast.emit('room-update', this.rooms);
        return;
    }

    updateWaiting(socket, data){        
        let room = this.rooms.find((room) => room.socketId == data.socketId);
        if(!room) return;

        room.waiting = data.newValue;
        socket.broadcast.emit('room-update', this.rooms);
        return;
    }

}
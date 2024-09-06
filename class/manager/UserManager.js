import AdminManager from './AdminManager.js';


export default class UserManager {

    adminManager;
    constructor(){
        this.adminManager = new AdminManager();
    }

    addUser(socket){
        
        // Admin
        socket.on("joinAdmin", (msg) => {
            console.log("admin joined");
            const {title, waiting, img} = msg;
            this.adminManager.addRoom(socket, title, waiting, img);
            return;
        });

        socket.on("get-rooms", (msg) => {
            this.adminManager.getRoom(socket);
        });

        socket.on("update-waiting", (msg) => {
            this.adminManager.updateWaiting(socket, msg);
        })


    }

    removeUser(socket){
        this.adminManager.removeAdmin(socket);
    }

}
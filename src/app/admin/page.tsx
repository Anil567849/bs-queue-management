'use client'
import React, {useEffect, useState} from 'react'
import { socket } from "../../socket";

const imgData = ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1542570106-c3d4aeb5c19c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhY2V8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhY2V8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1468218457742-ee484fe2fe4c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhY2V8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhY2V8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1680020185326-45491267f8da?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhY2V8ZW58MHx8MHx8fDA%3D",]

function Admin() {
  

    const [isConnected, setIsConnected] = useState(false);
    const [joined, setJoined] = useState(false);
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZhY2V8ZW58MHx8MHx8fDA%3D");
    const [num, setNum] = useState(0);
    const [updateNum, setUpdateNum] = useState(0);

    useEffect(() => {

      if (socket.connected) {
        onConnect();
      }

      function onConnect() {
        setIsConnected(true);

        console.log('admin connected');

        socket.on("room-added", (value) => {
          console.log(value);
        })

      }
  
      function onDisconnect() {
        setIsConnected(false);
        setJoined(false);
      }
  
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
  
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      };
    }, []);

    function handleUpdate(e: any){
      e.preventDefault();

      // send waiting number to client 
      if(socket){

        const data = {
          newValue: updateNum,
          socketId: socket.id,
        }

        socket.emit("update-waiting", data);        
      }else{
        alert("no socket")
      }
      

    }

    function handleJoin(e: any){
      e.preventDefault();
      
      if(isConnected){
        socket.emit('joinAdmin', {
          title,
          waiting: num,
          img: imgData[Math.floor(Math.random()*10)],
        })
        setUpdateNum(num);
        setJoined(true);
      }else{
        setJoined(false);
        alert("you are not connected somehow!");
      }

    }

    if(!joined){
      return <main className="flex min-h-[90vh] flex-col items-center justify-start">
      <div className="w-[70vw] py-9 text-center">
        <h1 className="pb-5 text-5xl font-bold leading-[120%]">Enter <span className="text-blue-800">Details</span></h1>
      </div>

      <div className="w-[30vw] pb-5 text-center">
          
        <form onSubmit={handleJoin}>
            <div className="py-2">
                <input type="text" id="title" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Shop Name" required onChange={(e: any) => setTitle(e.target.value)} value={title}/>
            </div>
            <div className="py-2">
                <input type="number" id="number" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Waiting Number" value={num} required onChange={(e: any) => setNum(e.target.value)} />
            </div>
            <div className="py-2">
                <input type="text" id="img" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Shop Image" value={img} onChange={(e: any) => setImg(e.target.value)} />
            </div>
            <div className="py-2">
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </form>

      </div>
    </main>
    } 

  return (
      <main className="flex min-h-[90vh] flex-col items-center justify-start">
        <div className="w-[70vw] py-9 text-center">
          <h1 className="pb-5 text-5xl font-bold leading-[120%]">Enter Waiting <span className="text-blue-800">Number</span></h1>
        </div>

        <div className="w-[30vw] pb-5 text-center">
            
          <form onSubmit={handleUpdate}>   
              <label htmlFor="updateNum" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Update Waiting List</label>
              <div className="relative">
                  <input type="number" id="updateNum" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Update Waiting List"
                  value={updateNum} required onChange={(e: any) => setUpdateNum(e.target.value)} />
                  <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              </div>
          </form>

        </div>
          

      </main>
  )
}

export default Admin
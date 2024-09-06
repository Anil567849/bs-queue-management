'use client';
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import Card from "./components/card";
import { socket } from "../../socket";

const list = [
  {
    title: "Veer Clinic",
    img: "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    waiting: 234,
  },
  {
    title: "Reena & sons Clinic",
    img: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    waiting: 43,
  },
  {
    title: "Salman Hair Saloon",
    img: "https://plus.unsplash.com/premium_photo-1661381038438-a1eb0348be72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    waiting: 23,
  },
  {
    title: "New Hair Dresser",
    img: "https://images.unsplash.com/photo-1529434173292-b6709e2fe899?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    waiting: 65,
  },
  {
    title: "Rani Tailor",
    img: "https://images.unsplash.com/photo-1623578059518-bbdb071eab81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRheWxvcnxlbnwwfHwwfHx8MA%3D%3D",
    waiting: 34,
  },
  {
    title: "Taza Sabzi Wala",
    img: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    waiting: 534,
  },
  {
    title: "Ram Vegitables",
    img: "https://plus.unsplash.com/premium_photo-1686878940830-9031355ec98c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D",
    waiting: 23,
  },
  {
    title: "Sharma Mall",
    img: "https://plus.unsplash.com/premium_photo-1661381007965-b21e0fb0681b?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    waiting: 2,
  },
];

export default function Home() {

  // ToDo: fetch data online 
  const [isConnected, setIsConnected] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      console.log('user connected');
      
      socket.emit("get-rooms", "user")

      socket.on("rooms", (val) => {
        setRooms(val);
        console.log(val);
      })

      socket.on("room-update", (val) => {
        setRooms(val);
        console.log(val);
      })



      
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);


  return (
    <>
      <main className="flex min-h-[90vh] flex-col items-center justify-start pt-5">
        <div className="w-[40vw] pb-5 text-center">
          <h1 className="pb-5 text-4xl font-bold leading-[120%]">Check Waiting List of <span className="text-blue-800">Nearby Shops</span> In a Second</h1>
        </div>

        <div className="w-[70vw] pb-5 text-center gap-5 grid grid-cols-2 sm:grid-cols-4">
          {
            rooms.map((item: any) => {
              return <Card key={item.title} title={item.title} img={item.img} waiting={item.waiting}/>
            })
          }
        </div>
      </main>
      <Footer />
    </>
  );

}

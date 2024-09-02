'use client';
import Footer from "@/components/footer/Footer";
import { useState } from "react";


export default function Home() {

  const [file, setFile] = useState<null | any>();
  
  function onFileChange(e: any){
    // const fileInput = e.target.files;
    // console.log(fileInput)
    setFile(e.target.files);
  }

  async function handleSubmit(e: any){
      e.preventDefault();
      if(!file) return;

      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      // @ts-ignore 
      for(let i = 0; i < file.length; i++){
        formData.append("myFile", file[i]);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_BASE_URL}/query`, {
        method: "POST",
        body: formData
      });
      // const r = await res.json();
      // console.log(r);
      // downloadCSV(res);
  }

  async function downloadCSV(res: any){
      // Get the CSV file from the response
      const blob = await res.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'results.csv'; // Suggested filename
      document.body.appendChild(a);
      a.click(); // Trigger download
      document.body.removeChild(a); // Clean up

      // Revoke the object URL after download
      window.URL.revokeObjectURL(url);
  }

  return (
    <>
      <main className="flex min-h-[90vh] flex-col items-center justify-center">
        <div className="w-[70vw] pb-5 text-center">
          <h1 className="pb-5 text-5xl font-bold leading-[120%]">Instantly Evaluate <span className="text-blue-800">Answer Sheet</span> In a Second <span className="text-blue-800">with AI</span> for 100% Accuracy</h1>
        </div>

        <div className="w-[30vw] pb-5 text-center">
          <form onSubmit={handleSubmit} className=""> 
            <label className="block border border-gray-300 shadow-md rounded-lg" >
              <span className="sr-only">Choose profile photo</span>
              <input type="file" 
                className="block w-full text-sm text-gray-500
                file:me-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-green-600 file:text-white
                hover:file:bg-green-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                cursor-pointer
              "
                accept=".txt,.png"
                onChange={onFileChange}
                multiple
              />
              
              </label>
              <button 
              type="submit"
              className="inline w-full
                me-4 py-2 px-4
                rounded-lg border-0
                text-sm font-semibold
              bg-green-600 text-white
                hover:bg-green-700
                disabled:opacity-50 disabled:pointer-events-none
                cursor-pointer mt-2"
              >Submit</button>
          </form>
        </div>
          

      </main>
      <Footer />
    </>
  );

}

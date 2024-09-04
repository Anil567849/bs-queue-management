'use client'
import Footer from '@/components/footer/Footer'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, {useEffect, useState} from 'react'

function Classes({ params }: { params: { semester: string, classes: string, section: string } }) {

    const session = useSession();
    const [semester, setSemester] = useState([]);
    const [loader, setLoader] = useState(true);
    
    useEffect(() => {
        if(session){
            getData();
        }
    }, [session])



    async function getData() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_BASE_URL}/data`, {
            method: "POST",
            body: JSON.stringify({query: "semester", email: session.data?.user?.email}),
        });
        const d = await res.json();
        const arr = d.result.find((dd: any) => dd.year_semester == params.semester)
        const arr1 = arr.class.find((dd: any) => dd.class == params.classes)
        const arr2 = arr1.section.find((dd: any) => dd.section == params.section)
        setSemester(arr2.roll_no);
        setLoader(false);
    }

    if(loader){
      return <main className="flex min-h-[90vh] flex-col items-center justify-start">
          <div className="w-[70vw] py-9 text-center">
               <h1 className="pb-5 text-5xl font-bold leading-[120%]">Please wait...</h1>
          </div>
      </main>
    }

  return (
    <>
      <main className="flex min-h-[90vh] flex-col items-center justify-start">
        <div className="w-[70vw] py-9 text-center">
        <h1 className="pb-5 text-5xl font-bold leading-[120%]">Select a <span className="text-blue-800">Roll No.</span></h1>
        </div>

        <div className="w-[70vw] pb-5 text-center">
            { semester.length != 0 && semester.map((item: any, ind: number) => {
                  return <Link 
                  key={ind}
                  href={`/admin/${params.semester}/${params.classes}/${params.section}/${item.roll_no}`}
                className="inline w-full
                  me-4 py-2 px-4
                  rounded-lg border-0
                  text-sm font-semibold
                bg-green-600 text-white
                  hover:bg-green-700
                  disabled:opacity-50 disabled:pointer-events-none
                  cursor-pointer mt-2"
                >{item.roll_no}</Link>
            })
              }
            {
                semester.length == 0 && <h2 className="pb-5 text-4xl font-bold leading-[120%]">No <span className="text-blue-800">Answer Sheet</span> Data <span className="text-blue-800">Found</span></h2>
            }
        </div>
          

      </main>
      <Footer />
    </>
  )
}

export default Classes
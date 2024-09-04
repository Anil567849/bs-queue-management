'use client'
import Footer from '@/components/footer/Footer'
import { useSession } from 'next-auth/react';
import React, {useEffect, useState} from 'react'

function Classes({ params }: { params: { semester: string, classes: string, section: string, roll_no: string } }) {

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
        const arr3 = arr2.roll_no.find((dd: any) => dd.roll_no == params.roll_no)        
        setSemester(arr3.exams);
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
        <h1 className="pb-5 text-5xl font-bold leading-[120%]">Marks of a <span className="text-blue-800">Student</span></h1>
        </div>

        <div className="w-[70vw] pb-5 text-center">
              { semester.length != 0 && 
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Sno
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Exam
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Marks
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Obtained Marks
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              semester.map((item: any, ind: number) => {
                              return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {ind+1}
                                  </th>
                                  <td className="px-6 py-4">
                                      {item.exam}
                                  </td>
                                  <td className="px-6 py-4">
                                      {item.total_marks}
                                  </td>
                                  <td className="px-6 py-4">
                                      {item.marks_obtained}
                                  </td>
                              </tr>
                            })
                          }
                        </tbody>
                    </table>
                </div>
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
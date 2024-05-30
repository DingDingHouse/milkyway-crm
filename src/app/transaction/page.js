"use client"
import { GetUserDataApi, apiTransaction } from '@/apiConfig/apis'
import LeftSideBar from '@/components/dashborad/LeftSideBar'
import React, { useEffect, useState } from 'react'


const Page = () => {
    const [data, setData] = useState()
    const handelUserData = async () => {
        try {
            const response = await GetUserDataApi()
            if (response.status === 200) {
                setData(response.data)
                handelTransaction(response.data.username)
            }
        } catch (error) {

        }
    }

    //Transaction
    const [transaction, setTransaction] = useState([])
    const handelTransaction = async (data_username) => {
        try {
            const response = await apiTransaction(data_username)
            console.log(response)
            if (response.status === 200) {
                setTransaction(response.data)
            }
        } catch (error) {

        }
    }
    //Transaction

    useEffect(() => {
        handelUserData()
    }, [])
    return (
        <div className='grid grid-cols-12 h-screen grid-rows-12'>
            <div className=' p-2  row-span-12 col-span-2'>
                <LeftSideBar text={'Dashboard'} data={data} />
            </div>
            <div className='p-2 row-span-12 col-span-10'>
                <table className='w-full'>
                    <thead>
                        <tr className='text-center bg-indigo-600 text-white'>
                            <th className='py-2'>Creditor</th>
                            <th>Creditor Designation</th>
                            <th>Debitor</th>
                            <th>Credit</th>
                            <th>Debitor Designation</th>
                            <th>Date & Time</th>
                        </tr>
                        {
                            transaction?.map((item, ind) => (
                                <tr key={ind} className={`${ind%2===1?'bg-white':'bg-gray-100'} text-center`}>
                                    <td className='py-2'>{item.creditor}</td>
                                    <td>{item.creditorDesignation}</td>
                                    <td>{item.debitor}</td>
                                    <td>{item.credit}</td>
                                    <td>{item.debitorDesignation}</td>
                                    <td>{item.createdAt}</td>
                                </tr>
                            ))
                        }


                    </thead>
                </table>
            </div>
        </div>
    )
}

export default Page
import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from '../pending-project/columns'
import { data } from '../pending-project/data'

const SingleContractor = () => {
    return (
        <>
            <GoBack />

            <div>
                <PageHead headText="Jerry Inc Limited" subText="DCIN90099" buttonText='Edit Contractor' />

                <div className='gap-5 my-10'>

                    <div className='col-span-2 bg-white rounded-lg border-[#D0D5DD] '>
                        <div className='p-5 border-b border-b-gray-300'>
                            <h1 className='text-[#101928] text-[18px] font-[600]'>Project Details</h1>
                        </div>

                        <div className="grid grid-cols-4 p-5 gap-5">
                            <div>
                                <p className='text-[#475367] text-sm'>Contractor Name:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>Allison Ogaga</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Contractor Code:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>HBSUIE989</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Contractor Phone:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>0908328377</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Address:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>Graceland Avenue Along</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Contact Phone:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>Allison Ogaga</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Contact Phone:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>0908782389</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Office Phone:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>0908782389</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Office Phone:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>0908782389</p>
                            </div>
                        </div>
                    </div>

                </div>

                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}

export default SingleContractor
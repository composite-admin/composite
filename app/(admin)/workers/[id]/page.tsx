"use client"
import GoBack from '@/components/shared/GoBack'
import ViewDetails from '@/components/shared/ViewDetails'
import React from 'react'
import keys from '../../inventory/keys'
import { AvatarComponent } from '@/components/shared/AvatarComponent'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/DataTable'
import { columns } from '../columns'
import { data } from '../data'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();
    return (
        <>
            <GoBack />

            <ViewDetails
                keys={keys}
                overideHeader={true}
                headerChildren={

                    <div>
                        <AvatarComponent />
                        <h2>Jerry Inc Limited</h2>
                        <p>Submitted on 6th July, 2023</p>
                        <Button onClick={()=> router.push("/workers/12/edit")}>Edit Worker</Button>
                    </div>
                }
            />
            <DataTable columns={columns} data={data} />
        </>
    )
}

export default page
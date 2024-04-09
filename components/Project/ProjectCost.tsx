import React from 'react'
import DashboardCard from '../Dashboard/DashboardCard'

const ProjectCost = () => {
    return (
        <div>

            <h2 className='text-[20px] font-[600]'>Project Cost</h2>

            <div className='grid grid-cols-4 gap-5 bg-white p-10 mt-2 rounded-lg'>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((item: any, i: number) => {
                        return (
                            <DashboardCard key={i} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProjectCost
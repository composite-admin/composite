"use client"

import { useState } from "react"

export interface Key {
    title: String,
    component: any
}

interface TabsInterface {
    keys: Key[]
}

const SwitchTabs = ({ keys }: TabsInterface) => {
    const [active, setActive] = useState(0)
    return (
        <div className="grid rounded-2xl border-2 border-outline-500 bg-white" style={{ gridTemplateColumns: `repeat(${keys.length}, 1fr)` }}>
            {
                keys.map((key: any, i: number) => {
                    return (
                        <div key={i} className={`text-center py-3 text-[12px] ${i == active && "bg-outline-300 rounded-2xl"} cursor-pointer`} onClick={() => setActive(i)}>
                            {key.title}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SwitchTabs
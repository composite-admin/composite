"use client"

import { useState } from "react"

export interface Key {
    title: String,
    component: any
}

interface TabsInterface {
    keys: Key[],
    setComp?: any
}

const SwitchTabs = ({ keys, setComp }: TabsInterface) => {
    const [active, setActive] = useState(0)
    return (
        <div className="grid rounded-md border-2 border-outline-500 bg-white" style={{ gridTemplateColumns: `repeat(${keys.length}, 1fr)` }}>
            {
                keys.map((key: any, i: number) => {
                    return (
                        <div key={i} className={`text-center py-3 text-[12px] ${i == active && "bg-outline-300 rounded-md"} cursor-pointer`} onClick={() => {setActive(i); setComp(key.component)}}>
                            {key.title}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SwitchTabs
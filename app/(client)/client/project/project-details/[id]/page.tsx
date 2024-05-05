"use client";
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type tabType = "Project Details" | "Project Images" | "Project Flat";

const Tabs = [
  {
    name: "Project Details",
    id: "Project Details",
  },
  {
    name: "Project Images",
    id: "Project Images",
  },
  {
    name: "Project Flat",
    id: "Project Flat",
  },
];

export default function ClientProjectDetailsPage() {
  const [tab, setTab] = useState<tabType>("Project Details");

  return (
    <div>
      <div>
        <GoBack />
      </div>
      <div className="flex justify-between py-5">
        <div className="space-y-1">
          <h1 className="font-semibold md:text-2xl">
            High Cost Tower Renovation
          </h1>
          <p className="text-textColor text-base">See Project Details here</p>
        </div>
        <div>
          <Button>Send Comment</Button>
        </div>
      </div>

      <section className="py-4">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {Tabs.map((item) => (
              <li className="me-2" key={item.id}>
                <a
                  href="#"
                  className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                    tab === item.id
                      ? "text-blue-600 border-blue-600 font-semibold"
                      : "text-gray-600 border-transparent"
                  }`}
                  onClick={() => setTab(item.id as tabType)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

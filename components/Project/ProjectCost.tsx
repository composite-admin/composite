import React from 'react'
import DashboardCard from '../Dashboard/DashboardCard'
import { TotalProjectsIcon } from "../icons";
import { formatCurrency } from "@/utils/formatCurrency";

interface CardDeetz {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  withIcon?: boolean;
}

const cardDeetz: CardDeetz[] = [
  {
    title: "Total Project Cost",
    description: "200,000",
    icon: <TotalProjectsIcon />,
    withIcon: true,
  },
  {
    title: "Total amount spent",
    description: "1200000",
    icon: <TotalProjectsIcon />,
    withIcon: true,
  },
  {
    title: "Total Startup Cost",
    description: "1200000",
    icon: <TotalProjectsIcon />,
    withIcon: true,
  },
  {
    title: "Total Contractor Cost",
    description: "1200000",
    icon: <TotalProjectsIcon />,
    withIcon: true,
  },
  {
    title: "Total Stakeholder Cost",
    description: "1200000",
    icon: <TotalProjectsIcon />,
    withIcon: true,
  },
  {
    title: "Total Cash Advance",
    description: "1200000",
    icon: <TotalProjectsIcon />,
    withIcon: true,
  },
  {
    title: "Total Money Spent on Materials",
    description: "1200000",
    icon: <TotalProjectsIcon />,
    withIcon: true,
  },
  {
    title: "Total Money spent on Tools and Machines",
    description: "1200000",
    icon: <TotalProjectsIcon />,
    withIcon: true,
  },
];

const ProjectCost = () => {
  return (
    <div className="py-3">
      <h2 className="text-[20px] font-[600] py-5">Project Cost</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-10 mt-2 rounded-lg">
        {cardDeetz.map((item: any, i: number) => {
          return (
            <DashboardCard
              key={i}
              description={formatCurrency(item.description)}
              title={item.title}
              icon={item.icon}
              withIcon={item.withIcon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCost
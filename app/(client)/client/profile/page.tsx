"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useClientStore, { editType } from "@/store/client/useClientStore";
import { Upload } from "lucide-react";
import Identification from "./components/Identification";
import Information from "./components/Information";
import Password from "./components/Password";

const Tabs = [
  {
    name: "Information",
    id: "information",
  },
  {
    name: "Identification",
    id: "identification",
  },
  {
    name: "Change Password",
    id: "password",
  },
];

export default function ClientProfilePage() {
  const { EditType, setEditType } = useClientStore();

  return (
    <div>
      <div>
        <h1 className="text-responsive font-semibold">Profile</h1>
      </div>
      <section className="py-4">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {Tabs.map((item) => (
              <li className="me-2" key={item.id}>
                <a
                  href="#"
                  className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                    EditType === item.id
                      ? "text-blue-600 border-blue-600 font-semibold"
                      : "text-gray-600 border-transparent"
                  }`}
                  onClick={() => setEditType(item.id as editType)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {EditType === "information" ? (
            <Information />
          ) : EditType === "identification" ? (
            <Identification />
          ) : (
            <Password />
          )}
        </div>
      </section>
      ``
    </div>
  );
}

"use server";
import { redirect } from "next/navigation";
import axios from "axios";
import { api } from "@/config/api";
import { ApiResponse, IClientData } from "./types";

export async function getAllClients(): Promise<IClientData[] | null> {
  try {
    const response = await api.get<ApiResponse<IClientData[]>>("/clients");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

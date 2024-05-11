"use client";
import GoBack from "@/components/shared/GoBack";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PageHead from "@/components/ui/pageHead";
import TextSkeleton from "@/components/shared/TextSkeleton";
import { formatDate } from "@/utils/formatDate";
import useWorkerJobsStore from "@/store/actions/worker/workerJobsActions";
import useWorkersActionsStore from "@/store/actions/worker/workersActions";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "@/utils/variants";
import BankDetailsModal from "./(modal)/bank-details";
import { useModal } from "@/utils/modalContext";
import { IWorkerData } from "@/utils/types";
import axios from "axios";
import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { data } from "../../contractors/pending-project/data";

const SingleWorker = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { fetching, worker: worker, getWorkerById } = useWorkersActionsStore();
  const {
    fetching: jobsFetching,
    workerJobs,
    getAllWorkerJobs,
  } = useWorkerJobsStore();

  const { showModal } = useModal();

  useEffect(() => {
    getWorkerById(params.id);
    getAllWorkerJobs();
  }, []);

  const editWorker = () => router.push(`/workers/${params.id}/edit`);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["get worker details"],
    queryFn: async () => {
      try {
        const response = await api.get(`/worker/${params.id}`);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    retryOnMount: true,
  });
  const workerDataArray: IWorkerData[] = [data?.data.data];
  const showBankModal = () =>
    showModal(
      worker && (
        <BankDetailsModal
          bankName={worker.bank_name}
          accountName={worker.account_name}
          accountNumber={worker.account_number}
        />
      )
    );

  return (
    <>
      <div>
        <div className="flex justify-between">
          <GoBack />
          <Button onClick={showBankModal}>{"View Bank Details"}</Button>
        </div>

        <div className="bg-white rounded-lg border-[#D0D5DD] py-10 my-10">
          <div className="grid grid-cols-3 p-5 gap-5">
            <div className="space-y-4">
              <AvatarComponent classes="size-24" />

              <AnimatePresence mode="wait">
                {worker?.createdAt && (
                  <motion.div {...opacityVariant} className="space-y-4">
                    <div className="space-y-1">
                      <h1 className="font-bold text-2xl capitalize">
                        {worker?.worker_company}
                      </h1>
                      <p className="font-light">
                        Submitted on {formatDate(`${worker?.createdAt}`)}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button onClick={editWorker}>Edit Worker</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="">
                <p className="text-[#475367] text-sm">Name:</p>
                <TextSkeleton text={worker?.worker_name} isLoading={fetching} />
              </div>

              <div className="">
                <p className="text-[#475367] text-sm">Company:</p>
                <TextSkeleton
                  text={worker?.worker_company}
                  isLoading={fetching}
                />
              </div>

              <div className="">
                <p className="text-[#475367] text-sm">Address:</p>
                <TextSkeleton
                  text={worker?.worker_address}
                  isLoading={fetching}
                />
              </div>

              <div className="">
                <p className="text-[#475367] text-sm">Phone:</p>
                <TextSkeleton
                  text={worker?.worker_ofc_phone}
                  isLoading={fetching}
                />
              </div>

              <div className="">
                <p className="text-[#475367] text-sm">Service Type:</p>
                <TextSkeleton
                  text={worker?.service_type}
                  isLoading={fetching}
                />
              </div>

              <div className="">
                <p className="text-[#475367] text-sm">Section:</p>
                <TextSkeleton text={worker?.section} isLoading={fetching} />
              </div>

              <div className="">
                <p className="text-[#475367] text-sm">Service:</p>
                <TextSkeleton
                  text={worker?.worker_service}
                  isLoading={fetching}
                />
              </div>

              <div className="">
                <p className="text-[#475367] text-sm">Email:</p>
                <TextSkeleton
                  text={worker?.worker_email}
                  isLoading={fetching}
                />
              </div>

              {/* <div>
                <p className="text-[#475367] text-sm">Bank Name:</p>
                <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.bank_name}</p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Account Name:</p>
                <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.account_name}</p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Account Number:</p>
                <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.account_number}</p>
              </div> */}

              <div>
                <p className="text-[#475367] text-sm">Comment:</p>
                <TextSkeleton text={worker?.comment} isLoading={fetching} />
              </div>
            </div>
          </div>
        </div>
        <PageHead
          headText="Worker's Jobs"
          subText="View all your worker's jobs here"
        />
        <DataTable
          columns={columns}
          data={workerDataArray ?? []}
          clickAction={() => {}}
          isLoading={jobsFetching}
        />
      </div>
    </>
  );
};

export default SingleWorker;

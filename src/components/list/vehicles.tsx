import { TableFooter, TableHeader } from "@/app/functions/table";
import { IDictionaryContent } from "@/interfaces/enums";
import { Svehicles , Vehicle } from "@/interfaces/DTO";
import { EyeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { ModalVehicle } from "@/app/functions/vechile";
import { useGetVehiclesQuery } from '@/app/store/apis';

export default function Vehicles() {

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<string>("1");
  const [modalInfos, setModalInfos] = useState<Vehicle | undefined>();

  const { data: vehicles } = useGetVehiclesQuery(currentPageNumber);

  useEffect(() => {
    if (vehicles) {
      let numberPages: number = vehicles?.count / 10;
        setMaxPage(
          numberPages % 1 === 0
            ? numberPages.toString()
            : (numberPages).toFixed(0)
        );
    }
  }, [vehicles]);

  const prevPage = () => {
    if (vehicles && vehicles?.previous) {
      setCurrentPageNumber((prevNumber) => prevNumber - 1);
    }
  };

  const nextPage = () => {
    if (vehicles && vehicles?.next && currentPageNumber !== Number(maxPage)) {
      setCurrentPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  return (
    <>
      {modalInfos && (
        <ModalVehicle fSetterInfos={setModalInfos} infos={modalInfos} />
        
      )}
      <>
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <TableHeader
            headers={[
              "Name",
              "Model",
              "Crew",
              "max  atmosphering speed",
              "Full infos",
            ]}
          />

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {vehicles
              ? vehicles.results &&
              vehicles.results.map((vehicle, index) => {
                  return (
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="font-medium text-gray-700">
                          {vehicle.name}
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                          {vehicle.model}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-600">
                          {vehicle.crew}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {vehicle.max_atmosphering_speed}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-4">
                          <a
                            onClick={() =>
                              setModalInfos(vehicles.results[index])
                            }
                            className="cursor-pointer"
                          >
                            <EyeIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : Array.from({ length: 10 }, (_, index) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <a className="cursor-wait">
                          <EyeIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <TableFooter
          fPrevPage={() => prevPage()}
          fNextPage={() => nextPage()}
          currentPage={currentPageNumber}
          numberPages={maxPage}
        />
      </>
    </>
  );
}

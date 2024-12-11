import { ModalSpecies } from "@/app/functions/specie";
import { TableFooter, TableHeader } from "@/app/functions/table";
import { IDictionaryContent } from "@/interfaces/enums";
import { Sspecies , Specie } from "@/interfaces/DTO";
import { EyeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Species(props: { data: IDictionaryContent }) {
  const { data } = props;
  const [species, setSpecies] = useState<Sspecies>();
  const [apiRequest, setApiRequest] = useState<string>(data.value);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<string>("1");
  const [modalInfos, setModalInfos] = useState<Specie | undefined>();

  useEffect(() => {
    axios
      .get<Sspecies>(apiRequest)
      .then(function (response) {
        setSpecies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apiRequest]);

  useEffect(() => {
    if (species) {
      var numberPages: number = species?.count / 10;

      numberPages > 10 &&
        setMaxPage(
          numberPages % 1 === 0
            ? numberPages.toString()
            : (numberPages + 1).toFixed(0)
        );
    }
  }, [species]);

  const prevPage = () => {
    if (species && species?.previous) {
        setSpecies(undefined);
      setApiRequest(species.previous);
      setCurrentPageNumber((prevNumber) => prevNumber - 1);
    }
  };

  const nextPage = () => {
    if (species && species?.next) {
        setSpecies(undefined);
      setApiRequest(species.next);
      setCurrentPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  return (
    <>
      {modalInfos && (
        <ModalSpecies fSetterInfos={setModalInfos} infos={modalInfos} />
        
      )}
      <>
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <TableHeader
            headers={[
              "Name",
              "Classification",
              "Designation",
              "language",
              "Full infos",
            ]}
          />

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {species
              ? species.results &&
              species.results.map((specie, index) => {
                  return (
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="font-medium text-gray-700">
                          {specie.name}
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                          {specie.classification}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-600">
                          {specie.designation}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {specie.language}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-4">
                          <a
                            onClick={() =>
                              setModalInfos(species.results[index])
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

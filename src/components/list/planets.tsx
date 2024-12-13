import { GetPopulationChip, ModalPlanet } from "@/app/functions/planets";
import { TableFooter, TableHeader } from "@/app/functions/table";
import { Planet } from "@/interfaces/DTO";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useGetPlantesQuery } from '@/app/store/apis'
import { useDebounce } from '@/app/hooks/debounce';

export default function SwapiPlanets() {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<string>("1");
  const [modalInfos, setModalInfos] = useState<Planet | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 750);

  const { data: plantesData } = useGetPlantesQuery({ page: currentPageNumber, searchTerm: debouncedSearchTerm });

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPageNumber(1)
  };


  useEffect(() => {
    if (plantesData) {
      var numberPages: number = plantesData?.count / 10;

      setMaxPage(
        Math.ceil(numberPages).toFixed(0)
      );
    }
  }, [plantesData]);

  const prevPage = () => {
    if (plantesData && plantesData?.previous) {
      setCurrentPageNumber((prevNumber) => prevNumber - 1);
    }
  };

  const nextPage = () => {
    if (plantesData && plantesData?.next && currentPageNumber !== Number(maxPage)) {
      setCurrentPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  return (
    <>
      {modalInfos && (
        <ModalPlanet fSetterInfos={setModalInfos} infos={modalInfos} />
      )}
      <>
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black"
        />
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <TableHeader
            headers={[
              "Name",
              "Climate",
              "Gravity",
              "Terrain",
              "Population",
              "Full infos",
            ]}
          />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {plantesData
              ? plantesData.results &&
              plantesData.results.map((planet, index) => {
                return (
                  <tr className="hover:bg-gray-50" key={planet.created}>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="font-medium text-gray-700">
                        {planet.name}
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                        {planet.climate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full border-gray-600 px-2 py-1 text-xs font-semibold text-gray-600">
                        {planet.gravity}
                      </span>
                    </td>
                    <td className="px-6 py-4">{planet.terrain}</td>
                    <td className="px-6 py-4">
                      {GetPopulationChip(planet.population)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <a
                          onClick={() =>
                            setModalInfos(plantesData.results[index])
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

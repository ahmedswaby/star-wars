/* eslint-disable @next/next/no-img-element */
import { GetGenderChip } from "@/app/functions/characters";
import { ModalPeople } from "@/app/functions/people";
import { TableFooter, TableHeader } from "@/app/functions/table";
import { Character } from "@/interfaces/DTO";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useGetPeopleQuery } from '@/app/store/apis';
import { useDebounce } from '@/app/hooks/debounce';

export default function People() {

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<string>("1");
  const [modalInfos, setModalInfos] = useState<Character | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 750);

  const { data: poeple } = useGetPeopleQuery({ page: currentPageNumber, searchTerm: debouncedSearchTerm });

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPageNumber(1)
  };

  useEffect(() => {
    if (poeple) {
      let numberPages: number = poeple?.count / 10;
      setMaxPage(
        Math.ceil(numberPages).toFixed(0)
      );
    }
  }, [poeple])




  const prevPage = () => {
    if (poeple && poeple?.previous) {
      setCurrentPageNumber((prevNumber) => prevNumber - 1);
    }
  };

  const nextPage = () => {
    if (poeple && poeple?.next && currentPageNumber !== Number(maxPage)) {
      setCurrentPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  return (
    <>
      {modalInfos && (
        <ModalPeople fSetterInfos={setModalInfos} infos={modalInfos} />
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
            headers={["Name", "Height", "Mass", "Gender", "Full infos"]}
          />

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {poeple
              ? poeple.results &&
              poeple.results.map((character, index) => {
                return (
                  <tr className="hover:bg-gray-50" key={character.created}>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="font-medium text-gray-700">
                        {character.name}
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                        {character.height + " "}cm
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-600">
                        {character.mass + " "}kg
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {GetGenderChip(character.gender)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <a
                          onClick={() =>
                            setModalInfos(poeple.results[index])
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

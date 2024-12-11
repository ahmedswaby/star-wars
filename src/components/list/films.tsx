import { ModalFilms } from "@/app/functions/films";
import { TableFooter, TableHeader } from "@/app/functions/table";
import { IDictionaryContent } from "@/interfaces/enums";
import { Film, SFilms } from "@/interfaces/DTO";
import { EyeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Films(props: { data: IDictionaryContent }) {
  const { data } = props;
  const [films, setFilms] = useState<SFilms>();
  const [apiRequest, setApiRequest] = useState<string>(data.value);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<string>("1");
  const [modalInfos, setModalInfos] = useState<Film | undefined>();

  useEffect(() => {
    axios
      .get<SFilms>(apiRequest)
      .then(function (response) {
        setFilms(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apiRequest]);

  useEffect(() => {
    if (films) {
      var numberPages: number = films?.count / 10;

      numberPages > 10 &&
        setMaxPage(
          numberPages % 1 === 0
            ? numberPages.toString()
            : (numberPages + 1).toFixed(0)
        );
    }
  }, [films]);

  const prevPage = () => {
    if (films && films?.previous) {
        setFilms(undefined);
      setApiRequest(films.previous);
      setCurrentPageNumber((prevNumber) => prevNumber - 1);
    }
  };

  const nextPage = () => {
    if (films && films?.next) {
        setFilms(undefined);
      setApiRequest(films.next);
      setCurrentPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  return (
    <>
      {modalInfos && (
        <ModalFilms fSetterInfos={setModalInfos} infos={modalInfos} />
      )}
      <>
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <TableHeader
            headers={[
              "Title",
              "Director",
              "Producer",
              "Release Date",
              "Full infos",
            ]}
          />

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {films
              ? films.results &&
              films.results.map((film, index) => {
                  return (
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="font-medium text-gray-700">
                          {film.episode_id + ". " + film.title}
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                          {film.director}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-600">
                          {film.producer}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {film.release_date.toString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-4">
                          <a
                            onClick={() =>
                              setModalInfos(films.results[index])
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

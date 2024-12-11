import { Character } from "@/interfaces/DTO";
import { GetGenderChip } from "./characters";

export function ModalPeople(props: {
  infos: Character;
  fSetterInfos: (param: undefined) => void;
}) {
  const { infos, fSetterInfos } = props;

  return (
    <div
      id="peopleModal"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full m-auto bg-gray-50p"
    >
      <div className="relative w-full max-w-2xl max-h-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {infos.name}
            </h3>
            <button
              type="button"
              onClick={() => fSetterInfos(undefined)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Gender : {GetGenderChip(infos.gender)}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Height :{" "}
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                {infos.height + " "}cm
              </span>
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Mass :
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-600">
                {" " + infos.mass + " "}kg
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

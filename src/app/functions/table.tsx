import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function TableHeader(props: { headers: Array<string> }) {
  const { headers } = props;
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header, index) => {
          return (
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
              key={index}
            >
              {header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export function TableFooter(props: {
  fPrevPage: () => void;
  fNextPage: () => void;
  currentPage: number;
  numberPages: string;
}) {
  const { fPrevPage, fNextPage, currentPage, numberPages } = props;

  return (
    <div className="flex flex-row text-gray-900 w-full justify-between bg-gray-200">
      <div className="flex justify-center px-6 py-4 w-1/6">
        <button
          className=" flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => fPrevPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="flex justify-center px-6 py-4 w-4/6 items-center">
        {<p>{`${currentPage} | ${numberPages}`}</p>}
      </div>
      <div className="flex justify-center px-6 py-4 w-1/6">
        {" "}
        <button
          className=" flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => fNextPage()}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

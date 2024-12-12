"use client";

import { IDictionaryContent } from "@/interfaces/enums";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Menu(props: {
  menus: IDictionaryContent[] | undefined;
  indexChanger: any;
  selectedIndex: number;
}) {
  const { menus, indexChanger, selectedIndex } = props;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" data-test-id="menu">
      <div className="flex items-center px-4 py-3 sm:px-6">
        <div className="flex flex-1 sm:hidden">
          <a
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            onClick={() => indexChanger(selectedIndex - 1)}
            key={0}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            onClick={() => indexChanger(selectedIndex + 1)}
            key={1}
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white"
              aria-label="Pagination"
            >
              <a
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                onClick={() => indexChanger(selectedIndex - 1)}
                key={0}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {menus &&
                menus.map((menu, index) => {
                  return index == selectedIndex ? (
                    <a
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize cursor-pointer"
                      onClick={() => indexChanger(index)}
                      key={index + 2}
                      data-test-id={menu.key}
                    >
                      {menu.key}
                    </a>
                  ) : (
                    <a
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 capitalize cursor-pointer"
                      onClick={() => indexChanger(index) + 2}
                    >
                      {menu.key}
                    </a>
                  );
                })}
              <a
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                onClick={() => indexChanger(selectedIndex + 1)}
                key={1}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

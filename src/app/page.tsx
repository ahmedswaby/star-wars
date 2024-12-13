"use client";
import { useState , useEffect } from 'react';
import { IDictionaryContent } from '@/interfaces/enums';
import Menu from "@/components/menu/index";
import Tabs from "@/components/menu/tabs";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useGetApisQuery } from './store/apis';

export default function Home() {
  
  const [menu, setMenu] = useState<IDictionaryContent[]>();
  const { data } = useGetApisQuery()
  const [index, setIndex] = useState<number>(0);

  const changeIndex = (number: number) => {
    if (number >= 0 && number < menu!.length) {
      setIndex(number);
    }
  };

  useEffect(() => {
    if(data) {
      let mappedDictionary: IDictionaryContent[] = Object.entries(
        data
      ).map(([key, value]) => {
        return {
          key,
          value,
        };
      });
      setMenu(mappedDictionary);
    }
  }, [data]);


  return (
    <>
      {menu ? (
        <main className="flex min-h-screen flex-col items-center sm:p-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-10"
          >
            <div className="blur-[106px] h-80 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-64 bg-gradient-to-r from-purple-400 to-cyan-300 dark:to-indigo-600"></div>
          </div>
          <Menu
            data-testid="menu"
            menus={menu}
            indexChanger={changeIndex}
            selectedIndex={index}
          />
          <Tabs menu={menu[index]} />
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center bg-indigo-500 justify-center">
          <div className="flex flex-row animate-ping">
            <p className="text-2xl font-semibold text-white mr-3">
              Loading...
            </p>
            <RocketLaunchIcon data-testid="rocket-icon" className="h-8 w-8 text-white" />
          </div>
        </main>
      )}
    </>
  );
}

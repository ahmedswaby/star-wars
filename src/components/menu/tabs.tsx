"use client";

import Films from "@/components/list/films";
import NotImplementedMenu from "@/components/list/notimplemented";
import People from "@/components/list/people";
import Planets from "@/components/list/planets";
import Species from "@/components/list/species";
import Vehicles from "@/components/list/vechiles";
import Starships from "@/components/list/starships";
import { IDictionaryContent } from "@/interfaces/enums";

export default function Tabs(props: { menu: IDictionaryContent }) {
  const { menu } = props;

  switch (menu.key) {
    case "people":
      return <People data={menu} />;
    case "planets":
      return <Planets data={menu} />;
    case "films":
      return <Films data={menu} />;
    case "species":
      return <Species data={menu} />;
    case "species":
      return <Species data={menu} />;
    case "vehicles":
      return <Vehicles data={menu} />;
    case "starships":
      return <Starships data={menu} />;

    default:
      return <NotImplementedMenu />;
  }
}

"use client";

import Films from "@/components/list/films";
import NotImplementedMenu from "@/components/list/notimplemented";
import People from "@/components/list/people";
import Planets from "@/components/list/planets";
import Species from "@/components/list/species";
import Vehicles from "@/components/list/vehicles";
import Starships from "@/components/list/starships";
import { IDictionaryContent } from "@/interfaces/enums";

export default function Tabs(props: { menu: IDictionaryContent }) {
  const { menu } = props;

  switch (menu.key) {
    case "people":
      return <People />;
    case "planets":
      return <Planets />;
    case "films":
      return <Films />;
    case "species":
      return <Species />;
    case "vehicles":
      return <Vehicles />;
    case "starships":
      return <Starships />;

    default:
      return <NotImplementedMenu />;
  }
}

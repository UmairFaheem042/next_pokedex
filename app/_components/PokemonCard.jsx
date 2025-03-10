import { capitalizeFirst } from "@/utils/formatText";
import Link from "next/link";
import React from "react";

const PokemonCard = ({ item }) => {
  return (
    <Link
      href={`/pokemon/${item.id}`}
      className="border-2 border-orange-800/20 rounded-lg flex flex-col items-center justify-center p-4 gap-2"
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-[200px] object-cover"
      />
      <h5 className="font-semibold">{capitalizeFirst(item.name)}</h5>
    </Link>
  );
};

export default PokemonCard;

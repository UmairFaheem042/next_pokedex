import React from "react";
import PokemonCard from "@/app/_components/PokemonCard";
import { colours } from "@/utils/colours";
import Pagination from "@/app/_components/Pagination";
import { constants } from "@/utils/constants";

async function fetchPokemons(offset) {
  try {
    const res = await fetch(
      `${constants.API_BASE_URL}?limit=${constants.PER_PAGE_POKEMONS}&offset=${offset}`
    );
    const data = await res.json();

    const pokemons = data.results.map((pokemon, index) => ({
      id: pokemon.url.split("/").filter(Boolean).pop(),
      name: pokemon.name,
      types: [],

      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
        .split("/")
        .filter(Boolean)
        .pop()}.png`,
    }));

    return {
      pokemons,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching pokemons");
  }
}

export default async function Page({ params }) {
  const page = Number(params.page) || 1;

  const offset = (page - 1) * process.env.PER_PAGE_POKEMONS;

  const { pokemons, next, previous } = await fetchPokemons(offset);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">All Pokémons</h1>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pokemons.map((item) => (
          <PokemonCard key={item.id} colours={colours} item={item} />
        ))}
      </div>

      <Pagination previous={previous} next={next} page={page} />
    </div>
  );
}

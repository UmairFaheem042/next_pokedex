"use client";

import { colours } from "@/utils/colours";
import { capitalizeFirst } from "@/utils/formatText";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { constants } from "@/utils/constants";

const PreviewPokemon = () => {
  const { id: pokemonId } = useParams();
  const router = useRouter();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPokemon = async () => {
    try {
      const res = await fetch(`${constants.API_BASE_URL}/${pokemonId}`);
      const data = await res.json();
      setPokemon(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [pokemonId]);
  console.log(pokemon);

  if (loading)
    return (
      <div className="h-[calc(100dvh-65px)] flex items-center justify-center">
        Loading....
      </div>
    );

  if (error) {
    <div className="relative h-[calc(100dvh-65px)] flex  items-center justify-center">
      <button
        className="btn btn-secondary absolute top-5 left-5"
        onClick={() => router.push("/home/page/1")}
      >
        Back
      </button>
      An Error Occurred
    </div>;
  }

  if (!pokemon)
    return (
      <div className="relative h-[calc(100dvh-65px)] flex  items-center justify-center">
        <button
          className="btn btn-secondary absolute top-5 left-5"
          onClick={() => router.push("/home/page/1")}
        >
          Back
        </button>
        Pokemon not found
      </div>
    );

  return (
    <div className="min-h-[calc(100dvh-65px)] relative">
      <button
        className="btn btn-secondary mx-5 my-4 md:m-0 md:absolute md:top-5 md:left-5"
        onClick={() => router.back()}
      >
        Back
      </button>
      <div className="p-6 max-w-[600px] mx-auto w-full flex flex-col items-center gap-4">
        <h1 className="text-5xl font-bold">{capitalizeFirst(pokemon?.name)}</h1>

        <div className="grid sm:grid-cols-2 place-content-center gap-2 rounded-lg overflow-hidden">
          <img
            src={pokemon?.sprites?.front_default}
            alt="front"
            className="border-2  border-orange-800/20 rounded-lg sm:w-full h-[250px] object-cover"
          />
          <img
            src={pokemon?.sprites?.back_default}
            alt="back"
            className="border-2  border-orange-800/20 rounded-lg sm:w-full h-[250px] object-cover"
          />
        </div>

        <ul className="flex items-center gap-3">
          {pokemon?.types?.map((type, index) => (
            <li
              key={index}
              className=" rounded-lg px-4 py-2"
              style={{ backgroundColor: colours[type.type.name] }}
            >
              {capitalizeFirst(type.type.name)}
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          <div>
            Height: <span className="font-bold">{pokemon?.height}</span>
          </div>
          <div>
            Weight: <span className="font-bold">{pokemon?.weight}</span>
          </div>
        </div>

        <div className="flex gap-2 items-center w-full sm:w-auto">
          {/* <span>Moves: </span> */}
          <ul className="grid sm:grid-cols-2 gap-2 w-full">
            {pokemon?.stats?.map((stat, index) => (
              <li
                key={index}
                className="rounded-lg px-4 py-2 flex flex-col items-center border-2  border-orange-800/20 w-full"
              >
                <span>{capitalizeFirst(stat?.stat?.name)}</span>
                <span>{stat?.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PreviewPokemon;

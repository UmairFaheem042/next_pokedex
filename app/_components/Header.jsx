"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const Header = () => {
  const router = useRouter();
  const searchInputRef = useRef(null);

  async function handleSearchPokemon(e) {
    e.preventDefault();

    const query = searchInputRef.current.value.trim();
    if (!query) return;

    router.push(`/pokemon/${query}`);

    searchInputRef.current.value = "";
  }

  return (
    <header className="flex  gap-2 items-center justify-between px-6 h-16 border-b border-gray-200">
      <Link href="/" className="font-semibold">
        Pokédex
      </Link>
      <form onSubmit={handleSearchPokemon}>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            ref={searchInputRef}
          />
        </label>
      </form>
    </header>
  );
};

export default Header;

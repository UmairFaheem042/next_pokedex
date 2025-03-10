"use client";

import Link from "next/link";
import React from "react";

const Pagination = ({ previous, next, page }) => {
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="join">
        {previous && (
          <Link href={`/home/page/${page - 1}`} className="join-item btn">
            «
          </Link>
        )}
        <span className="join-item py-2 px-4">Page {page}</span>
        {next && (
          <Link href={`/home/page/${page + 1}`} className="join-item btn">
            »
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;

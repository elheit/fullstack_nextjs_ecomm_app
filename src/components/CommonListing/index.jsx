"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButton";
import ProductTile from "./ProductTile";
import { useEffect } from "react";

const CommonListing = ({ data }) => {
  const route = useRouter();
  useEffect(() => {
    route.refresh();
  }, []);
  return (
    <section className="bg-white py-12 sm:py-16 ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                  
                >
                  <ProductTile item={item} key={item._id} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
};

export default CommonListing;

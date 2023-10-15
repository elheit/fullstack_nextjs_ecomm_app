import React from "react";

const TileComponent = ({ data, select = [], onClick }) => {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap items-center gap-1">
      {data.map((dataItem) => (
        <label
          onClick={() => onClick(dataItem)}
          className={` cursor-pointer `}
          key={dataItem.id}
        >
          
          <span
            className={`rounded-lg border border-black px-6 py-2 font-bold  ${
              select &&
              select.length &&
              select.map((item) => item.id).indexOf(dataItem.id) !== -1
                ? "text-white bg-black "
                : ""
            } `}
          >
            {dataItem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
};

export default TileComponent;

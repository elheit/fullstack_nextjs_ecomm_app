const SelectComponent = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="relative ">
      <p className="pt-0 pr-2 pb-0 absolute bg-white pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gary-600">
        {label}
      </p>
      <select
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full 
       pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base bg-white border-gray-300 rounded-md  "
      >
        {options && options.length ? (
          options.map((option) => (
            <option key={option.id} id={option.id} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option id="" value={""}>
            Select
          </option>
        )}
      </select>
    </div>
  );
};

export default SelectComponent;

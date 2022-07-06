import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function DropDownMenu({
  values,
  defaultValue,
  onSelect,
  width,
}) {
  const [showList, setshowList] = useState(false);
  return (
    <div
      style={{ width }}
      className="relative bg-slate-50 rounded-md text-gray-700  "
      onMouseEnter={() => setshowList(true)}
      onMouseLeave={() => setshowList(false)}
    >
      <div className="flex items-end gap-2 px-4 py-1">
        <span>{defaultValue}</span>
        <FaAngleDown />
      </div>
      {showList && (
        <div className="absolute pt-1">
          <ul
            style={{ width }}
            className=" bg-slate-50 rounded-md text-gray-700  shadow-xl "
          >
            {values &&
              values.map((value) => (
                <li
                  className="py-2 px-4  hover:bg-gray-200 cursor-pointer"
                  key={`page_${value}`}
                  onClick={() => {
                    onSelect(value), setshowList(false);
                  }}
                >
                  {value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

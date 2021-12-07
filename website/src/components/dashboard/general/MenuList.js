import React from "react";
import * as ICON from "react-icons/bs";

export default function MenuList(props) {
  const Icon = ICON[props.bootstrapIcon];

  return (
    <>
      {props.active ? (
        <div
          className="flex justify-start items-center px-4 py-3 rounded-lg bg-primary text-white mb-2 cursor-pointer"
          onClick={props.onPress}
        >
          <div className="flex justify-center items-center mr-3">
            {React.createElement(Icon)}
          </div>
          <p className="font-semibold text-sm">{props.title}</p>
        </div>
      ) : (
        <div
          className="flex justify-start items-center px-4 py-3 rounded-lg text-[#8C8C8C] mb-2 cursor-pointer"
          onClick={props.onPress}
        >
          <div className="flex justify-center items-center mr-3">
            {React.createElement(Icon)}
          </div>
          <p className="font-semibold text-sm">{props.title}</p>
        </div>
      )}
    </>
  );
}

import React from "react";

// components
import LogoutBtn from "./LogoutBtn";
import MenuList from "./MenuList";

export default function LeftNav(props) {
  return (
    <div className="w-9/12 h-full text-[#2D2D2D]">
      <div className="h-[60px] pl-3">
        <p className="text-2xl font-bold ">Medicio Clinic</p>
        <p className="text-sm">Cyberjaya, Selangor</p>
      </div>
      <div className="h-[calc(100%-100px)] pt-[40px]">
        {/* ? NEW KNOWLEDGE */}
        {props.menuItem.map((list, index) => (
          <MenuList
            title={list.name}
            active={props.active === index}
            bootstrapIcon={list.icon}
            onPress={() => {
              props.setActive(index);
            }}
          />
        ))}
      </div>
      <div className="h-[40px] flex items-center justify-center">
        <LogoutBtn />
      </div>
    </div>
  );
}

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Guia = ({ title, description, StudentOrCompany }) => {
  return (
    <div className="w-full dark:bg-[#18181B] rounded-[20px] p-[40px] mt-[20px]">
      <h1 className="font-epilogue font-bold text-[30px] text-center  dark:text-[#f3f3f3]  light:text-[#15171a] pt-[20px] ">
        {title}
      </h1>
      <p className="font-epilogue dark:text-[#f3f3f3]  light:text-[#15171a] mt-[20px]">
        {description}
      </p>

      <div className="mt-[40px]  ">
        <Accordion variant="splitted">
          {StudentOrCompany.map((item) => (
            <AccordionItem
              key={item.Id}
              aria-label={item.AriaLabel}
              title={item.Title}
              className="dark:text-[#f3f3f3] rounded-[20px]  border-black light:text-[#15171a]"
            >
              {item.Description}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Guia;

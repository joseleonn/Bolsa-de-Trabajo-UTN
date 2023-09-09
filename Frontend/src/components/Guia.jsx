import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Guia = ({ title, description, StudentOrCompany }) => {
  return (
    <div className="w-full bg-[#262526] rounded-[20px] p-[40px] mt-[20px]">
      <h1 className="font-epilogue font-bold text-[30px] text-center text-[#f3f3f3] pt-[20px] ">
        {title}
      </h1>
      <p className="font-epilogue text-[#d7d8da] mt-[20px]">{description}</p>

      <div className="mt-[40px]">
        <Accordion variant="splitted">
          {StudentOrCompany.map((item) => (
            <AccordionItem
              key={item.Id}
              aria-label={item.AriaLabel}
              title={item.Title}
              className="text-[#d7d8da]"
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

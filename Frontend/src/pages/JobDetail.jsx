import { Button } from "@nextui-org/react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { back } from "../assets";

const JobDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/Empleos`);
  };
  return (
    <div className="bg-[#18181B] shadow-xl rounded-[20px] p-[40px] mt-[70px] flex flex-wrap gap-3 items-center w-full justify-center md:justify-start">
      <div className="w-full">
        <h1 className="text-center font-bold font-epilogue text-[50px]">
          {state.title}
        </h1>

        <div className="mt-[40px]">
          <p className="font-epilogue ">{state.description}</p>

          <ul className="mt-[20px]">
            <span className="font-epilogue font-semibold text-[30px] mt-[30px]">
              Requisitos
            </span>

            <li className="uppercase">volar</li>
            <li>nadar</li>
            <li>inmortalidad</li>
          </ul>
          <span className="font-epilogue font-semibold text-[30px] mt-[30px]">
            Empresa
          </span>
          <p>
            Somos una empresa constructora que se dedica a construir cosas no
            construidas, construyendo de manera construida
          </p>
        </div>
        <div className="flex justify-end mt-[10px] gap-2">
          <Button
            color="default"
            radius="full"
            size="xl"
            onPress={handleNavigate}
            className="  text-white font-epilogue border-default-200 "
          >
            Volver
          </Button>

          <Button
            className=" bg-blue-600 text-white font-epilogue border-default-200  "
            radius="full"

            // onPress={() => setIsFollowed(!isFollowed)}
          >
            Postularse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

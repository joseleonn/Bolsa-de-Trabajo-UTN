import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

const CardJob = ({ title, description, company }) => {
  return (
    <div>
      {" "}
      <Card className="max-w-[340px] ">
        <CardHeader className="justify-between mt-[10px]">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {title}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {company}
              </h5>
            </div>
          </div>
          <Button
            className=" bg-blue-600 text-white font-epilogue border-default-200"
            radius="full"
            size="sm"
            // onPress={() => setIsFollowed(!isFollowed)}
          >
            Postularse
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p className="truncate">{description}</p>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">4</p>
            <p className=" text-default-400 text-small">Postulados</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardJob;

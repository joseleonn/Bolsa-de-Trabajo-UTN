import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  useDisclosure
} from '@nextui-org/react'
import ModalJob from './ModalJob'
import { useData } from '../context/DataContext'

const CardJob = ({ idJob, title, description, company, handleClick }) => {
  const { jobsAplicated } = useData()
  return (
    <div className="cursor-pointer" onClick={handleClick}>
      {' '}
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
          {jobsAplicated.some((job) => job.idPuesto === idJob) ? (
            <p>Aplicado</p>
          ) : (
            <Button
              className=" bg-blue-600 text-white font-epilogue border-default-200"
              radius="full"
              size="sm"
              onClick={handleClick}
            >
              Postularse
            </Button>
          )}
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
  )
}

export default CardJob

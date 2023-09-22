import React from "react";
import { CardJob } from "../components";
import { jobsTest } from "../constants";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  const handleNavigate = (job) => {
    navigate(`/Empleos/${job.id}`, { state: job });
  };
  return (
    <div className="mt-[100px] flex flex-wrap gap-3 items-center w-full justify-center md:justify-start">
      {jobsTest.map((job) => (
        <CardJob
          key={job.id}
          title={job.title}
          company={job.company}
          description={job.description}
          handleClick={() => handleNavigate(job)}
        />
      ))}
    </div>
  );
};

export default Jobs;

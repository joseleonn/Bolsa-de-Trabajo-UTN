import React from "react";
import { CardJob } from "../components";
import { jobsTest } from "../constants";

const Jobs = () => {
  return (
    <div className="mt-[100px] flex flex-wrap gap-3 items-center w-full justify-center md:justify-start">
      {jobsTest.map((job) => (
        <CardJob
          title={job.title}
          company={job.company}
          description={job.description}
        />
      ))}
    </div>
  );
};

export default Jobs;

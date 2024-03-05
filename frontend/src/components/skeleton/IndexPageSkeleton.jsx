import React from "react";
import { Skeleton } from "../ui/skeleton";

const IndexPageSkeleton = () => {
  return (
    <div className="p-4 flex flex-col gap-2 m-2">
      <Skeleton className=" h-64 w-64 lg:h-72 lg:w-72 rounded-xl" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 " />
      <Skeleton className="h-5 w-1/3" />
    </div>
  );
};

export default IndexPageSkeleton;

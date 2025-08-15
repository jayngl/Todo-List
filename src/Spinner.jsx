import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = ({ isLoading }) => {
  return (
    <ClipLoader loading={isLoading} size={150} aria-label="Loading Spinner" />
  );
};

export default Spinner;

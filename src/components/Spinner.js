import React from "react";
import spinner from "../Fountain.gif";

export default function Spinner() {
  return (
    <div className="container text-center my-3">
      <img src={spinner} alt="" />
    </div>
  );
}

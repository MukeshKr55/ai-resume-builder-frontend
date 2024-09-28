import React from "react";

function Summary({ resumeInfo }) {
  return <p className="text-xs">{resumeInfo.summary}</p>;
}

export default Summary;

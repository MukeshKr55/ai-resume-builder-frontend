import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetail from "./preview/PersonalDetail";
import Experience from "./preview/Experience";
import Summary from "./preview/Summary";
import Education from "./preview/Education";
import Skills from "./preview/Skills";

function PreviewSection() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal Detail */}
      <PersonalDetail resumeInfo={resumeInfo} />

      {/* Summary */}
      <Summary resumeInfo={resumeInfo} />

      {/* Professional Exp */}
      <Experience resumeInfo={resumeInfo} />

      {/* Education */}
      <Education resumeInfo={resumeInfo} />

      {/* Skills */}
      <Skills resumeInfo={resumeInfo} />
    </div>
  );
}

export default PreviewSection;

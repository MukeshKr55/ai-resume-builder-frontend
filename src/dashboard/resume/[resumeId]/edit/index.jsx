import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import PreviewSection from "../../components/PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderPinwheel } from "lucide-react";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((res) => {
      setResumeInfo(res.data.data);
    });
  };

  if (!resumeInfo) {
    return (
      <div className="flex justify-center items-center h-[calc(100dvh-200px)]">
        {/* <LoaderPinwheel
          size={200}
          className="h-screen mx-auto my-auto animate-spin text-primary"
        /> */}
        <img
          className="text-purple-500 animate-spin spin-in-180"
          src="/loading.gif"
          alt="loader"
        />
      </div>
    );
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section  */}
        <FormSection />

        {/* Preview Section */}
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;

import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeItem from "./components/ResumeItem";

function Dashboard() {
  const [resumeList, setResumeList] = useState([]);

  const { user } = useUser();

  const GetResumeList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        setResumeList(res.data.data);
      }
    );
  };

  useEffect(() => {
    user && GetResumeList();
  }, [user]);

  if (!user) {
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
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p className="">Start Creating AI resume for your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, idx) => (
            <ResumeItem resume={resume} key={idx} refreshData={GetResumeList} />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;

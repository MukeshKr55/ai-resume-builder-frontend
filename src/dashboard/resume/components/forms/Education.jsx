import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { CirclePlus, Loader2, MinusCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

function Education() {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [education, setEducation] = useState([
    {
      universityName: "",
      startDate: "",
      endDate: "",
      degree: "",
      major: "",
      description: "",
    },
  ]);

  const handleChange = (e, idx) => {
    const newEdu = education.slice();
    const { name, value } = e.target;
    newEdu[idx][name] = value;
    setEducation(newEdu);
  };

  const addEdu = () => {
    setEducation([
      ...education,
      {
        universityName: "",
        startDate: "",
        endDate: "",
        degree: "",
        major: "",
        description: "",
      },
    ]);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: education.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details Updated!");
      },
      (err) => {
        setLoading(false);
        toast("Server Error, Please try again");
      }
    );
  };

  useEffect(() => {
    resumeInfo?.education.length > 0 && setEducation(resumeInfo?.education);
  }, []);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education });
  }, [education]);

  return (
    <div className="p-5 shadow-lg border-t-primary border-t-4 rounded-lg mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p className="">Add your educational details</p>
      <div className="">
        {education.map((item, idx) => (
          <div key={idx} className="">
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label htmlFor="" className="text-xs">
                  University Name
                </label>
                <Input
                  defaultValue={item?.universityName}
                  name="universityName"
                  onChange={(e) => handleChange(e, idx)}
                ></Input>
              </div>
              <div className="">
                <label htmlFor="" className="text-xs">
                  Degree
                </label>
                <Input
                  defaultValue={item?.degree}
                  name="degree"
                  onChange={(e) => handleChange(e, idx)}
                ></Input>
              </div>
              <div className="">
                <label htmlFor="" className="text-xs">
                  Major
                </label>
                <Input
                  defaultValue={item?.major}
                  name="major"
                  onChange={(e) => handleChange(e, idx)}
                ></Input>
              </div>
              <div className="">
                <label htmlFor="" className="text-xs">
                  Start Date
                </label>
                <Input
                  defaultValue={item?.startDate}
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, idx)}
                ></Input>
              </div>
              <div className="">
                <label htmlFor="" className="text-xs">
                  End Date
                </label>
                <Input
                  defaultValue={item?.endDate}
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, idx)}
                ></Input>
              </div>
              <div className="col-span-2">
                <label htmlFor="" className="text-xs">
                  Description
                </label>
                <Input
                  defaultValue={item?.description}
                  name="description"
                  onChange={(e) => handleChange(e, idx)}
                ></Input>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <Button variant="outline" className="text-primary" onClick={addEdu}>
              <CirclePlus size={20} className="hover:animate-bounce mr-1" />
              Add More Education
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={() => setEducation((edu) => edu.slice(0, -1))}
            >
              <MinusCircle size={20} className="hover:animate-bounce mr-1" />
              Remove
            </Button>
          </div>
          <Button onClick={onSave}>
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;

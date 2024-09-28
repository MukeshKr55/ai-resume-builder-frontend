import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Loader2, MinusCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Experience() {
  const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary: "",
  };
  const { resumeId } = useParams();

  const [experience, setExperience] = useState([formField]);
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.experience.length > 0 && setExperience(resumeInfo?.experience);
  }, []);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience,
    });
  }, [experience]);

  const handleChange = (e, idx) => {
    const newEntries = experience.slice();
    const { name, value } = e.target;
    newEntries[idx][name] = value;
    setExperience(newEntries);
  };

  const AddNewExp = () => {
    setExperience([...experience, formField]);
  };
  const RemoveExp = () => {
    setExperience((experience) => experience.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, idx) => {
    const newEntries = experience.slice();
    newEntries[idx][name] = e.target.value;
    setExperience(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experience.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details Updated!");
      },
      (err) => {
        console.error(err);
        setLoading(false);
        toast("Server Error, Please try again");
      }
    );
  };

  return (
    <div className="p-5 shadow-lg border-t-primary border-t-4 rounded-lg mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p className="">Add your job experience</p>
      <div className="">
        {experience.map((item, idx) => (
          <div key={idx} className="">
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="">
                <label htmlFor="" className="text-xs">
                  Position Title
                </label>
                <Input
                  defaultValue={item?.title}
                  name="title"
                  onChange={(e) => {
                    handleChange(e, idx);
                  }}
                />
              </div>
              <div className="">
                <label htmlFor="" className="text-xs">
                  Company Name
                </label>
                <Input
                  defaultValue={item?.companyName}
                  name="companyName"
                  onChange={(e) => {
                    handleChange(e, idx);
                  }}
                />
              </div>
              <div className="">
                <label htmlFor="" className="text-xs">
                  City
                </label>
                <Input
                  defaultValue={item?.city}
                  name="city"
                  onChange={(e) => {
                    handleChange(e, idx);
                  }}
                />
              </div>
              <div className="">
                <label htmlFor="" className="text-xs">
                  State
                </label>
                <Input
                  defaultValue={item?.state}
                  name="state"
                  onChange={(e) => {
                    handleChange(e, idx);
                  }}
                />
              </div>
              <div className="">
                <label htmlFor="" className="text-xs">
                  Start Date
                </label>
                <Input
                  defaultValue={item?.startDate}
                  type="date"
                  name="startDate"
                  onChange={(e) => {
                    handleChange(e, idx);
                  }}
                />
              </div>
              <div className="">
                <label htmlFor="" className="text-xs">
                  End Date
                </label>
                <Input
                  defaultValue={item?.endDate}
                  type="date"
                  name="endDate"
                  onChange={(e) => {
                    handleChange(e, idx);
                  }}
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  idx={idx}
                  defaultValue={item?.workSummary}
                  onRichTextEditorChange={(e) =>
                    handleRichTextEditor(e, "workSummary", idx)
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewExp}
            >
              <CirclePlus size={20} className="hover:animate-bounce mr-1" />
              Add More Experience
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveExp}
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

export default Experience;

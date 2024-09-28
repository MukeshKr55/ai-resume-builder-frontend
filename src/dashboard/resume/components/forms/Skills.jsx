import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { CirclePlus, Loader2, MinusCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Skills() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  const handleChange = (idx, name, value) => {
    const newEnt = skills.slice();
    newEnt[idx][name] = value;
    setSkills(newEnt);
  };

  const addSkills = () => {
    setSkills([
      ...skills,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeSkills = () => {
    setSkills((p) => p.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skills.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details Updated!");
      },
      (err) => {
        console.log(err);
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  useEffect(() => {
    resumeInfo?.skills.length > 0 && setSkills(resumeInfo?.skills);
  }, []);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, skills });
  }, [skills]);

  return (
    <div className="p-5 shadow-lg border-t-primary border-t-4 rounded-lg mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p className="">Add your top professional skills</p>
      <div className="">
        {skills.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between border rounded-lg p-3 my-2"
          >
            <div className="">
              <label htmlFor="" className="">
                Name
              </label>
              <Input
                defaultValue={item?.name}
                onChange={(e) => handleChange(idx, "name", e.target.value)}
              ></Input>
            </div>
            <Rating
              defaultValue={item?.rating}
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(idx, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between ">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={addSkills}
          >
            <CirclePlus size={20} className="hover:animate-bounce mr-1" />
            Add More Skills
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeSkills}
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
  );
}

export default Skills;

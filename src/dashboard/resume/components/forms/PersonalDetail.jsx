import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function PersonalDetail({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setResumeInfo({ ...resumeInfo, [name]: value });
  };

  const onSave = (e) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      data: formData,
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Detail Updated");
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg border-t-primary border-t-4 rounded-lg mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p className="">Get Started with the basic information</p>
      <form onSubmit={onSave} className="">
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div className="">
            <label className="text-sm" htmlFor="">
              First Name
            </label>
            <Input
              defaultValue={resumeInfo?.firstName}
              name="firstName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label className="text-sm" htmlFor="">
              Last Name
            </label>
            <Input
              defaultValue={resumeInfo?.lastName}
              name="lastName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm" htmlFor="">
              Job Title
            </label>
            <Input
              defaultValue={resumeInfo?.jobTitle}
              name="jobTitle"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm" htmlFor="">
              Address
            </label>
            <Input
              defaultValue={resumeInfo?.address}
              name="address"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label className="text-sm" htmlFor="">
              Phone
            </label>
            <Input
              defaultValue={resumeInfo?.phone}
              name="phone"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label className="text-sm" htmlFor="">
              Email
            </label>
            <Input
              defaultValue={resumeInfo?.email}
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;

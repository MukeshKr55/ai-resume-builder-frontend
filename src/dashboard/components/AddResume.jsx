import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const { user } = useUser();
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.CreateNewResume(data).then((res) => {
      if (res) {
        navigate(`/dashboard/resume/${res.data.data.documentId}/edit`);
      }
      console.log(res);
      setLoading(false);
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="p-14 py-24 border flex justify-center items-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md border-dashed hover:cursor-pointer">
            <PlusSquare className="w-8 h-8 text-primary" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume
            </DialogDescription>
          </DialogHeader>
          <div className="grid py-2">
            <Input
              onChange={(e) => setResumeTitle(e.target.value)}
              id="name"
              placeholder="Ex. Full Stack Resume"
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;

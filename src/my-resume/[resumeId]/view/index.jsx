import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import PreviewSection from "@/dashboard/resume/components/PreviewSection";
import { useEffect, useState, useRef } from "react";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import html2pdf from "html2pdf.js"; // Import html2pdf

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const [isDownloading, setIsDownloading] = useState(false); // State to toggle margin
  const { resumeId } = useParams();
  const resumeRef = useRef(null); // Ref to target the resume section for PDF

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((res) => {
      setResumeInfo(res.data.data);
    });
  };

  const handleDownload = () => {
    setIsDownloading(true); // Temporarily remove margins

    const element = resumeRef.current;
    const opt = {
      margin: 0, // No margin in the PDF
      filename: `${resumeInfo?.firstName}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Create the PDF
    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        setIsDownloading(false); // Restore the margins after download
      });
  };

  if (!resumeInfo) {
    return (
      <div className="flex justify-center items-center h-[calc(100dvh-200px)]">
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
      <div>
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium ">
            Congrats! Your Ultimate AI-generated Resume is Ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share a unique
            resume URL.
          </p>
          <div className="flex justify-between mx-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Please open the URL to see my Resume",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "my-resume/" +
                  resumeId +
                  "/view",
                title: resumeInfo.firstName + " Resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div
        className={`${isDownloading ? "" : "my-10 mx-10 md:mx-20 lg:mx-36"}`} // Conditionally apply margins
        ref={resumeRef}
      >
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;

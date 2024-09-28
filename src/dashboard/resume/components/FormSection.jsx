import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "../ThemeColor";

function FormSection() {
  const [activeFormIdx, setActiveFormIdx] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button size="sm">
              <Home size={20} />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIdx > 1 && (
            <Button onClick={() => setActiveFormIdx((p) => p - 1)} size="sm">
              <ArrowLeft />
            </Button>
          )}
          <Button
            onClick={() => setActiveFormIdx((p) => p + 1)}
            className="flex gap-2 "
            size="sm"
            disabled={!enableNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIdx === 1 ? (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIdx === 2 ? (
        <Summary enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIdx === 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIdx === 4 ? (
        <Education enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIdx === 5 ? (
        <Skills enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIdx === 6 ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : null}
    </div>
  );
}

export default FormSection;

import { Button } from "@/components/ui/button";
import { Atom, Brain } from "lucide-react";
import React, { useContext, useState } from "react";
import { chatSession } from "./../../../../service/GeminiModel";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";

function RichTextEditor({ onRichTextEditorChange, idx, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const GenetateAISummary = async () => {
    if (!resumeInfo.experience[idx].title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);

    // Send request to chatSession
    const result = await chatSession.sendMessage(
      `Position Title: ${resumeInfo.experience[idx].title}, Depends on position title give me 5-7 bullet points for my experience in resume, give me result in HTML format`
    );
    console.log(result.response.text());

    setValue(result.response.text().replace("[", "").replace("]", ""));

    setLoading(false);
  };

  return (
    <div className="">
      <div className="flex justify-between items-end my-2">
        <label htmlFor="" className="text-xs">
          Summary
        </label>
        <Button
          className="flex gap-2 border-primary text-primary"
          variant="outline"
          onClick={GenetateAISummary}
        >
          {loading ? (
            <Atom className="animate-spin" />
          ) : (
            <Brain className="h-5 w-5" />
          )}
          Generate From AI
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;

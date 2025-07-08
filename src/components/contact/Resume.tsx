import { LinkArrowOut } from "../ui/Button";

export function ResumeLinks() {
  return (
    <div className="flex gap-2">
      <LinkArrowOut title="View Resume" url="/pdf/resume.pdf" />
      <a href="/pdf/resume.pdf" download>
        Download Resume
      </a>
    </div>
  );
}

export function ResumeViewer() {
  return (
    <iframe
      src="/pdf/resume.pdf"
      width="100%"
      height="600"
      title="Resume"
      className="border !border-gray-300 !shadow-md/10 mt-4"
    />
  );
}

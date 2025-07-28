import { LinkArrowOut } from "../ui/Button";

/**
 * ResumeLinks
 *
 * A component that renders links to view and download the resume.
 * The "View Resume" link opens the resume PDF in a new tab,
 * while the "Download Resume" link allows users to download the PDF.
 */
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

/**
 * A component that renders a resume viewer with an iframe
 * pointing to the `/pdf/resume.pdf` file.
 */
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

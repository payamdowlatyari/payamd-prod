import { Metadata } from "next";

import CaseStudy from "~/lib/pages/projects/case-study";

export const metadata: Metadata = {
  title: "PhysicianGPS - Case Study",
  description:
    "A detailed case study of PhysicianGPS, a provider search and analytics platform for healthcare organizations. Explore the architecture, challenges, and solutions.",
};

export default function CaseStudyPage() {
  return <CaseStudy />;
}

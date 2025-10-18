import { useEffect } from "react";
import "./SectionContentStyles.css";

interface SectionContentProps {
  html: string;
}

const SectionContent = ({ html }: SectionContentProps) => {
  useEffect(() => {
    // Any additional client-side processing can go here
  }, [html]);

  return (
    <div 
      className="section-content-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default SectionContent;

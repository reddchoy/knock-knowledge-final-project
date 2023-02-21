import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  content: string;
}

const CourseContent = (props: Props) => {
  return (
    <>
      <ReactMarkdown className="reactMarkDown" remarkPlugins={[remarkGfm]}>
        {props.content}
      </ReactMarkdown>
    </>
  );
};

export default CourseContent;

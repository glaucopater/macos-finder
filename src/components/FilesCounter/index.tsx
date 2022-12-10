import "./FilesCounter.css";

export const FilesCounter = ({ count }: { count: number }) => (
  <span
    className="FilesCounter"
    title="Total Files"
    data-testid="files-counter"
  >
    {count}
  </span>
);

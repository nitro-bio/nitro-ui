import { FileUpload } from "./FileUpload";

export default {
  title: "UIElements/FileUpload",
  component: FileUpload,
};

export const FileUploadStory = () => {
  return (
    <FileUpload
      parseFile={async (f) => {
        return { fileName: f.name, success: true, data: { foo: "bar" } };
      }}
      upload={async (res: {
        fileName: string;
        success: true;
        data: unknown;
      }) => {
        alert("Uploaded " + res.fileName);
      }}
    />
  );
};

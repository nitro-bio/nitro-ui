import { classNames } from "@utils/stringUtils";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Table } from "..";

type FileParseSuccess<T> = {
  fileName: string;
  success: true;
  data: T;
};

type FileParseError = {
  fileName: string;
  success: false;
  error: string;
};

type FileParseResult<T> = FileParseSuccess<T> | FileParseError;

type FileUploadProps<T> = {
  parseFile: (file: File) => Promise<FileParseResult<T>>;
  upload: (res: FileParseSuccess<T>) => Promise<void>;
  className?: string;
};

export function FileUpload<T>({
  parseFile,
  upload,
  className,
}: FileUploadProps<T>) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [errors, setErrors] = useState<FileParseError[] | null>(null);
  const pushErrors = (errors: FileParseError[]) => {
    setErrors((prev) => {
      if (prev === null) {
        return errors;
      } else {
        return [...prev, ...errors];
      }
    });
  };
  const [successes, setSuccesses] = useState<FileParseSuccess<T>[] | null>(
    null,
  );
  useEffect(
    function parseFiles() {
      const asyncParseFiles = async () => {
        if (files === null) {
          return;
        } else {
          const promises = files.map(parseFile);
          const results = await Promise.all(promises);
          const _failures = results.filter(
            (res) => res.success === false,
          ) as FileParseError[];
          const _successes = results.filter(
            (res) => res.success === true,
          ) as FileParseSuccess<T>[];
          setErrors(_failures);
          setSuccesses(_successes);
        }
      };
      asyncParseFiles();
    },
    [files],
  );

  const handleChange = (files: File[]) => {
    setFiles(files);
  };

  const uploadFiles = async () => {
    if (successes === null || successes.length === 0) {
      alert("No files to upload");
      return;
    }

    successes.forEach((success) => {
      try {
        upload(success);
      } catch (error) {
        const err = error as Error;
        pushErrors([
          { fileName: success.fileName, success: false, error: err.message },
        ]);
      }
    });
  };

  if (files) {
    return (
      <div
        className={classNames(
          "flex h-full flex-col gap-8 rounded-xl transition-all duration-500 ease-in-out",
          className,
        )}
      >
        <ParseTable successes={successes} errors={errors} />

        <span className="flex justify-between gap-2">
          <button
            type="button"
            className="btn btn-error btn-md text-white"
            onClick={async () => {
              setFiles(null);
              setErrors(null);
              setSuccesses(null);
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-md"
            disabled={successes === null || successes.length === 0}
            onClick={async () => {
              if (!successes) {
                throw new Error("Successes is null");
              }
              uploadFiles();
            }}
          >
            Upload
          </button>
        </span>
      </div>
    );
  }

  const allowedFileTypes = ["gb", "gbk", "fa", "fasta", "fna", "txt"].map(
    (ext) => ext.toUpperCase(),
  );

  return (
    <div
      className={classNames(
        "flex h-full flex-col items-center justify-center gap-8 rounded-xl border-2 border-dashed border-brand-300 bg-noir-700 py-6 text-noir-500 transition-all duration-200 ease-in-out md:flex-row md:gap-4 md:divide-x-2",
        className,
      )}
    >
      <Dropzone onDrop={handleChange}>
        <div className="cursor-pointer space-y-1 text-center">
          <div className="flex text-sm text-noir-400">
            <p className="focus-within:ring-brand-500 relative cursor-pointer rounded-xl font-medium text-brand-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-brand-500">
              <span>Upload a file</span>
            </p>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-noir-300">
            .{allowedFileTypes.join(" .")}
          </p>
        </div>
      </Dropzone>
    </div>
  );
}

const Dropzone = ({
  onDrop,
  children,
}: {
  onDrop: (files: File[]) => void;
  children: React.ReactNode;
}) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="cursor-pointer space-y-1 text-center">
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

function ParseTable<T>({
  successes,
  errors,
}: {
  successes: FileParseSuccess<T>[] | null;
  errors: FileParseError[] | null;
}) {
  const data: { "File Name": string; Message: string }[] = [];
  if (successes) {
    successes.forEach((s) => {
      data.push({
        "File Name": s.fileName,
        Message: "Ready for Upload",
      });
    });
  }
  if (errors) {
    errors.forEach((e) => {
      data.push({
        "File Name": e.fileName,
        Message: e.error,
      });
    });
  }
  if (data.length === 0) {
    return <div className="text-red-400">{"No files uploaded"}</div>;
  }
  return <Table data={data} resultsPerPage={5} />;
}

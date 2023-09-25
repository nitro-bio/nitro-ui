import { classNames } from "@utils/stringUtils";
import { useEffect } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  [key: string]: boolean;
};

type Props = {
  onSubmit?: SubmitHandler<FormData>;
  onChange?: (data: FormData) => void;
  labels: string[];
  formClassName?: string;
  optionClassName?: string;
  submitButtonClassName?: string;
};

export function Checkboxes({
  onSubmit,
  onChange,
  labels,
  formClassName,
  optionClassName,
  submitButtonClassName,
}: Props) {
  const { handleSubmit, control, watch } = useForm<FormData>();

  const watchedFields = watch();
  useEffect(
    function callOnChange() {
      onChange?.(watchedFields);
    },
    [watchedFields, onChange]
  );

  if (new Set(labels).size !== labels.length) {
    const dups = labels.filter((label, idx) => labels.indexOf(label) !== idx);
    throw new Error(
      `Checbox labels must be unique. Duplicate labels: ${dups.join(", ")}`
    );
  }

  if (!onSubmit && !onChange) {
    throw new Error(
      "Checkboxes must have either an onSubmit or onChange handler"
    );
  }

  const internalOnSubmit = (data: FormData) => {
    onSubmit?.(data);
  };
  return (
    <form
      onSubmit={handleSubmit(internalOnSubmit)}
      className={classNames("flex flex-col gap-2", formClassName)}
    >
      {labels.map((label, idx) => (
        <div key={idx} className={`form-control ${optionClassName}`}>
          <label className="label cursor-pointer">
            <span className="label-text">{label}</span>
            <Controller
              name={label}
              control={control}
              defaultValue={false}
              render={({ field: { onChange, value, ...rest } }) => (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={value}
                  onChange={onChange}
                  {...rest}
                />
              )}
            />
          </label>
        </div>
      ))}
      {onSubmit && (
        <button
          className={classNames("btn", submitButtonClassName)}
          type="submit"
        >
          Submit
        </button>
      )}
    </form>
  );
}

import { Card } from "@ui/Card";
import { NitroContextMenu } from "@ui/ContextMenu/ContextMenu";

export default {
  title: "UIElements/ContextMenu",
};

export const Default = () => {
  return (
    <Card className="max-w-xl">
      <NitroContextMenu
        trigger={
          <div className="mx-4 my-2 flex min-h-32 items-center justify-center rounded-xl border border-dashed">
            Right-click me
          </div>
        }
        groups={[
          {
            label: "Actions",
            type: "base",
            items: [
              {
                id: "copy",
                label: "Copy",
                onClick: () => {
                  console.log("Copy");
                },
              },
              {
                id: "paste",
                label: "Paste",
                onClick: () => {
                  console.log("Paste");
                },
              },
            ],
          },
          {
            label: "Options",
            type: "checkbox",
            items: [
              {
                id: "option1",
                label: "Option 1",
                checked: true,
                onCheckedChange: () => {
                  console.log("Option 1");
                },
              },
              {
                id: "option2",
                label: "Option 2",
                checked: false,
                onCheckedChange: () => {
                  console.log("Option 2");
                },
              },
            ],
          },
          {
            label: "View",
            type: "radio",
            value: "list",
            onValueChange: (value) => {
              console.log(value);
            },
            items: [
              { id: "list", label: "List View" },
              { id: "grid", label: "Grid View" },
            ],
          },
        ]}
      />
    </Card>
  );
};

import {
  BellAlertIcon,
  CheckCircleIcon,
  UserMinusIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";

export default {
  title: "UIElements/Button",
};

export const Default = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <Button size="default" variant="default">
        Default
      </Button>

      <Button size="sm" variant="default">
        Default
      </Button>

      <Button size="lg" variant="default">
        Default
      </Button>

      <Button size="icon" variant="default">
        <CheckCircleIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};
export const Destructive = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <Button size="default" variant="destructive">
        Destructive
      </Button>

      <Button size="sm" variant="destructive">
        Destructive
      </Button>

      <Button size="lg" variant="destructive">
        Destructive
      </Button>

      <Button size="icon" variant="destructive">
        <XCircleIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};
export const Outline = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <Button size="default" variant="outline">
        Outline
      </Button>

      <Button size="sm" variant="outline">
        Outline
      </Button>

      <Button size="lg" variant="outline">
        Outline
      </Button>

      <Button size="icon" variant="outline">
        <EllipsisHorizontalCircleIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};
export const Accent = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <Button size="default" variant="accent">
        Accent
      </Button>

      <Button size="sm" variant="accent">
        Accent
      </Button>

      <Button size="lg" variant="accent">
        Accent
      </Button>

      <Button size="icon" variant="accent">
        <BellAlertIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};
export const Ghost = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <Button size="default" variant="ghost">
        Ghost
      </Button>

      <Button size="sm" variant="ghost">
        Ghost
      </Button>

      <Button size="lg" variant="ghost">
        Ghost
      </Button>

      <Button size="icon" variant="ghost">
        <UserMinusIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};
export const Link = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <Button size="default" variant="link">
        Link
      </Button>

      <Button size="sm" variant="link">
        Link
      </Button>

      <Button size="lg" variant="link">
        Link
      </Button>

      <Button size="icon" variant="link">
        Link
      </Button>
    </div>
  );
};

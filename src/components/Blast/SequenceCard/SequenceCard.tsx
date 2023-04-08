import { Card } from "@ui/Card";

export interface Props {
  sequenceName: string;
  sequence: string;
}
export const SequenceCard = ({ sequenceName, sequence }: Props) => (
  <Card className="text-brand-600 dark:text-brand-300">
    <div className="border-b border-noir-500 pb-2">
      <h3 className="text-lg font-medium leading-6 ">{sequenceName}</h3>
    </div>
    <div className="break-all py-2">{sequence}</div>
  </Card>
);

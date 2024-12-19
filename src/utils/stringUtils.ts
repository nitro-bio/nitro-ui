export function classNames(
  ...classes: (string | undefined | null | boolean)[]
) {
  return classes.filter(Boolean).join(" ");
}
export const cn = classNames;

import { classNames } from "@utils/stringUtils";
import {
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  forwardRef,
} from "react";

export const Table = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={classNames(
        "w-full caption-bottom text-sm",
        "text-noir-800",
        "dark:text-noir-100",
        className,
      )}
      {...props}
    />
  </div>
));

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={classNames("[&_tr]:border-b", className)}
    {...props}
  />
));

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={classNames("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={classNames(
      "border-t font-medium [&>tr]:last:border-b-0",
      "bg-noir-200/50 text-noir-600",
      "dark:bg-noir-700/50 dark:text-noir-300",
      className,
    )}
    {...props}
  />
));

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={classNames(
      "border-b transition-colors",
      "hover:bg-noir-200/50 data-[state=selected]:bg-brand-200/50 ",
      "dark:hover:bg-noir-600/50 dark:data-[state=selected]:bg-brand-600/50",
      className,
    )}
    {...props}
  />
));

export const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={classNames(
      "h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
      "text-noir-800",
      "dark:text-noir-100",
      className,
    )}
    {...props}
  />
));

export const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={classNames(
      "p-4 align-middle [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableFooter.displayName = "TableFooter";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";

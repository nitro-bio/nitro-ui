import { z } from "zod";

export const PlateSelectionSchema = z.object({
  wells: z.array(z.number()),
  className: z.string().optional(),
});
export type PlateSelection = z.infer<typeof PlateSelectionSchema>;

export interface WellAnnotation<T extends Record<string, unknown>> {
  id: string;
  wells: number[];
  label: string;
  className?: string;
  metadata?: T;
}
export interface RowAnnotation<T extends Record<string, unknown>> {
  id: string;
  rows: number[];
  label: string;
  className?: string;
  metadata?: T;
}
export interface ColAnnotation<T extends Record<string, unknown>> {
  id: string;
  cols: number[];
  label: string;
  className?: string;
  metadata?: T;
}

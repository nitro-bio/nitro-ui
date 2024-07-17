import { z } from "zod";

export const LogMessageSchema = z.object({
  timestamp: z.string(),
  message: z.string(),
});
export type LogMessage = z.infer<typeof LogMessageSchema>;

export const SamHeaderSchema = z.object({
  type: z.string(),
  identifier: z.string(),
  value: z.string().optional(),
});
export type SamHeader = z.infer<typeof SamHeaderSchema>;

export const SamAlignmentRecordSchema = z.object({
  qname: z.string(),
  flag: z.number(),
  rname: z.string(),
  pos: z.number(),
  mapq: z.number(),
  cigar: z.string(),
  aligned_sequences: z.object({
    ref: z.string(),
    query: z.string(),
  }),
  // rnext: z.string(),
  // pnext: z.number(),
  // tlen: z.number(),
  // seq: z.string(),
  // qual: z.string(),
  // tags: z.record(z.string()).optional(),
});
export type SamAlignmentRecord = z.infer<typeof SamAlignmentRecordSchema>;

export const FooterSchema = z
  .object({
    version: z.string(),
    cmd: z.string(),
    executionTime: z.string(),
  })
  .nullable();
export type Footer = z.infer<typeof FooterSchema>;

export const MinimapOutputSchema = z.object({
  logs: z.array(LogMessageSchema),
  headers: z.array(SamHeaderSchema),
  alignments: z.array(SamAlignmentRecordSchema),
  footer: FooterSchema,
});
export type MinimapOutput = z.infer<typeof MinimapOutputSchema>;

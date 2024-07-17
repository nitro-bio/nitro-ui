import {
  Footer,
  FooterSchema,
  LogMessage,
  LogMessageSchema,
  MinimapOutput,
  MinimapOutputSchema,
  SamAlignmentRecord,
  SamAlignmentRecordSchema,
  SamHeader,
  SamHeaderSchema,
} from "./schemas";

export const parseMinimap2Output = (output: string): MinimapOutput => {
  const lines = output.trim().split("\n");
  const logs: LogMessage[] = [];
  const headers: SamHeader[] = [];
  const alignments: SamAlignmentRecord[] = [];
  let footer: Footer | null = null;

  lines.forEach((line) => {
    if (line.startsWith("[M::")) {
      // Log messages
      const parts = line.match(/\[M::(.+?)\] (.+)/);
      if (parts) {
        logs.push(
          LogMessageSchema.parse({
            timestamp: `[M::${parts[1]}]`,
            message: parts[2],
          }),
        );
      }
    } else if (line.startsWith("@")) {
      // Header lines
      const [type, ...rest] = line.split("\t");
      const identifier = rest[0].split(":")[0];
      const value = rest.join(" ");
      headers.push(SamHeaderSchema.parse({ type, identifier, value }));
    } else if (!line.startsWith("[M::main]") && line.trim() !== "") {
      // Alignment lines (excluding footer)
      const cols = line.split("\t");

      const refSeq = cols[9];
      const querySeq = cols[10];
      const cigar = cols[5];
      const posOffset = parseInt(cols[3], 10);
      const alignment = {
        qname: cols[0],
        flag: parseInt(cols[1], 10),
        rname: cols[2],
        pos: posOffset,
        mapq: parseInt(cols[4], 10),
        cigar: cigar,
        aligned_sequences: applyCigarToSequences(
          refSeq,
          querySeq,
          cigar,
          posOffset,
        ),
      };
      const temp = SamAlignmentRecordSchema.safeParse(alignment);
      if (!temp.success) {
        console.log(alignment);
        console.error(temp.error.errors);
        throw new Error("Failed to parse alignment record");
      }
      alignments.push(temp.data);
    } else if (line.startsWith("[M::main]")) {
      // Footer / summary
      const footerParts = line.match(/\[M::main\] (.+)/);

      if (footerParts) {
        // Extracting version and real time from the footer part.
        // This might need adjustments based on the actual output format.
        const cmdLine = footerParts[1].split(";");
        const rawFooter: Record<string, string> = {};
        cmdLine.forEach((part) => {
          const colonSeparated = part.trim().split(": ");
          if (colonSeparated[0] && colonSeparated[1]) {
            rawFooter[colonSeparated[0]] = colonSeparated[1];
          }
        });
        footer = FooterSchema.parse({
          version: rawFooter["Version"],
          cmd: rawFooter["Command line"],
          executionTime: rawFooter["Real time"],
        });
      }
    }
  });

  const temp = MinimapOutputSchema.safeParse({
    logs,
    headers,
    alignments,
    footer: footer!,
  });
  if (!temp.success) {
    console.error(temp.error.errors);
    throw new Error("Failed to parse minimap2 output");
  }
  return temp.data;
};

type CigarOperation = "M" | "I" | "D";

interface CigarElement {
  length: number;
  operation: CigarOperation;
}

function parseCigar(cigar: string): CigarElement[] {
  const regex = /(\d+)([MID])/g;
  let match;
  const elements: CigarElement[] = [];
  while ((match = regex.exec(cigar))) {
    elements.push({
      length: parseInt(match[1], 10),
      operation: match[2] as CigarOperation,
    });
  }
  return elements;
}

function applyCigarToSequences(
  refSeq: string,
  querySeq: string,
  cigar: string,
  posOffset: number,
) {
  const elements = parseCigar(cigar);
  let alignedRefSeq = "";
  let alignedQuerySeq = "";
  let refIndex = 0;
  let queryIndex = 0;

  // Padding before alignment
  alignedRefSeq = ".".repeat(posOffset);
  alignedQuerySeq = ".".repeat(posOffset);

  elements.forEach((element) => {
    switch (element.operation) {
      case "M":
        alignedRefSeq += refSeq.substr(refIndex, element.length);
        alignedQuerySeq += refSeq.substr(refIndex, element.length);
        refIndex += element.length;
        queryIndex += element.length;
        break;
      case "I":
        alignedRefSeq += ".".repeat(element.length);
        alignedQuerySeq += querySeq.substr(queryIndex, element.length);
        queryIndex += element.length;
        break;
      case "D":
        alignedRefSeq += refSeq.substr(refIndex, element.length);
        alignedQuerySeq += ".".repeat(element.length);
        refIndex += element.length;
        break;
    }
  });

  return { ref: alignedRefSeq, query: alignedQuerySeq };
}

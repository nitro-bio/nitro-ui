import genbankParser, { ParsedGenbank } from "genbank-parser";
import { z } from "zod";
import { annotationTypeSchema } from "./schemas";
import { Annotation, AnnotationType, StackedAnnotation } from "./types";
import { anythingToAnnotatedSequences } from "./utils";

export const GenbankFeatureSchema = z.object({
  name: z.string().min(1),
  start: z.number(),
  end: z.number(),
  strand: z.union([z.literal(1), z.literal(-1)]),
  type: annotationTypeSchema,
  notes: z.record(z.array(z.string())).optional(),
});
export type GenbankFeature = z.infer<typeof GenbankFeatureSchema>;

export const genbankToAnnotatedSequence = ({
  genbank,
  annotationOnClick,
}: {
  genbank: ParsedGenbank;
  annotationOnClick?: (annotation: Annotation) => void;
}) => {
  const features = genbank.features.map((feature) => {
    return GenbankFeatureSchema.parse(feature);
  });
  const annotations = genbankFeaturesToAnnotations({
    features,
    annotationOnClick,
  });
  const stackedAnnotations = stackAnnsByType(annotations);
  const annotatedSequence = anythingToAnnotatedSequences({
    payload: genbank.sequence,
    payloadType: "raw",
    annotations: stackedAnnotations,
  });
  return {
    annotatedSequence,
    annotations,
  };
};

export const genbankFeaturesToAnnotations = ({
  features,
  annotationOnClick,
}: {
  features: GenbankFeature[];
  annotationOnClick?: (annotation: Annotation) => void;
}): Annotation[] => {
  return features.map((feature) => {
    const direction = feature.strand === 1 ? "forward" : "reverse";
    let [start, end] = [feature.start, feature.end];
    if (direction === "reverse") {
      [start, end] = [feature.end, feature.start];
    }
    const onClick = annotationOnClick ?? (() => {});

    return {
      type: feature.type,
      start,
      end,
      label: feature.type,
      text: feature.name,
      direction: feature.strand === 1 ? "forward" : "reverse",
      className: getClassNameFromFeatureType(feature.type),
      onClick,
    };
  });
};

export function getClassNameFromFeatureType(annType: AnnotationType): string {
  const common =
    "cursor-pointer opacity-60 group-hover:opacity-100 !text-xs hover:opacity-100 pointer-events-all text-white text-clip overflow-hidden whitespace-nowrap";
  const classNameMap: { [key: AnnotationType]: string } = zipArrays(
    [
      "CDS",
      "enhancer",
      "intron",
      "misc_feature",
      "polyA_signal",
      "promoter",
      "protein_bind",
      "rep_origin",
      "LTR",
      "source",
      "insertion",
    ],
    [
      "bg-red-600 fill-red-600 stroke-red-600",
      "bg-blue-600 fill-blue-600 stroke-blue-600",
      "bg-green-600 fill-green-600 stroke-green-600",
      "bg-yellow-600 fill-yellow-600 stroke-yellow-600",
      "bg-orange-600 fill-orange-600 stroke-orange-600",
      "bg-purple-600 fill-purple-600 stroke-purple-600",
      "bg-sky-600 fill-sky-600 stroke-sky-600",
      "bg-teal-600 fill-teal-600 stroke-teal-600",
      "bg-gray-600 fill-gray-600 stroke-gray-600",
      "bg-pink-600 fill-pink-600 stroke-pink-600",
    ]
  );
  if (annType in classNameMap) {
    return `${common} ${classNameMap[annType]!}`;
  }
  return common;
}

export const zipArrays = <T1, T2>(keys: T1[], values: T2[]) => {
  return Object.fromEntries(
    keys.map((key: T1, i: number) => {
      const val: T2 | undefined = values[i];
      return [key, val];
    })
  ) as { T1: T2 };
};

export const stackAnnsByType = (
  annotations: Annotation[]
): StackedAnnotation[] => {
  // create a map of annotation type to list
  const annotationMap = annotations.reduce(
    (acc: { [key: AnnotationType]: Annotation[] }, annotation: Annotation) => {
      if (acc[annotation.type] === undefined) {
        acc[annotation.type] = [];
      }
      acc[annotation.type]!.push(annotation);
      return acc;
    },
    {} as { [key: AnnotationType]: Annotation[] }
  );

  const stacks = Object.values(annotationMap)
    .map((stack, stackIdx) => {
      return stack.map((annotation: Annotation) => {
        const res: StackedAnnotation = {
          ...annotation,
          stack: stackIdx,
        };
        return res;
      });
    })
    .flat();

  return stacks;
};

export const parseGenbank = (genbankString: string) => {
  const result = genbankParser(genbankString);
  return result;
};

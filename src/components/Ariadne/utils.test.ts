import { expect, test } from "vitest";
import { parseGenbank } from "./genbankUtils";
import { annotationSchema } from "./schemas";
import { testFastaString, testGenbankString } from "./testData";
import {
  safeAnythingToAnnotatedSequences,
  annotationsHaveOverlap,
} from "./utils";
import { z } from "zod";

test("raw test", async () => {
  expect(
    safeAnythingToAnnotatedSequences({
      payload: "ATCG",
      payloadType: "raw",
    }),
  ).toEqual({
    successes: [
      {
        source: {
          annotationOnClick: undefined,
          annotations: undefined,
          payload: "ATCG",
          payloadType: "raw",
        },
        annotations: [],
        sequences: [
          [
            {
              annotations: [],
              base: "A",
              index: 0,
            },
            {
              annotations: [],
              base: "T",
              index: 1,
            },
            {
              annotations: [],
              base: "C",
              index: 2,
            },
            {
              annotations: [],
              base: "G",
              index: 3,
            },
          ],
        ],
      },
    ],
    failures: [],
  });
});

test("genbank test", async () => {
  const res = safeAnythingToAnnotatedSequences({
    payload: testGenbankString,
    payloadType: "genbank",
  });
  expect(res.failures).toEqual([]);
  expect(res.successes.length).toBe(1);
});

test("parsed-genbank test", async () => {
  const genbank = parseGenbank(testGenbankString);
  const res = safeAnythingToAnnotatedSequences({
    payload: genbank[0],
    payloadType: "parsed-genbank",
  });
  expect(res.failures).toEqual([]);
  expect(res.successes.length).toBe(1);
});

test("fasta test", async () => {
  const res = safeAnythingToAnnotatedSequences({
    payload: testFastaString,
    payloadType: "fasta",
  });
  expect(res.failures).toEqual([]);
  expect(res.successes.length).toBe(1);
});

test("annotationsHaveOverlap test forward and forward", async () => {
  const baseAnn = {
    type: "test",
    text: "test",
  };

  const annotations = z.array(annotationSchema).parse([
    {
      ...baseAnn,
      start: 0,
      end: 5,
      direction: "forward",
    },
    {
      ...baseAnn,
      start: 3,
      end: 8,
      direction: "forward",
    },
  ]);
  const maxLen = 8;
  expect(annotationsHaveOverlap(annotations[0], annotations[1], maxLen)).toBe(
    true,
  );
});

test("annotationsHaveOverlap test forward and reverse", async () => {
  const baseAnn = {
    type: "test",
    text: "test",
  };

  const annotations = z.array(annotationSchema).parse([
    {
      ...baseAnn,
      start: 0,
      end: 5,
      direction: "forward",
    },
    {
      ...baseAnn,
      start: 3,
      end: 8,
      direction: "reverse",
    },
  ]);
  const maxLen = 8;
  expect(annotationsHaveOverlap(annotations[0], annotations[1], maxLen)).toBe(
    true,
  );
});

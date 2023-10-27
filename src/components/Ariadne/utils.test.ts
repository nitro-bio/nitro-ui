import { expect, test } from "vitest";
import { parseGenbank } from "./genbankUtils";
import { testFastaString, testGenbankString } from "./testData";
import { anythingToAnnotatedSequences } from "./utils";

test("raw test", async () => {
  expect(
    anythingToAnnotatedSequences({
      payload: "ATCG",
      payloadType: "raw",
    })
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
              complement: "T",
              index: 0,
            },
            {
              annotations: [],
              base: "T",
              complement: "A",
              index: 1,
            },
            {
              annotations: [],
              base: "C",
              complement: "G",
              index: 2,
            },
            {
              annotations: [],
              base: "G",
              complement: "C",
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
  const res = anythingToAnnotatedSequences({
    payload: testGenbankString,
    payloadType: "genbank",
  });
  expect(res.failures).toEqual([]);
  expect(res.successes.length).toBe(1);
});

test("parsed-genbank test", async () => {
  const genbank = parseGenbank(testGenbankString);
  const res = anythingToAnnotatedSequences({
    payload: genbank[0],
    payloadType: "parsed-genbank",
  });
  expect(res.failures).toEqual([]);
  expect(res.successes.length).toBe(1);
});

test("fasta test", async () => {
  const res = anythingToAnnotatedSequences({
    payload: testFastaString,
    payloadType: "fasta",
  });
  expect(res.failures).toEqual([]);
  expect(res.successes.length).toBe(1);
});

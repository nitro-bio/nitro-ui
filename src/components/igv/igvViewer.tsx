import React, { useEffect, useRef } from "react";
import igv from "igv";
import { z } from "zod";

const igvPropsSchema = z.object({
  genome: z.string(),
  locus: z.string(),
  tracks: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
      indexURL: z.string().url(),
      format: z.string(),
    }),
  ),
});
export type IGVProps = z.infer<typeof igvPropsSchema>;

export const IGVViewer = ({ genome, locus, tracks }: IGVProps) => {
  const igvDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (igvDivRef.current) {
      igv
        .createBrowser(igvDivRef.current, { genome, locus, tracks })
        .then(function (browser: unknown) {
          console.log("Created IGV browser", browser);
        });
    }

    // Cleanup function to remove IGV when the component unmounts
    return () => {
      if (igvDivRef.current) {
        igvDivRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div id="igv-div" ref={igvDivRef} />;
};

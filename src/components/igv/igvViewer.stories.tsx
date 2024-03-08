import { IGVViewer } from "./igvViewer";

export default {
  title: "IGV/IGV",
};

export const Default = () => {
  const options = {
    genome: "hg38",
    locus: "chr8:127,736,588-127,739,371",
    tracks: [
      {
        name: "HG00103",
        url: "https://s3.amazonaws.com/1000genomes/data/HG00103/alignment/HG00103.alt_bwamem_GRCh38DH.20150718.GBR.low_coverage.cram",
        indexURL:
          "https://s3.amazonaws.com/1000genomes/data/HG00103/alignment/HG00103.alt_bwamem_GRCh38DH.20150718.GBR.low_coverage.cram.crai",
        format: "cram",
      },
    ],
  };

  return (
    <div className="bg-white">
      <IGVViewer {...options} />
    </div>
  );
};

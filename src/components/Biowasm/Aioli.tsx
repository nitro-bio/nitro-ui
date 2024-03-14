import { useEffect, useRef } from "react";
import Aioli from "@biowasm/aioli";
export const Samtools = () => {
  const cli = useRef(null);
  useEffect(function loadSamtools() {
    const load = async () => {
      const CLI = await new Aioli(["samtools/1.10"]);
      cli.current = CLI;
    };
    load();
  }, []);

  useEffect(() => {
    const output = async () => {
      if (!cli.current) {
        console.error("CLI not loaded yet");
        return;
      }
      const result = await cli.current.exec("samtools --help");
      console.log(result);
    };
    output();
  }, [cli.current]);

  return <div>Foo</div>;
};

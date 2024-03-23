import { DefaultPluginSpec } from "molstar/lib/mol-plugin/spec";
import { useEffect, useRef } from "react";
import "molstar/build/viewer/molstar.css";
import { PluginContext } from "molstar/lib/mol-plugin/context";
import { classNames } from "@utils/stringUtils";

export const MoleculeViewer = ({
  pdbStr,
  pdbUrl,
  className,
}: {
  pdbStr?: string;
  pdbUrl?: string;
  className?: string;
}) => {
  if (!pdbStr && !pdbUrl) {
    throw new Error("pdbStr or pdbUrl is required");
  }
  if (pdbStr && pdbUrl) {
    throw new Error("pdbStr and pdbUrl are mutually exclusive");
  }
  const parentRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plugin = useRef<PluginContext | null>(null);

  useEffect(
    function onInit() {
      (async () => {
        plugin.current = new PluginContext(DefaultPluginSpec());
        if (canvasRef.current && parentRef.current) {
          plugin.current.initViewer(canvasRef.current, parentRef.current);

          /* remove axes and set background transparent */
          plugin.current.canvas3d?.setProps({
            camera: {
              helper: {
                axes: {
                  name: "off",
                  params: {},
                },
              },
            },
          });
        }
        await plugin.current.init();
        await loadStructure({ pdbUrl, pdbStr, plugin: plugin.current });
      })();
      return () => {
        plugin.current = null;
      };
    },
    [pdbStr],
  );

  useEffect(() => {
    loadStructure({ pdbUrl, pdbStr, plugin: plugin.current });
  }, [pdbStr]);

  const loadStructure = async ({
    pdbUrl,
    pdbStr,
    plugin,
  }: {
    pdbUrl?: string;
    pdbStr?: string;
    plugin: PluginContext | null;
  }) => {
    if (plugin) {
      if (pdbUrl) {
        const data = await plugin.builders.data.download({ url: pdbUrl });
        const trajectory = await plugin.builders.structure.parseTrajectory(
          data,
          "pdb",
        );
        await plugin.builders.structure.hierarchy.applyPreset(
          trajectory,
          "default",
        );
      }
      if (pdbStr) {
        const data = await plugin.builders.data.rawData({
          data: pdbStr,
          label: void 0 /* optional label */,
        });
        const trajectory = await plugin.builders.structure.parseTrajectory(
          data,
          "pdb",
        );
        await plugin.builders.structure.hierarchy.applyPreset(
          trajectory,
          "default",
        );
      }
    }
  };

  const width = "100%";
  const height = "100%";

  return (
    <div
      ref={parentRef}
      style={{ position: "relative", width, height }}
      className={classNames("relative h-full w-full ", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute bottom-0 left-0 right-0 top-0 "
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
};

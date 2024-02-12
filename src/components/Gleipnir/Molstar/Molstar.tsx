import { DefaultPluginSpec } from "molstar/lib/mol-plugin/spec";
import { useEffect, useRef } from "react";

import { classNames } from "@utils/stringUtils";
import "molstar/build/viewer/molstar.css";
import { PluginContext } from "molstar/lib/mol-plugin/context";

const Molstar = ({
  pdbId,
  className,
}: {
  pdbId: string;
  className?: string;
}) => {
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
            transparentBackground: true,
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
        await loadStructure({ pdbId, plugin: plugin.current });
      })();
      return () => {
        plugin.current = null;
      };
    },
    [canvasRef.current, parentRef.current],
  );

  useEffect(() => {
    loadStructure({ pdbId, plugin: plugin.current });
  }, [pdbId]);

  const loadStructure = async ({
    pdbId,
    plugin,
  }: {
    pdbId: string;
    plugin: PluginContext | null;
  }) => {
    if (plugin) {
      plugin.clear();
      const structureUrl = `https://files.rcsb.org/view/${pdbId}.cif`;
      const data = await plugin.builders.data.download(
        { url: structureUrl },
        { state: { isGhost: true } },
      );

      const traj = await plugin.builders.structure.parseTrajectory(
        data,
        "mmcif" /* why mmcif for cif? */,
      );
      await plugin.builders.structure.hierarchy.applyPreset(traj, "default");
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

export { Molstar };

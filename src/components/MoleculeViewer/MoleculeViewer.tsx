import { classNames } from "@utils/stringUtils";
import "molstar/build/viewer/molstar.css";
import { StructureSelection } from "molstar/lib/mol-model/structure";
import { setStructureOverpaint } from "molstar/lib/mol-plugin-state/helpers/structure-overpaint";
import { PluginContext } from "molstar/lib/mol-plugin/context";
import { DefaultPluginSpec } from "molstar/lib/mol-plugin/spec";
import { Script } from "molstar/lib/mol-script/script";
import { Color } from "molstar/lib/mol-util/color";
import { useEffect, useRef } from "react";

interface Highlight {
  label: {
    text: string;
    hexColor: string;
    scale?: number;
  };
  start: number;
  end: number;
  hidden?: true;
}

export const MoleculeViewer = ({
  pdbStr,
  pdbUrl,
  className,
  highlights,
  backgroundHexColor,
  structureHexColor,
}: {
  pdbStr?: string;
  pdbUrl?: string;
  className?: string;
  highlights?: Highlight[];
  backgroundHexColor?: string;
  structureHexColor?: string;
}) => {
  if (!pdbStr && !pdbUrl) {
    throw new Error("pdbStr or pdbUrl is required");
  }
  if (pdbStr && pdbUrl) {
    throw new Error("pdbStr and pdbUrl are mutually exclusive");
  }
  if (backgroundHexColor && !backgroundHexColor.includes("#")) {
    throw new Error("hexCode must be of format '#123456'");
  }

  const parentRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plugin = useRef<PluginContext | null>(null);

  useEffect(function onInit() {
    (async () => {
      plugin.current = new PluginContext(DefaultPluginSpec());
      if (canvasRef.current && parentRef.current) {
        plugin.current.initViewer(canvasRef.current, parentRef.current);

        /* remove axes and set background transparent */
        plugin.current.canvas3d?.setProps({
          renderer: {
            backgroundColor: Color.fromHexString(
              backgroundHexColor
                ? backgroundHexColor.replace("#", "0x")
                : "0xFCFBFA",
            ),
          },
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
    })();
    return () => {
      plugin.current = null;
    };
  }, []);

  useEffect(
    function onPdbChange() {
      const _onPdbChange = async () => {
        // reset the structure
        plugin.current!.clear();
        await loadStructure({ pdbUrl, pdbStr, plugin: plugin.current });
        highlights?.forEach((highlight) => colorResidues(highlight));
      };
      _onPdbChange();
    },
    [pdbStr, highlights, pdbUrl],
  );

  const colorResidues = ({ start, end, label, hidden }: Highlight) => {
    if (hidden) {
      return;
    }
    const range = Array.from(
      //creates an array of all numbers in [start, end]
      { length: end - start },
      (_, idx) => idx + start,
    );

    const data =
      plugin.current!.managers.structure.hierarchy.current.structures[0]?.cell
        .obj?.data;
    if (!data) {
      console.debug("Problem with data, try to reload viewer.");
      return;
    }

    const selection = Script.getStructureSelection(
      (Q) =>
        Q.struct.generator.atomGroups({
          "residue-test": Q.core.set.has([
            Q.set(...range),
            Q.ammp("auth_seq_id"),
          ]),
          "group-by": Q.struct.atomProperty.macromolecular.residueKey(),
        }),
      data,
    );
    const lociGetter = async () =>
      StructureSelection.toLociWithSourceUnits(selection);

    const components =
      plugin.current!.managers.structure.hierarchy.current.structures[0]
        .components;

    setStructureOverpaint(
      plugin.current!,
      components,
      Color(Number(`0x${label.hexColor.substring(1)}`)),
      lociGetter,
    );
    const loci = StructureSelection.toLociWithSourceUnits(selection);
    plugin.current!.managers.structure.measurement.addLabel(loci, {
      labelParams: {
        customText: `${label.text}: ${start}-${end}`,
        textColor: Color(Number(`0x${label.hexColor.substring(1)}`)),
        sizeFactor: label.scale ?? 1.0,
      },
    });
  };
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
      let trajectory;
      if (pdbUrl) {
        const data = await plugin.builders.data.download({ url: pdbUrl });
        trajectory = await plugin.builders.structure.parseTrajectory(
          data,
          "pdb",
        );
      } else if (pdbStr) {
        const data = await plugin.builders.data.rawData({
          data: pdbStr,
          label: void 0, // optional label
        });
        trajectory = await plugin.builders.structure.parseTrajectory(
          data,
          "pdb",
        );
      }

      if (trajectory) {
        const params = structureHexColor
          ? {
              // Corrected parameter name
              representationPresetParams: {
                theme: {
                  globalName: "uniform",
                  globalColorParams: {
                    value: Color(Number(`0x${structureHexColor.substring(1)}`)),
                  },
                },
              },
            }
          : undefined;

        await plugin.builders.structure.hierarchy.applyPreset(
          trajectory,
          "default",
          params,
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
        style={{ backgroundColor: backgroundHexColor ?? "transparent" }}
      />
    </div>
  );
};

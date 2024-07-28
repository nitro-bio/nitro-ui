import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/Accordion/Accordion";

import { ColAnnotation, RowAnnotation, WellAnnotation } from "./Plate";
import { classNames } from "@utils/stringUtils";

export const AnnotationBar = <
  RowMetaT extends Record<string, unknown>,
  ColMetaT extends Record<string, unknown>,
  WellMetaT extends Record<string, unknown>,
>({
  rowAnnotations,
  activeRowAnnotation,
  setActiveRowAnnotation,

  colAnnotations,
  activeColAnnotation,
  setActiveColAnnotation,

  wellAnnotations,
  activeWellAnnotation,
  setActiveWellAnnotation,
}: {
  rowAnnotations?: RowAnnotation<RowMetaT>[];
  activeRowAnnotation: RowAnnotation<RowMetaT> | null;
  setActiveRowAnnotation: (ann: RowAnnotation<RowMetaT> | null) => void;
  colAnnotations?: ColAnnotation<ColMetaT>[];
  activeColAnnotation: ColAnnotation<ColMetaT> | null;
  setActiveColAnnotation: (ann: ColAnnotation<ColMetaT> | null) => void;
  wellAnnotations?: WellAnnotation<WellMetaT>[];
  activeWellAnnotation: WellAnnotation<WellMetaT> | null;
  setActiveWellAnnotation: (ann: WellAnnotation<WellMetaT> | null) => void;
}) => {
  const isActive = ({
    ann,
    annType,
    activeWellAnnotation,
    activeRowAnnotation,
    activeColAnnotation,
  }: {
    ann:
      | RowAnnotation<RowMetaT>
      | ColAnnotation<ColMetaT>
      | WellAnnotation<WellMetaT>;
    annType: "row" | "col" | "well";
    activeWellAnnotation: WellAnnotation<WellMetaT> | null;
    activeRowAnnotation: RowAnnotation<RowMetaT> | null;
    activeColAnnotation: ColAnnotation<ColMetaT> | null;
  }) => {
    if (annType === "well") {
      return activeWellAnnotation?.id === ann.id;
    }
    if (annType === "row") {
      return activeRowAnnotation?.id === ann.id;
    }
    if (annType === "col") {
      return activeColAnnotation?.id === ann.id;
    }
    return false;
  };
  return (
    <span className="">
      <Accordion
        type="single"
        collapsible
        className="mb-8"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="">
          <AccordionTrigger className="">Annotations</AccordionTrigger>

          <AccordionContent className="grid grid-cols-3 gap-2">
            <span className="flex flex-wrap gap-x-1 gap-y-2">
              {rowAnnotations?.map((ann) => (
                <AnnotationButton
                  key={ann.id}
                  annotation={ann}
                  isActive={isActive({
                    ann,
                    annType: "row",
                    activeWellAnnotation,
                    activeRowAnnotation,
                    activeColAnnotation,
                  })}
                  onClick={() => {
                    setActiveRowAnnotation(
                      activeRowAnnotation?.id === ann.id ? null : ann,
                    );
                  }}
                />
              ))}
            </span>
            <span className="flex flex-wrap gap-1">
              {colAnnotations?.map((ann) => (
                <AnnotationButton
                  key={ann.id}
                  annotation={ann}
                  isActive={isActive({
                    ann,
                    annType: "col",
                    activeWellAnnotation,
                    activeRowAnnotation,
                    activeColAnnotation,
                  })}
                  onClick={() => {
                    setActiveColAnnotation(
                      activeColAnnotation?.id === ann.id ? null : ann,
                    );
                  }}
                />
              ))}
            </span>
            <span className="flex flex-wrap gap-1">
              {wellAnnotations?.map((ann) => (
                <AnnotationButton
                  key={ann.id}
                  annotation={ann}
                  isActive={isActive({
                    ann,
                    annType: "well",
                    activeWellAnnotation,
                    activeRowAnnotation,
                    activeColAnnotation,
                  })}
                  onClick={() => {
                    setActiveWellAnnotation(
                      activeWellAnnotation?.id === ann.id ? null : ann,
                    );
                  }}
                />
              ))}
            </span>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </span>
  );
};

const AnnotationButton = <T extends Record<string, unknown>>({
  annotation,
  isActive,
  onClick,
}: {
  annotation: RowAnnotation<T> | ColAnnotation<T> | WellAnnotation<T>;
  isActive: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={() => {
        onClick?.();
      }}
      className={classNames(
        annotation.className,
        "flex h-fit w-fit items-center",
        "rounded-md px-2 py-1",
        "text-xs",
        "opacity-80 hover:opacity-100",
        isActive && "!opacity-100",
      )}
    >
      {annotation.label}
    </button>
  );
};

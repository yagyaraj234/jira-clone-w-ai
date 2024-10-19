import { cn } from "@/lib/utils";

interface DottedSepratorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
}

export const DottedSeprator = ({
  className,
  color = "#d4d4d8",
  height = "2px",
  dotSize = "2px",
  gapSize = "6px",
  direction = "horizontal",
}: DottedSepratorProps) => {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn(
        isHorizontal
          ? "flex items-center w-full"
          : "flex flex-col items-center h-full ",
        className
      )}
    >
      <div
        className={`${isHorizontal ? "flex-grow" : "flex-grow-0"}`}
        style={{
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%`,
          backgroundSize: isHorizontal
            ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
            : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

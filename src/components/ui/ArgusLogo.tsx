import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";

interface ArgusLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  themeMode?: "dark" | "light" | "auto";
}

const sizeClass = {
  sm: { img: "h-7 w-auto", name: "text-xs",  sub: "text-[8px]" },
  md: { img: "h-9 w-auto", name: "text-sm sm:text-base", sub: "text-[9px]" },
  lg: { img: "h-12 w-auto", name: "text-lg", sub: "text-[10px]" },
};

export function ArgusLogo({
  className,
  size = "md",
  showSubtitle = true,
  themeMode = "auto",
}: ArgusLogoProps) {
  const { tokens } = useTheme();
  
  // Explicit or context-aware logo selection:
  // Light theme/background -> logo-b.png (dark logo)
  // Dark theme/background -> logo-w.png (white logo)
  let isDarkBackground = true;
  if (themeMode === "light") {
    isDarkBackground = false;
  } else if (themeMode === "dark") {
    isDarkBackground = true;
  } else {
    isDarkBackground = tokens.logoVariant === "light";
  }

  const imgSrc = isDarkBackground
    ? "assets/img/logo/logo-w.png"
    : "assets/img/logo/logo-b.png";

  const cls = sizeClass[size];

  return (
    <div className={cn("flex items-center gap-3 group select-none", className)}>
      {/* Logo image */}
      <img
        src={imgSrc}
        alt="ARGUS logo"
        className={cn(cls.img, "object-contain transition-transform duration-300 group-hover:scale-105")}
        draggable={false}
      />

      {/* Name & Discipline */}
      <div className="flex flex-col justify-center">
        <span
          className={cn(
            "font-display font-extrabold tracking-[0.22em] uppercase leading-none transition-colors text-current",
            cls.name
          )}
        >
          ARYA BAGUS
        </span>

        {showSubtitle && (
          <span
            className={cn(
              "font-mono tracking-[0.2em] uppercase mt-1 opacity-60 text-current",
              cls.sub
            )}
          >
            MULTIMEDIA ENGINEER // PENS
          </span>
        )}
      </div>
    </div>
  );
}

export const InitialsLogo = ArgusLogo;

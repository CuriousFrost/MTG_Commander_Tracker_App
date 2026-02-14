import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { type ThemeName, useTheme } from "@/contexts/ThemeContext";

type ThemeOption = {
  value: ThemeName;
  label: string;
  swatch: [string, string];
};

const themeOptions: ThemeOption[] = [
  { value: "default-dark", label: "Dark", swatch: ["#0f172a", "#1e293b"] },
  { value: "light", label: "Light", swatch: ["#f8fafc", "#e2e8f0"] },
  { value: "cerulean-sand", label: "Cerulean Sand", swatch: ["#0B2D72", "#0AC4E0"] },
  { value: "ember-violet", label: "Ember Violet", swatch: ["#F25912", "#5C3E94"] },
  { value: "lagoon-royal", label: "Lagoon Royal", swatch: ["#78B9B5", "#065084"] },
  { value: "crimson-noir", label: "Crimson Noir", swatch: ["#F7374F", "#2C2C2C"] },
  { value: "mosswood", label: "Mosswood", swatch: ["#1F7D53", "#18230F"] },
  { value: "ultramarine-pop", label: "Ultramarine Pop", swatch: ["#402E7A", "#3DC2EC"] },
  { value: "rose-plum", label: "Rose Plum", swatch: ["#E19898", "#4D3C77"] },
  { value: "pastel-garden", label: "Pastel Garden", swatch: ["#F7CFD8", "#8E7DBE"] },
  { value: "sunburst-red", label: "Sunburst Red", swatch: ["#FFD41D", "#FF4646"] },
];

function ThemeSwatch({ colors }: { colors: [string, string] }) {
  return (
    <span
      className="h-3.5 w-3.5 rounded-sm border border-border"
      style={{
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
      }}
    />
  );
}

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const active = themeOptions.find((option) => option.value === theme) ?? themeOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("w-full justify-between", className)}
        >
          <span className="flex items-center gap-2">
            <ThemeSwatch colors={active.swatch} />
            <span className="text-sm">{active.label}</span>
          </span>
          <ChevronDown className="size-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as ThemeName)}>
          {themeOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              <ThemeSwatch colors={option.swatch} />
              <span>{option.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

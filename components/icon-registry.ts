import {
  Award,
  ClipboardList,
  Crown,
  Flower2,
  Gem,
  Hand,
  Palette,
  Scissors,
  ShieldCheck,
  Waves,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the `icon` string used in config/site.ts to a Lucide component.
 *
 * To add an icon: import it from "lucide-react" and add a lowercase,
 * kebab-case key below. Then reference that key in config/site.ts.
 */
const registry: Record<string, LucideIcon> = {
  scissors: Scissors,
  palette: Palette,
  flower: Flower2,
  hand: Hand,
  crown: Crown,
  waves: Waves,
  award: Award,
  gem: Gem,
  shield: ShieldCheck,
  clipboard: ClipboardList,
};

export type IconName = keyof typeof registry;

export function getIcon(name: string): LucideIcon {
  return registry[name] ?? Award;
}

import type { ImageKey } from "./images";

/**
 * PRIVATE DINING & HIRE
 * Add the pub's real rooms/spaces here (name, seated and standing
 * capacity, description, hire terms). The "Our spaces" section is hidden
 * while this is empty. Example:
 *   { name: "The Snug", seated: 12, desc: "…", ideal: "…", image: "fireplace", hire: "…" },
 */
export type Space = {
  name: string;
  seated: number;
  standing?: number;
  desc: string;
  ideal: string;
  image: ImageKey;
  hire: string;
};

export const spaces: Space[] = [];

/** Set menus for groups, e.g. { name: "Two courses", price: "£32 per person", desc: "…" }.
 * The set-menu list is hidden while this is empty. */
export const setMenus: { name: string; price: string; desc: string }[] = [];

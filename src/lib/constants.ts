export const crafts: Craft[] = [
  {
    src: "https://utfs.io/f/oPLsS5Cstz1w2S78MZbBeU1bOLICmd8Qq0t49PXvKpRFlEkZ",
    date: "October 2024",
    title: "Floating Footer",
    height: 1920,
    width: 530,
    theme: "dark",
    type: "video",
    // position: "top",
    placeholder:
      "data:image/png;base64,/9j/4AAQSkZJRgABAgABCAEJAAD//gAQTGF2YzYxLjE5LjEwMAD/2wBDAAgEBAQEBAUFBQUFBQYGBgYGBgYGBgYGBgYHBwcICAgHBwcGBgcHCAgICAkJCQgICAgJCQoKCgwMCwsODg4RERT/xABeAAEAAwEBAQAAAAAAAAAAAAAAAgMBBAcFAQEAAAAAAAAAAAAAAAAAAAAAEAEAAwEAAwACAwEBAAAAAAAAAQIRAzEhE1ESFARBMmERAQAAAAAAAAAAAAAAAAAAAAD/wAARCACEAeADASIAAhEAAxEA/9oADAMBAAIRAxEAPwDxUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbhgMG4YDBuGAwbhgMG4YDBuN/UERuGAwbhgMG4YDBuGAwb+pgMG4zABuGAwbgBhgYBhjcZgGGABjEsMBEaAxuEGAwS/VmAwbjAAAAAAAAAAAAAAAGwxsAlWupxy1nONl1cuWwDnnjKNueO34Ke3LAcuJRVsx7T500Ef0ZNHRHH0W4+gcs1IhZemSjEAVpqXyW8qbCfzBy2piGOrrzyFEx7BGK6nHOUudNl0V5RgOWecoWrjttyjFHWmAoxKtdbFfaznz9gj8kZ5ur5IXpgOa1cRxZ0hCIBKK6lHOU+FddNeVcBxzzlCau+/KuOXrTJBVEJ15aUr7dHLnoKf46NuOO/wCEKu3LAcU1wiurOlck51BkcpknlLq58/TbcowHFNMRx0daeVEx7BkQnFDlG2dNOESDn+aNq47f40Ku/D9QcswyU71xCQYAAAAAAAAAAAAAA2GNgFvLy7OM+nDS2Ojn1yAdaj+x4Pt/6q7dNgFU+VnKVMynztgOqs+i3hXXp6J6egV9PKGtvbZQ0HXwn0s1zcumQn9QS7eHNPlb06bCiZBby8uqk+nFS2Svp29Avt4c3ZOe3pT0voIxPtdzlzxPtbS2A6VfVH6Sh06SCHVBtrTKIOnhPh1V8OHl0/VfH9iAX38OTt5WT/YjFHS+yBT/AKdPCfcOOtslbz6ZIPoap7q/vP5Q6dd/0EOvk5odLaylsB28vCVvDmp2xKe/oGdf9c9vKy/TVVp9gny/6h2cpcNLZLp59QdSn+y2OyrtfQUdFVk7z7QkGAAAAAAAAAAAAAAAA2JTi8q26Cz6Sja8yjpIGti2IgLI6T+T6z+VYCU2lmsATi8w36yrATnpMozLAEos2LygAn+8smyIDdbF5RAWfSfyyb6gA2ZZoA2JSi6ACf7smyIDdbFphEBZ9J/LJvKADZsRLAE4vJ+8oAJTZkywBsSlF5hABZ9bfknpaf8AVYDZlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z",
  },  
  {
    src: "https://utfs.io/f/oPLsS5Cstz1wJDeeEfYdSpf7eHC3bhxPVGua0AF52wN8t1nz",
    date: "April 2024",
    title: "A magazine club with a twist",
    height: 1200,
    width: 630,
    theme: "dark",
    type: "image",
    writing: true,
    slug: "insights",
  },
  {
    src: "https://utfs.io/f/oPLsS5Cstz1wdlPmVjSznq8YT0aQMDhAeZFI7SgU1krOt36w",
    date: "December 2024",
    title: "CMIYGL ID Generator (Restored)",
    height: 1200,
    width: 630,
    theme: "dark",
    type: "image",
    // position: "top",
    href: "https://iboughtbed.github.io/cmiygl",
  },
  // {
  //   src: "https://utfs.io/f/oPLsS5Cstz1wvPCSUb16IEtfyQjdGrNuKiJgo0xVcaOR41Uq",
  //   date: "April 2024",
  //   title: "Designjoy.co as Magazine",
  //   height: 1280,
  //   width: 720,
  //   theme: "light",
  //   type: "image",
  //   // position: "top",
  //   // href: "https://iboughtbed.github.io/cmiygl",
  // },
  {
    src: "https://utfs.io/f/oPLsS5Cstz1wkTAZQ1sF7kgGnbUYrtNwLRcip3WA6dxX5zEq",
    date: "July 2024",
    title: "AI Generated Podcasts",
    width: 1080,
    height: 1920,
    theme: "dark",
    // position: "top",
    type: "image",
    writing: true,
    slug: "ai-podcast",
  },
];

export type Craft = {
  src: string;
  date: string;
  title: string;
  height: number;
  width: number;
  writing?: boolean;
  component?: boolean;
  slug?: string;
  href?: string;
  position?: "top";
  theme: "light" | "dark";
  type: "image" | "video";
} & ({ type: "image" } | { type: "video"; placeholder: string });

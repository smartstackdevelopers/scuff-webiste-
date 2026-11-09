type FontOptions = {
  weight?: string | string[];
  subsets?: string[];
  display?: string;
  variable?: string;
  style?: string | string[];
};

function createFont(family: string) {
  return (options: FontOptions = {}) => {
    const variable =
      options.variable ??
      `--font-${family.toLowerCase().replace(/\s+/g, "-")}`;
    return {
      className: "",
      variable,
      style: { fontFamily: family },
    };
  };
}

export const Inter = createFont("Inter");
export const Manrope = createFont("Manrope");
export const Bebas_Neue = createFont("Bebas Neue");
export const Roboto = createFont("Roboto");
export const Poppins = createFont("Poppins");

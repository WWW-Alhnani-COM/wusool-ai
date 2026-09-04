export interface Service {
  slug: string;
  title: string;
  summary: string;
  points: string[];
}

export interface Sector {
  slug: string;
  title: string;
  tagline: string; // "من X... إلى Y" style line
  scenario: {
    trigger: string; // e.g. what the customer says/does
    steps: string[]; // the automated flow, in order
  };
}

export interface ProcessStep {
  order: string; // "01", "02"...
  title: string;
  description: string;
}

export interface SequenceFrame {
  id: string;
  /** Path under src/assets/sequence — swap the file, keep the id/text. */
  src: string;
  alt: string;
  caption: string;
}

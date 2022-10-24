export type Status = 'between' | 'stable' | 'prerendered';

export type GeneralProps = {
  class?: string;
  key?: string | number;
};

export type CxProps = {
  enter?: string;
  exit?: string;
  enterReverse?: string;
  exitReverse?: string;
};

export type CxOrderProps = CxProps & {
  order?: number;
};

export type StenimatorProps = CxProps & GeneralProps & { criteria: any };

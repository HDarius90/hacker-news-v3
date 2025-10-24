export type Feed = 'top' | 'new';

export type HnItemType = 'story' | 'comment' | 'job' | 'poll' | 'pollopt';

export type HnItem = {
  id: number;
  type?: HnItemType;
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  deleted?: boolean;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  descendants?: number;
  parent?: number;
  parts?: number[];
  poll?: number;
};

export interface FetchOpts {
  signal?: AbortSignal;
  timeoutMs?: number;
}

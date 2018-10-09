export interface Talk {
  name: string;
  speakers: Speaker[];
  level?: string;
  language?: string;
  length?: string;
  technologyClass?: string;
  columnStart?: number;
  columnEnd?: number;
  trackNumber?: number;
  hall: { name: string, order: number };
  rowStart: number;
  rowEnd: number;
  fullRow: boolean;
  tag: { color: string; type: string; };
}

export interface Speaker {
  name: string;
  job: string;
  city: string;
  photoUrl: string;
  photo: any;
}

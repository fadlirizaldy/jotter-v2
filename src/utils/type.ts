export type ApiResponse<T> =
  | {
      error: false;
      data: T;
      status: number;
    }
  | {
      error: true;
      data: null;
      status: number;
      message: string;
    };

export type INote = {
  id: string;
  title: string;
  body: string;
  createdAt: string; // ISO date string
  archived: boolean;
  owner: string;
};

export type TUploadingFile = {
  id: string;
  name: string;
  progress: number;
};

export type TUploadedFile = {
  id: string;
  name: string;
  link: string;
};

export type TFormDataOptions = {
  api_key: string;
  timestamp: number;
  signature: string;
  eager?: string;
  folder?: string;
};

export type TSignData = {
  timestamp: number;
  signature: string;
};

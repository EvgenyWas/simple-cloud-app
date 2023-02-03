export type TUploadingFile = {
  id: string;
  name: string;
  progress: number;
  handleAbort: () => void;
};

export type TUploadedFile = {
  id: string;
  public_id: string;
  name: string;
  format: string;
  resource_type: string;
  link: string;
};

export interface IUploadOptions {
  folder?: string;
  use_filename?: boolean;
  eager?: string;
  public_id?: string;
}

export interface IFormDataOptions extends IUploadOptions {
  api_key: string;
  timestamp: number;
  signature: string;
}

export type TSignData = {
  timestamp: number;
  signature: string;
};

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export type TUploadResponse = {
  folder: string;
  format: string;
  original_filename: string;
  public_id: string;
  resource_type: string;
  tags: Array<string>;
  url: string;
};

export type TUploadingFile = {
  id: string;
  name: string;
  progress: number;
  handleAbort: () => void;
};

export type TUploadedFile = {
  id: string;
  name: string;
  format: string;
  link: string;
};

export interface ISignatureOptions {
  folder?: string;
  use_filename?: boolean;
  eager?: string;
}

export interface IFormDataOptions extends ISignatureOptions {
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

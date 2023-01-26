import http from '@/http-common';
import type {
  IFormDataOptions,
  ISignatureOptions,
  TUploadResponse,
} from '@/types';
import { appendFormDataOptions, getSignData } from '@/utils';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class FileSharingService {
  private _api_key: string;
  private _api_secret: string;

  constructor(api_key: string, api_secret: string) {
    (this._api_key = api_key), (this._api_secret = api_secret);
  }

  async uploadFileAuto(
    folder: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TUploadResponse>> {
    const signatureOptions: ISignatureOptions = {
      folder: folder,
      use_filename: true,
    };
    const { timestamp, signature } = await getSignData(
      this._api_secret,
      signatureOptions
    );
    const formDataOptions: IFormDataOptions = {
      api_key: this._api_key,
      timestamp: timestamp,
      signature: signature,
      folder: folder,
      use_filename: true,
    };
    const finishedFormData = appendFormDataOptions(formData, formDataOptions);

    return http.post('/auto/upload', finishedFormData, config);
  }
}

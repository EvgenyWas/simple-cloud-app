import http from '@/http-common';
import type { TFormDataOptions } from '@/types';
import { appendFormDataOptions, getSignData } from '@/utils';
import type { AxiosRequestConfig } from 'axios';

export default class FileSharingService {
  private _api_key: string;
  private _api_secret: string;

  constructor(api_key: string, api_secret: string) {
    (this._api_key = api_key), (this._api_secret = api_secret);
  }

  async uploadFileAuto(formData: FormData, config?: AxiosRequestConfig) {
    const { timestamp, signature } = getSignData(this._api_secret);
    const formDataOptions: TFormDataOptions = {
      api_key: this._api_key,
      timestamp: timestamp,
      signature: signature,
    };
    const finishedFormData = appendFormDataOptions(formData, formDataOptions);

    return http.post('/auto/uplaod', finishedFormData, config);
  }
}

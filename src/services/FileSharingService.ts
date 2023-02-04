import http from '@/http-common';
import type { IUploadOptions, TUploadResponse } from '@/types';
import {
  appendFormDataOptions,
  getDestroyPostData,
  getFormDataOptions,
} from '@/utils';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class FileSharingService {
  private _api_key: string;
  private _api_secret: string;

  constructor(api_key: string, api_secret: string) {
    (this._api_key = api_key), (this._api_secret = api_secret);
  }

  async uploadFileAuto(
    formData: FormData,
    options?: IUploadOptions,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TUploadResponse>> {
    const formDataOptions = await getFormDataOptions(
      this._api_secret,
      this._api_key,
      options
    );
    const finishedFormData = appendFormDataOptions(formData, formDataOptions);

    return http.post('/auto/upload', finishedFormData, config);
  }

  async destroyFile(publicId: string, resourceType: string) {
    const data = await getDestroyPostData(
      this._api_secret,
      this._api_key,
      publicId
    );

    return http.post(`/${resourceType}/destroy`, data);
  }
}

import type {
  IFormDataOptions,
  IUploadOptions,
  TUploadedFile,
  TUploadResponse,
} from '@/types';
import { getSignData } from './sign';

/**
 * Function to append options to FormData
 * @param formData with an appended file
 * @param options required and optional options of Cloudinary upload API
 * @returns ready to upload FormData
 */
export function appendFormDataOptions(
  formData: FormData,
  options: IFormDataOptions
) {
  Object.keys(options).forEach((key) => {
    formData.append(key, String(options[key as keyof IFormDataOptions]));
  });

  return formData;
}

/**
 * Function to prepare FormData options for uploading to Cloudinary
 * @param apiSecret
 * @param apiKey
 * @param folder object with optional params for specific settings
 * @returns formDataOptions object to append them to FormData
 */
export async function getFormDataOptions(
  apiSecret: string,
  apiKey: string,
  options?: IUploadOptions
): Promise<IFormDataOptions> {
  const { timestamp, signature } = await getSignData(apiSecret, options);
  const formDataOptions: IFormDataOptions = {
    api_key: apiKey,
    timestamp: timestamp,
    signature: signature,
    ...options,
  };

  return formDataOptions;
}

/**
 * Function to get formatted uploaded file
 * @param response data from upload auto file response
 * @param id target file id
 * @returns formatted object according TUploadedFile type
 */
export function getFormattedUploadedFile(
  response: TUploadResponse,
  id: string
): TUploadedFile {
  const { original_filename, public_id, format, resource_type, url } = response;

  return {
    id: id,
    public_id: public_id,
    name: original_filename,
    format: format,
    resource_type: resource_type,
    link: url,
  };
}

/**
 * Function to get data for post destroy request
 * @param apiSecret
 * @param apiKey
 * @param publicId public_id of destroying file
 * @returns ready data for post destroy request
 */
export async function getDestroyPostData(
  apiSecret: string,
  apiKey: string,
  publicId: string
): Promise<IFormDataOptions> {
  const { timestamp, signature } = await getSignData(apiSecret, {
    public_id: publicId,
  });

  return {
    public_id: publicId,
    timestamp,
    signature: signature,
    api_key: apiKey,
  };
}

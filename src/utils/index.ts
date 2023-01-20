import type { TFormDataOptions } from '@/types';
import { v2 as cloudinary } from 'cloudinary';

/**
 * Funstion to get timestamp for Cloudinary
 * @returns unix time in seconds of the current time
 */
export function getTimestamp(): number {
  return Math.round(new Date().getTime() / 1000);
}

/**
 * Function to get a signature of all request parameters for Cloudinary
 * @param secret unique API Key of Cloudinary product environment
 * @returns {timestamp, signature}
 */
export function getSignData(secret: string) {
  const timestamp = getTimestamp();
  const signApiOptions = {
    timestamp: timestamp,
    eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
    folder: 'signed_upload_demo_form',
  };
  const signature = cloudinary.utils.api_sign_request(signApiOptions, secret);

  return { timestamp, signature };
}

/**
 * Function to append options to FormData
 * @param formData with an appended file
 * @param options required and optional options of Cloudinary upload API
 * @returns ready to upload FormData
 */
export function appendFormDataOptions(
  formData: FormData,
  options: TFormDataOptions
) {
  Object.keys(options).forEach((key) => {
    formData.append(key, String(options[key as keyof TFormDataOptions]));
  });

  return formData;
}

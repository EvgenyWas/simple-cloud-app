import type { TFormDataOptions } from '@/types';
import { v2 as cloudinary } from 'cloudinary';

export function getTimestamp(): number {
  return Math.round(new Date().getTime() / 1000);
}

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

export function appendFormDataOptions(
  formData: FormData,
  options: TFormDataOptions
) {
  Object.keys(options).forEach((key) => {
    formData.append(key, String(options[key as keyof TFormDataOptions]));
  });

  return formData;
}

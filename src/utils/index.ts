import type { TFormDataOptions } from '@/types';

export function getTimestamp(): number {
  return Math.round(new Date().getTime() / 1000);
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

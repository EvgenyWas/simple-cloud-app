import type { TFormDataOptions, TSignData } from '@/types';

/**
 * Funstion to get timestamp for Cloudinary
 * @returns unix time in seconds of the current time
 */
export function getTimestamp(): number {
  return Math.round(new Date().getTime() / 1000);
}

/**
 * Function to get hash by SHA-1
 * @param str string
 * @returns hash string
 */
export async function getHash(str: string): Promise<string> {
  const utf8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
}

/**
 * Function to get sorted strings array alphabetically
 * @param strings
 * @returns sorted strings
 */
export function sortAlphabetically(strings: Array<string>): Array<string> {
  return strings.sort((a, b) => a[0].localeCompare(b[0]));
}

/**
 * Function to get encoding string
 * @param options object options for signature
 * @param secret unique API Key of Cloudinary product environment
 * @returns ready string for decoding
 */
export function getEncodingString(
  options: Record<string, string | number>,
  secret: string
): string {
  const entries = Object.entries(options).map((entry) => entry.join('='));
  const sortedEntries = sortAlphabetically(entries);
  const encodingString = sortedEntries.join('&') + secret;

  return encodingString;
}

/**
 * Function to get a signature of all request parameters for Cloudinary
 * @param secret unique API Key of Cloudinary product environment
 * @param options object with optional options for signature
 * @returns {timestamp, signature}
 */
export async function getSignData(
  secret: string,
  options?: Record<string, string | number>
): Promise<TSignData> {
  const timestamp = getTimestamp();
  const signApiOptions = {
    timestamp: timestamp,
    ...options,
  };
  const encodingOptions = getEncodingString(signApiOptions, secret);
  const signature = await getHash(encodingOptions);

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

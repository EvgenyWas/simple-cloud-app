import { MAX_FILE_SIZES_MB, SUPPORTED_IMAGE_FORMATES } from '@/config';

/**
 * Function to validate a file by size according to its type
 * @param file
 * @returns boolean
 */
export function validateFileSize(file: File): boolean {
  const bytesInMb = 1024 ** 2;
  const fileSizeInMb = file.size / bytesInMb;
  const isImageType = SUPPORTED_IMAGE_FORMATES.some((format) =>
    file.type.includes(format.toLowerCase())
  );
  if (isImageType) {
    return fileSizeInMb < MAX_FILE_SIZES_MB.IMAGE;
  } else {
    return fileSizeInMb < MAX_FILE_SIZES_MB.VIDEO;
  }
}

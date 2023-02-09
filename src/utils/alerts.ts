import { MAX_FILE_SIZES_MB, SUPPORTED_IMAGE_FORMATES } from '@/config';

export function alertUnsupportedFileSize(fileType: string): void {
  const isImageType = SUPPORTED_IMAGE_FORMATES.some((format) =>
    fileType.includes(format.toLowerCase())
  );
  const size = isImageType ? MAX_FILE_SIZES_MB.IMAGE : MAX_FILE_SIZES_MB.VIDEO;
  const alertedText = `Sorry, but for this file type ${fileType}, we only support a size of ${size}Mb`;

  alert(alertedText);
}

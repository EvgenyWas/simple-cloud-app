// Storage
export enum STORAGE_KEYS {
  USER_ID = 'user_id',
}

// Supported files formates according to Cloudinary
export const SUPPORTED_IMAGE_FORMATES = [
  'JPG',
  'JPEG',
  'PNG',
  'SVG',
  'GIF',
  'HEIC',
  'PDF',
];
export const SUPPORTED_VIDEO_FORMATES = ['MP4'];
export const SUPPORTED_AUDIO_FORMATES = ['MP3'];
export const SUPPORTED_FORMATES = [
  ...SUPPORTED_IMAGE_FORMATES,
  ...SUPPORTED_AUDIO_FORMATES,
  ...SUPPORTED_VIDEO_FORMATES,
];

// Max file sizes in Mb
export enum MAX_FILE_SIZES_MB {
  IMAGE = 10,
  VIDEO = 20,
}

// Misc
export const UPLOADING_DELAY = 500;

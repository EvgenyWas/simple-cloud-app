import type { TUploadingFile } from '@/types';
import { reactive } from 'vue';

export default function useUpload(userId: string) {
  const uploadingFiles = reactive<Array<TUploadingFile>>([]);
}

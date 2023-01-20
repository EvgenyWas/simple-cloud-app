import type { TUploadedFile } from '@/types';
import { reactive } from 'vue';

export default function useUploaded() {
  const uploadedFiles = reactive<Array<TUploadedFile>>([]);

  const addUploadedFile = (uploadedFile: TUploadedFile) =>
    uploadedFiles.push(uploadedFile);

  const removeUploadedFile = (uploadedFileId: string) => {
    const targetFileIdx = uploadedFiles.findIndex(
      (file) => file.id === uploadedFileId
    );
    uploadedFiles.splice(targetFileIdx, 1);
  };

  const loadUploadedFiles = (userId: string) => {};

  return {
    uploadedFiles,
    addUploadedFile,
    removeUploadedFile,
    loadUploadedFiles,
  };
}

import { fileSharing } from '@/services';
import type { TUploadedFile } from '@/types';
import { reactive } from 'vue';

export default function useUploaded() {
  const uploadedFiles = reactive<Array<TUploadedFile>>([]);

  const addUploadedFile = (uploadedFile: TUploadedFile) =>
    uploadedFiles.push(uploadedFile);

  const removeUploadedFile = async (uploadedFileId: string) => {
    const targetFileIdx = uploadedFiles.findIndex(
      (file) => file.id === uploadedFileId
    );
    const targetFile = uploadedFiles[targetFileIdx];

    try {
      await fileSharing.destroyFile(
        targetFile.public_id,
        targetFile.resource_type
      );
      uploadedFiles.splice(targetFileIdx, 1);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  };

  return {
    uploadedFiles,
    addUploadedFile,
    removeUploadedFile,
  };
}

import { fileSharing } from '@/services';
import type { TUploadedFile, TUploadingFile } from '@/types';
import type { AxiosProgressEvent } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { reactive } from 'vue';

export default function useUpload(userId: string) {
  const uploadingFiles = reactive<Array<TUploadingFile>>([]);

  const onUploadFileProgress = (
    uploadingFileId: string,
    progressEvent: AxiosProgressEvent
  ) => {
    const targetFileIdx = uploadingFiles.findIndex(
      (file) => file.id === uploadingFileId
    );
    const roundedProgress = Math.round(
      (progressEvent.loaded * 100) / Number(progressEvent?.total)
    );

    uploadingFiles[targetFileIdx].progress = roundedProgress;

    if (roundedProgress === 100) {
      uploadingFiles.splice(targetFileIdx, 1);
    }
  };

  const uploadFile = (
    file: File,
    handleUploaded: (uploadedFiles: TUploadedFile) => void
  ) => {
    const uploadingFileId = uuidv4();
    const formData = new FormData();

    uploadingFiles.push({
      id: uploadingFileId,
      name: file.name,
      progress: 0,
    });
    formData.append('file', file);
    setTimeout(async () => {
      try {
        const { data } = await fileSharing.uploadFileAuto(userId, formData, {
          onUploadProgress: (event) =>
            onUploadFileProgress(uploadingFileId, event),
        });
        const { original_filename, format, url } = data;
        const uploadedFile = {
          id: uploadingFileId,
          name: original_filename,
          format: format,
          link: url,
        };

        handleUploaded(uploadedFile);
      } catch (error: any) {
        console.error(`Error: ${error.message}`);
      }
    }, 500);
  };

  const uploadFiles = (
    files: FileList,
    handleUploaded: (uploadedFiles: TUploadedFile) => void
  ) => {
    const iterableFiles = [...files];
    iterableFiles.forEach((file) => {
      uploadFile(file, handleUploaded);
    });
  };

  const removeUploadingFile = (uploadingFileId: string) => {
    const targetFileIdx = uploadingFiles.findIndex(
      (file) => file.id === uploadingFileId
    );
    uploadingFiles.splice(targetFileIdx, 1);
  };

  return {
    uploadingFiles,
    onUploadFileProgress,
    uploadFiles,
    removeUploadingFile,
  };
}

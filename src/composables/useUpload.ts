import { UPLOADING_DELAY } from '@/config';
import { fileSharing } from '@/services';
import type { TUploadedFile, TUploadingFile } from '@/types';
import {
  alertUnsupportedFileSize,
  getFormattedUploadedFile,
  validateFileSize,
} from '@/utils';
import type { AxiosProgressEvent } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { reactive } from 'vue';

export default function useUpload(userId: string) {
  const uploadingFiles = reactive<Array<TUploadingFile>>([]);

  const onUploadFileProgress = (
    uploadingFileId: string,
    progressEvent: AxiosProgressEvent
  ) => {
    const progressFinish = 100;
    const targetFileIdx = uploadingFiles.findIndex(
      (file) => file.id === uploadingFileId
    );
    const roundedProgress = Math.round(
      (progressEvent.loaded * progressFinish) / Number(progressEvent?.total)
    );

    uploadingFiles[targetFileIdx].progress = roundedProgress;

    if (roundedProgress === progressFinish) {
      uploadingFiles.splice(targetFileIdx, 1);
    }
  };

  const uploadFile = (
    file: File,
    handleUploaded: (uploadedFiles: TUploadedFile) => void,
    controller: AbortController
  ) => {
    const uploadingFileId = uuidv4();
    const formData = new FormData();
    const signal = controller.signal;
    const handleAbort = () => controller.abort();

    uploadingFiles.push({
      id: uploadingFileId,
      name: file.name,
      progress: 0,
      handleAbort: handleAbort,
    });

    formData.append('file', file);

    const uploadOptions = {
      folder: userId,
      use_filename: true,
    };
    const uploadConfig = {
      onUploadProgress: (event: AxiosProgressEvent) =>
        onUploadFileProgress(uploadingFileId, event),
      signal,
    };

    setTimeout(async () => {
      try {
        const { data } = await fileSharing.uploadFileAuto(
          formData,
          uploadOptions,
          uploadConfig
        );
        const uploadedFile = getFormattedUploadedFile(data, uploadingFileId);

        handleUploaded(uploadedFile);
      } catch (error: any) {
        console.error(`Error: ${error.message}`);
      }
    }, UPLOADING_DELAY);
  };

  const uploadFiles = (
    files: FileList,
    handleUploaded: (uploadedFiles: TUploadedFile) => void
  ) => {
    const iterableFiles = [...files];

    iterableFiles.forEach((file) => {
      const controller = new AbortController();

      if (validateFileSize(file)) {
        uploadFile(file, handleUploaded, controller);
      } else {
        alertUnsupportedFileSize(file.type);
      }
    });
  };

  const removeUploadingFile = (
    uploadingFileId: string,
    handleAbort: () => void
  ) => {
    const targetFileIdx = uploadingFiles.findIndex(
      (file) => file.id === uploadingFileId
    );

    uploadingFiles.splice(targetFileIdx, 1);
    handleAbort();
  };

  return {
    uploadingFiles,
    onUploadFileProgress,
    uploadFiles,
    removeUploadingFile,
  };
}

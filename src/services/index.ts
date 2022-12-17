import type { STORAGE_KEYS } from '@/config';
import { ref } from 'vue';

export default function useStorage<T>(
  key: STORAGE_KEYS,
  initialValue: T,
  storage = localStorage
) {
  let storageValue = ref<any>();
  try {
    const value = storage.getItem(key) as string;
    storageValue.value = JSON.parse(value);
  } catch (error) {
    storageValue.value = initialValue;
  }

  function setItem(item: T) {
    try {
      const value = JSON.stringify(item);
      storageValue.value = item;
      storage.setItem(key, value);
    } catch (error) {
      storageValue.value = initialValue;
    }
  }

  function removeItem() {
    try {
      storage.removeItem(key);
    } catch (error) {
      storageValue.value = '';
    }
  }

  return { storageValue, setItem, removeItem };
}

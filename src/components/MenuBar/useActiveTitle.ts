import { useAppStore } from 'tsnh-macos-kernel';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const useActiveTitle = () => {
  const activeTitle = ref<string>();
  const menuBarRef = ref<HTMLDivElement>();

  const store = useAppStore();
  const { activeAppInfo } = storeToRefs(store);

  watch(activeAppInfo, () => {
    activeTitle.value = undefined;
  });

  function handleMenuBarItemClick(title: string) {
    activeTitle.value = title;
  }

  function handleMenuBarItemMouseOver(title: string) {
    if (activeTitle.value) {
      activeTitle.value = title;
    }
  }

  function handleDocumentClick(e: Event): void {
    if (!menuBarRef.value?.contains(e.target as HTMLElement)) {
      activeTitle.value = undefined;
    }
  }

  function handleDropdownClick() {
    activeTitle.value = undefined;
  }

  onMounted(() => {
    document.addEventListener('click', handleDocumentClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick);
  });

  return {
    activeTitle,
    menuBarRef,
    activeAppInfo,
    handleMenuBarItemClick,
    handleMenuBarItemMouseOver,
    handleDropdownClick,
  };
};

export default useActiveTitle;

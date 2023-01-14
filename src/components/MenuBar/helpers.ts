import { useAppStore } from 'tsnh-macos-kernel';
import appleIcon from '../../assets/icons/apple.svg';
import { EnumLocalApp } from '../../configs/localApps';
import useGlobalStore from '../../store/global';
import { ExtendedMenuBarItemConfig } from '../../types/menuBar';

export const getAppIconMenuBarItemConfig = (): ExtendedMenuBarItemConfig => {
  const { sleep, locksScreen } = useGlobalStore();
  const { open } = useAppStore();

  return {
    title: 'Apple Icon',
    icon: appleIcon,
    dropdownItems: [
      [
        {
          title: 'About this Mac',
          onClick: () => {
            open(EnumLocalApp.ABOUT_THIS_MAC);
          },
        },
      ],
      [
        {
          title: 'System Preference',
          onClick: () => {
            open(EnumLocalApp.SYSTEM_PREFERENCE);
          },
        },
      ],
      [
        {
          title: 'Sleep',
          onClick: () => {
            sleep();
          },
        },
        {
          title: 'Restart...',
          onClick: () => {
            document.location.reload();
          },
        },
      ],
      [
        {
          title: 'Lock Screen',
          onClick: () => {
            locksScreen();
          },
        },
      ],
    ],
  };
};

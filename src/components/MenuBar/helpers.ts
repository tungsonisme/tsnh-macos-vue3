import { useAppStore } from 'tsnh-macos-kernel';
import appleIcon from '../../assets/icons/apple.svg';
import { EnumLocalApp } from '../../configs/localApps';
import useGlobalStore from '../../store/global';
import { ExtendedMenuBarItemConfig } from '../../types/menuBar';
import MenuBarBattery from './MenuBarBattery.vue';
import MenuBarTime from './MenuBarTime.vue';

export const getAppIconMenuBarItemConfig = (): ExtendedMenuBarItemConfig => {
  const { sleep, locksScreen } = useGlobalStore();
  const { open } = useAppStore();

  return {
    title: 'AppleIcon',
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

export const getBatteryMenuBarItemConfig = (): ExtendedMenuBarItemConfig => {
  return {
    title: 'MenuBarBattery',
    component: MenuBarBattery,
    dropdownItems: [
      [
        {
          title: 'About this Mac',
          onClick: () => {
            open(EnumLocalApp.ABOUT_THIS_MAC);
          },
        },
      ],
    ],
  };
};

export const getTimeMenuBarItemConfig = (): ExtendedMenuBarItemConfig => {
  return {
    title: 'MenuBarTime',
    component: MenuBarTime,
    dropdownItems: [],
  };
};

export const getTime = (): string => {
  const dateObject = new Date();
  const day = (() => {
    switch (dateObject.getDay()) {
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thurs';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      case 7:
        return 'Sun';
    }
  })();
  const month = (() => {
    switch (dateObject.getMonth()) {
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
    }
  })();
  const date = dateObject.getDate();
  const realHour = dateObject.getHours();
  const realMinute = dateObject.getMinutes();
  const hour = realHour > 12 ? realHour - 12 : realHour;
  const minute = realMinute < 10 ? `0${realMinute}` : realMinute;
  const dayLight = realHour >= 12 ? 'pm' : 'am';

  return `${day} ${date} ${month} ${hour}:${minute} ${dayLight}`;
};

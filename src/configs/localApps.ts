import { App } from 'tsnh-macos-kernel';
import SystemPreferencesIcon from '../assets/icons/systemPreferences.svg';

export enum EnumLocalApp {
  ABOUT_THIS_MAC = 'about-this-mac',
  SYSTEM_PREFERENCE = 'system-preferences',
}

const localApps: App[] = [
  {
    type: 'vue',
    name: EnumLocalApp.ABOUT_THIS_MAC,
    title: 'About This Mac',
    icon: '',
    component: 'AboutThisMac',
    hiddenInDock: true,
    defaultStyles: {
      isHorizontallyCenter: true,
      top: 150,
      width: 580,
      height: 300,
    },
  },
  {
    type: 'vue',
    name: EnumLocalApp.SYSTEM_PREFERENCE,
    title: 'System Preferences',
    icon: SystemPreferencesIcon,
    component: 'SystemPreferences',
    defaultStyles: {
      isHorizontallyCenter: true,
      top: 200,
      width: 600,
      height: 400,
    },
  },
];

export default localApps;

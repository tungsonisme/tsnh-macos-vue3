import { App } from 'tsnh-macos-kernel';

export enum EnumLocalApp {
  ABOUT_THIS_MAC = 'about-this-mac',
  SYSTEM_PREFERENCE = 'system-preferences',
}

const localApps: App[] = [
  {
    name: EnumLocalApp.ABOUT_THIS_MAC,
    title: 'About This Mac',
    icon: '',
    mainComponent: 'AboutThisMac',
    hiddenInDock: true,
    defaultStyles: {
      isHorizontallyCenter: true,
      top: 150,
      width: 580,
      height: 300,
    },
  },
  {
    name: EnumLocalApp.SYSTEM_PREFERENCE,
    title: 'System Preferences',
    icon: '',
    mainComponent: 'SystemPreferences',
    defaultStyles: {
      isHorizontallyCenter: true,
      top: 200,
      width: 600,
      height: 400,
    },
  },
];

export default localApps;

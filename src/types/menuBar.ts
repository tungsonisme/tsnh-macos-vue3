import { MenuBarItem as MenuBarItemConfig } from 'tsnh-macos-kernel';

export interface ExtendedMenuBarItemConfig extends MenuBarItemConfig {
  isAppName?: true;
}

import { useAppStore } from 'tsnh-macos-kernel';
import { App as VueApp, defineAsyncComponent } from 'vue';
import localApps from '../configs/localApps';

export const loadLocalApps = (vueApp: VueApp) => {
  const { installApps } = useAppStore();

  installApps(localApps);

  localApps.forEach((app) => {
    vueApp.component(
      app.component,
      defineAsyncComponent(
        () => import(`../localApps/${app.component}/index.vue`)
      )
    );
  });
};

// DO NOT REMOVE
export const loadRemoteVueApps = () => {
  console.log('Load Remote Vue Apps Annotation');
};

// DO NOT REMOVE
export const loadRemoteReactApps = async () => {
  console.log('Load Remote React Apps Annotation');
};

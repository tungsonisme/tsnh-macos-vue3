import { useAppStore } from 'tsnh-macos-kernel';
import localApps from '../configs/localApps';
import { App as VueApp, defineAsyncComponent } from 'vue';

export const loadLocalApps = (vueApp: VueApp) => {
  const { installApps } = useAppStore();

  installApps(localApps);

  localApps.forEach((app) => {
    vueApp.component(
      app.mainComponent,
      defineAsyncComponent(
        () => import(`../localApps/${app.mainComponent}/index.vue`)
      )
    );
  });
};

// DO NOT REMOVE
export const loadRemoteApps = () => {
  console.log('Load Remote Apps Annotation');
};

const capitalizeFirstLetter = (str: string) => {
  return `${str[0].toUpperCase()}${str.substring(1, str.length)}`;
};

const defineRemoteComponents = (
  viteRegisteredApps: { app: string; component: string }[]
) => {
  return {
    name: 'remotes-plugin',
    transform(src, id) {
      if (id.includes('src/main.ts')) {
        const injectedCode = `
          import { defineAsyncComponent } from 'vue';
          
          ${src.replace(
            'loadRemoteApps();',
            viteRegisteredApps
              .map(({ app, component }) => {
                const componentName = `${capitalizeFirstLetter(
                  app
                )}${capitalizeFirstLetter(component)}`;

                return `
                  const ${componentName} = defineAsyncComponent(() => import('${app}/${component}'));
                  app.component('${componentName}', ${componentName});
                `;
              })
              .join('\n')
          )}
      `;

        return {
          code: injectedCode,
          map: null,
        };
      }

      return {
        code: src,
        map: null,
      };
    },
  };
};

export default defineRemoteComponents;

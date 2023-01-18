const capitalizeFirstLetter = (str: string) => {
  return `${str[0].toUpperCase()}${str.substring(1, str.length)}`;
};

export const defineVueRemoteComponents = (
  viteVueApps: { app: string; component: string }[]
) => {
  return {
    name: 'define-vue-remote-components-plugin',
    transform(src, id) {
      if (id.includes('src/main.ts')) {
        const injectedCode = `
          import { defineAsyncComponent } from 'vue';
          
          ${src.replace(
            'loadRemoteVueApps();',
            viteVueApps
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

export const defineReactRemoteComponents = (
  viteReactApps: { app: string; component: string }[]
) => {
  return {
    name: 'define-react-remote-components-plugin',
    transform(src, id) {
      if (id.includes('src/main.ts')) {
        const injectedCode = `
          import ReactDOMServer from 'react-dom/server';
          
          ${src.replace(
            'loadRemoteReactApps();',
            viteReactApps
              .map(({ app, component }) => {
                const componentName = `${app}/${component}`;

                return `
                  reactApps['${app}/${component}'] = () => {
                    return new Promise(async (resolve, reject) => {
                      try {
                        const res = (await import('${componentName}')).default;
                        resolve(ReactDOMServer.renderToString(res()));
                      } catch (err) {
                        reject(err);
                      }
                    });
                  }
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

import { reactApps } from '../../main';

export const fetchReactComponent = async (componentName: string) => {
  // eslint-disable-next-line no-async-promise-executor
  return await reactApps[componentName]();
};

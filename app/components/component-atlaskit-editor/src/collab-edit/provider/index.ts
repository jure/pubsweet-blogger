export * from './types';
export { CollabProvider } from './collab-provider';
export const logger = (
  msg: string,
  data: any = null,
  style: string = 'color:blue;font-weight:bold;',
) => {
  // tslint:disable-next-line:no-console
  console.log(`%cCollab-Edit: ${msg}`, style);
  if (data) {
    // tslint:disable-next-line:no-console
    console.log(data);
  }
};

declare module '*.view.html' {
  import { ComponentInfo } from '@uixjs/core';

  export interface IncompleteComponentInfo {
    name: string;
    controller: any;
    dependencies?: ComponentInfo['dependencies'];
  }

  const defineComponent: (info: IncompleteComponentInfo) => ComponentInfo;
  export default defineComponent;
  export { defineComponent, ComponentInfo };
}

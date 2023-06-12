declare module '*.view.html' {
  export interface ComponentInfo {
    name: string;
    controller: any;
    view: any;
    stylesheets: any[];
    dependencies: (ComponentInfo | DeferredComponentInfo)[];
  }

  export interface IncompleteComponentInfo {
    name: string;
    controller: any;
    dependencies?: (ComponentInfo | DeferredComponentInfo)[];
  }

  export interface DeferredComponentInfo {
    name: string;
    load: () => Promise<ComponentInfo | { default: ComponentInfo }>;
  }

  const defineComponent: (info: IncompleteComponentInfo) => ComponentInfo;
  export default defineComponent;
  export { defineComponent };
}

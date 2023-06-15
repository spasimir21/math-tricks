import { UixComponent } from '../component/Component';
import { context } from '../../helpers/context';
import { Controller } from '../../Controller';
import { Registry } from '../../Registry';

function component(
  elements: Record<string, HTMLElement>,
  placeholderId: string,
  styleScopeId: string,
  controller: Controller,
  componentName: string,
  otherRegistry?: Registry | string
) {
  const fullComponentName = otherRegistry
    ? `${typeof otherRegistry === 'string' ? otherRegistry : otherRegistry.registryNamespace}--${componentName}`
    : `${controller.component.registry.registryNamespace}--${componentName}`;

  const newComponent = document.createElement(fullComponentName) as UixComponent;
  newComponent.setAttribute(styleScopeId, '');
  newComponent.isControlled = true;

  newComponent.context = context(newComponent.context, controller.context);

  elements[placeholderId].replaceWith(newComponent);
  elements[placeholderId] = newComponent;

  return newComponent.kill.bind(newComponent);
}

function initComponent(component: UixComponent) {
  component.allowInitialization();
}

export { component, initComponent };

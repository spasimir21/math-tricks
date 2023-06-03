import { _class, _forEach, component, initComponent, prop, view } from '@uix';
import { GridController } from './grid.controller';

const cellView = view<GridController & { x: number; y: number }>(
  `
  <placeholder $='cell'></placeholder>
`,
  (elements, $) => [
    component(elements, 'cell', $, 'cell'),
    prop(elements['cell'] as any, 'position', () => $.y * $.gridSettings.width + $.x),
    initComponent(elements['cell'] as any)
  ]
);

const rowView = view<GridController & { y: number }>(
  `
  <div class='row'>
    <placeholder $='row'></placeholder>
  </div>
`,
  (elements, $) => [
    _forEach(elements['row'], $, 'x', () => new Array($.gridSettings.width).fill(0).map((_, i) => i), cellView, null)
  ]
);

const gridView = view<GridController>(
  `
  <placeholder $='rows'></placeholder>
`,
  (elements, $) => [
    _forEach(elements['rows'], $, 'y', () => new Array($.gridSettings.height).fill(0).map((_, i) => i), rowView, null)
  ]
);

export { gridView };

import { Transformer } from '@parcel/plugin';
import { compile } from './compile';

const stylesheetTransformer = new Transformer({
  transform: async ({ asset }) => {
    if (asset.type != 'css') return [asset];

    const code = await asset.getCode();

    asset.type = 'js';
    asset.setCode(compile(code));

    return [asset];
  }
});

export default stylesheetTransformer;

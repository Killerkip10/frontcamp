import React, { memo } from 'react';

import { DATA_CY } from './constants';

export const NewsInfo = memo(({ info: { subsection, title, abstract, section } }) => (
  <div data-cy={DATA_CY.ITEM_INFO}>
    <div>{subsection}</div>
    <div>{title}</div>
    <div>{abstract}</div>
    <div>{section}</div>
  </div>
));

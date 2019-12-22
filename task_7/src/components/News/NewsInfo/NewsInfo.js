import React, { memo } from 'react';

export const NewsInfo = memo(({ info: { subsection, title, abstract, section } }) => (
  <div>
    <div>{subsection}</div>
    <div>{title}</div>
    <div>{abstract}</div>
    <div>{section}</div>
  </div>
));

import React, { memo, useLayoutEffect } from 'react';

export const NewsInfo = memo(({ isFetching, info, getNewsById }) => {
  useLayoutEffect(() => { getNewsById() }, [getNewsById]);

  const { subsection, title, abstract, section } = info;

  if (isFetching) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <div>{subsection}</div>
      <div>{title}</div>
      <div>{abstract}</div>
      <div>{section}</div>
    </div>
  );
});
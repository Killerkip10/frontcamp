import React, { memo, useEffect } from 'react';

export const NewsInfo = memo(({ isFetching, info, getNewsById }) => {
  useEffect(() => { getNewsById() }, []);

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
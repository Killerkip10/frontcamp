import React, { useCallback, memo } from 'react';

import { ARTICLE_TOPICS, DATA_CY } from './constants';

export const NewsList = memo(({
  news,
  topic,
  changeTopic,
  clickDetails,
}) => {
  const handleTopicChange = useCallback(({ target: { value } }) => changeTopic(value), [changeTopic]);

  const handleDetailsClick = useCallback(({ target: { dataset: { index } } }) => index && clickDetails(index, topic), [topic]);

  return (
    <div>
      <div>
        <select value={topic} onChange={handleTopicChange} data-cy={DATA_CY.SELECT_TOPIC}>
          {Object.values(ARTICLE_TOPICS).map(value => (
            <option key={value} value={value}>{value}</option>         
          ))}
        </select>
      </div>

      <div>
        {news.map(({ title, url }, index) => (
          <div key={url} onClick={handleDetailsClick} data-cy={DATA_CY.LIST_ITEM}>
            <div>{title}</div>
            <button data-index={index}>Details</button>
          </div>
        ))}
      </div>
    </div>
  );
});

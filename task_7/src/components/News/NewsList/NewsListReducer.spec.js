import { newsList } from './NewsListReducer';
import { ARTICLE_TOPICS } from './constants';
import {
    getNewsListRequest,
    getNewsListSuccess,
    getNewsListFailure,
    changeTopic,
} from './NewsListActions';

describe('NewsListReducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            isFetching: false,
            topic: ARTICLE_TOPICS.ARTS,
            news: [],
        };
    });

    it('should return initialState', () => {
        expect(newsList(initialState, {})).toEqual(initialState);
    });

    it('should handle getNewsListRequest', () => {
        const action = getNewsListRequest();
        const expectedResult = { ...initialState, isFetching: true };

        expect(newsList(initialState, action)).toEqual(expectedResult);
    });

    it('should handle getNewsListSuccess', () => {
        const news = [{ topic: 'topic-1', url: 'url-1' }];
        const action = getNewsListSuccess(news);
        const expectedResult = { ...initialState, news, isFetching: false };

        expect(newsList(initialState, action)).toEqual(expectedResult);
    });

    it('should handle getNewsListFailure', () => {
        const action = getNewsListFailure();
        const expectedResult = { ...initialState, isFetching: false };

        expect(newsList(initialState, action)).toEqual(expectedResult);
    });

    it('should handle changeTopic', () => {
        const topic = 'topic-1';
        const action = changeTopic(topic);
        const expectedResult = { ...initialState, topic };

        expect(newsList(initialState, action)).toEqual(expectedResult);
    });
});
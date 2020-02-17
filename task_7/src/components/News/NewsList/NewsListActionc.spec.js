import {
    getNewsListRequest,
    getNewsListSuccess,
    getNewsListFailure,
    changeTopic,
    NEWS_LIST_GET_REQUEST,
    NEWS_LIST_GET_SUCCESS,
    NEWS_LIST_GET_FAILURE,
    CHANGE_TOPIC,
} from './NewsListActions';

describe('NewsListActions', () => {
    it('getNewsListRequest should return NEWS_LIST_GET_REQUEST', () => {
        const expectedResult = {
            type: NEWS_LIST_GET_REQUEST,
            payload: { isFetching: true },
        };

        expect(getNewsListRequest()).toEqual(expectedResult);
    });

    it('getNewsListSuccess should return NEWS_LIST_GET_SUCCESS', () => {
        const news = [{ topic: 'topic-1', url: 'url-1' }];
        const expectedResult = {
            type: NEWS_LIST_GET_SUCCESS,
            payload: { news, isFetching: false },
        };

        expect(getNewsListSuccess(news)).toEqual(expectedResult);
    });

    it('getNewsListFailure should return NEWS_LIST_GET_FAILURE', () => {
        const expectedResult = {
            type: NEWS_LIST_GET_FAILURE,
            payload: { isFetching: false },
        };

        expect(getNewsListFailure()).toEqual(expectedResult);
    });

    it('changeTopic should return CHANGE_TOPIC', () => {
        const topic = 'topic-1';
        const expectedResult = {
            type: CHANGE_TOPIC,
            payload: { topic },
        };

        expect(changeTopic(topic)).toEqual(expectedResult);
    });
});
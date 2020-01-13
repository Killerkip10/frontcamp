const LOCAL_HOST = 'http://localhost:3000/';
const EXTERNAL_HOST = 'https://api.nytimes.com/';

const EXTERNAL_API_KEY = '7wLat0smbCaZjbsMyErdSJqe8gn06EiC';

export const API = {
  LOGIN_GOOGLE: `${LOCAL_HOST}auth/google`,
  GET_NEWS_LOCAL: `${LOCAL_HOST}news`,

  GET_NEWS_EXTERNAL: `${EXTERNAL_HOST}svc/topstories/v2/books.json?api-key=${EXTERNAL_API_KEY}`,
};

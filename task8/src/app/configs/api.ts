const EXTERNAL_HOST = 'https://api.nytimes.com/';
const EXTERNAL_API_KEY = '7wLat0smbCaZjbsMyErdSJqe8gn06EiC';

export const API = {
  LOGIN_GOOGLE: '/api/auth/google',
  PROFILE: '/api/user',
  NEWS_LOCAL: '/api/news',
  NEWS_EXTERNAL: `${EXTERNAL_HOST}svc/topstories/v2/books.json?api-key=${EXTERNAL_API_KEY}`,
};

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3005';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const fillSpacesWithUnderscores = (str) => {
  return str.replace(/\s/g, '_');
};

const articleExists = async (name) => {
  const articleId = fillSpacesWithUnderscores(name);
  try {
    await axios.get(`/articles/${articleId}`);
    return true;
  } catch (error) {
    return false;
  }
}

const getArticle = async (name) => {
  const articleId = fillSpacesWithUnderscores(name);
  try {
    const response = await axios.get(`/articles/${articleId}`, {
      params: {
        _embed: 'pendingContributions'
      }
    });
    return response.data;
  } catch {
    return null;
  }
}

const getArticles = async (search = '', page = 1, limit = 5, sort = '', order = '') => {
  try {
    const response = await axios.get('/articles', {
      params: {
        q: search,
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order
      }
    });
    return response.data;
  } catch {
    return null;
  }
}

const postContribution = async (contribution) => {
  try {
    const response = await axios.post(`/pendingContributions`, contribution)
    return response.data;
  } catch {
    return null;
  }
}

export { getArticle, getArticles, articleExists, postContribution };
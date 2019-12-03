const uuid = require('uuid');

module.exports = () => {
  let news = [
    {
      id: '59a57a5f-9c38-4083-8f92-d34b465d2523',
      title: 'title-1',
      description: 'description-1',
      author: 'uladzislau pinchuk',
    },
    {
      id: 'ce48158e-b207-4b85-abea-e400af592313',
      title: 'title-2',
      description: 'description-2',
      author: 'pavel stelmah',
    }
  ];
  
  const findAll = () => Promise.resolve(news);

  const findById = id => Promise.resolve(news.find(n => n.id === id));

  const remove = (id) => {
    news = news.filter(n => n.id !== id);

    return Promise.resolve();
  };

  const add = (n) => {
    const createdNews = { ...n, id: uuid() };
    
    news.push(createdNews);

    return Promise.resolve(createdNews);
  };

  const update = (id, rest) => {
    news = news.map((n) => {
      if (n.id !== id) {
        return n;
      }

      return {
        ...n,
        ...rest,
        id: n.id,
      };
    });

    return findById(id);
  };


  return {
    findAll,
    findById,
    remove,
    add,
    update,
  };
};
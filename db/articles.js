(function () {
  const articles = {
    "articles": []
  };

  const getArticles = () => {
    return articles.articles;
  };

  const addArticle = (title, body, author) => {
    let article = {};

    article.title = title;
    article.body = body;
    article.author = author;
    articles.articles.push(article);
  };

  const readArticle = (title) => {
    let index = -1;

    articles.articles.forEach(article => {
      if (article.title === title) {
        return index = articles.articles.indexOf(article);
      }
    });

    if (index < 0) {
      return false;
    }
    return articles.articles[index];
  };

  const editArticle = (data) => {
    let article = readArticle(data.title);

    for (var key in data) {
      article[key] = data.key;
    }
  };

  const deleteArticle = (title) => {
    let article = readArticle(title);

    articles.articles.splice(articles.articles.indexOf(article), 1);
  };

  module.exports = {
    getArticles,
    addArticle,
    readArticle,
    editArticle,
    deleteArticle
  };

})();
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

    if (!article) {
      return false;
    }

    for (var key in data) {
      article[key] = data.key;
    }

    return true;
  };

  const deleteArticle = (title) => {
    let article = readArticle(title);

    if (!article) {
      return false;
    }

    articles.articles.splice(articles.articles.indexOf(article), 1);
    return true;
  };

  module.exports = {
    getArticles,
    addArticle,
    readArticle,
    editArticle,
    deleteArticle
  };

})();
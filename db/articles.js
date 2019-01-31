(function () {
  const articles = {
    "articles": [
      {
        title: "My Swedish-made Penis Enlarger and Me",
        author: "Austin Powers",
        body: "That's not mine",
      }
    ]
  };

  const getArticles = () => {
    return articles;
  };

  const addArticle = (title, body, author) => {
    let article = {};

    article.title = title;
    article.body = body;
    article.author = author;
    articles.articles.push(article);
  };

  const findArticle = (title) => {
    let index = -1;
    let formattedArg = title.split(' ').join('').toLowerCase();

    articles.articles.forEach(article => {
      if (article.title.split(' ').join('').toLowerCase() === formattedArg) {
        return index = articles.articles.indexOf(article);
      }
    });

    if (index < 0) {
      return false;
    }
    return index;
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
    let articleIndex = findArticle(title);

    if (typeof article !== 'number') {
      return false;
    }

    articles.articles.splice(articles.articles.indexOf(articleIndex), 1);
    return true;
  };

  module.exports = {
    getArticles,
    addArticle,
    findArticle,
    editArticle,
    deleteArticle
  };

})();
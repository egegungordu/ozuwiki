
const articleExists = async (articleName) => {

  const response = await new Promise((resolve, reject) => {
    const exists = Math.floor(Math.random() * 5) === 1
    setTimeout(() => {
      resolve(exists)
    }, 800)
  });

  return response;
}


const getArticle = async (name, length = 2) => {

  let fullMarkdown = ''
  for (let i = 1; i <= length; i++) {
    const response = await fetch(`https://jaspervdj.be/lorem-markdownum/markdown.txt?num-blocks=${i * 2}`)
    const markdown = await response.text()
    const randomX = Math.floor(Math.random() * 50) + 10
    const randomY = Math.floor(Math.random() * 50) + 10
    const image = `![](https://picsum.photos/${400 + randomX}/${200 + randomY})`
    fullMarkdown += markdown + '\n\n' + image + '\n\n'
  }

  return {
    name: name,
    imageUrl: 'https://picsum.photos/350',
    imageDescription: 'Placeholder image',
    markdown: fullMarkdown,
    details: [
      {
        id: 0,
        title: 'Title 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        id: 1,
        title: 'Title 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ]
  }
}

export { getArticle, articleExists };
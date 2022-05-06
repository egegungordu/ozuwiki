
const getArticle = async (name) => {
  const response1 = await fetch('https://jaspervdj.be/lorem-markdownum/markdown.txt')
  const response2 = await fetch('https://jaspervdj.be/lorem-markdownum/markdown.txt')
  const markdown1 = await response1.text()
  const markdown2 = await response2.text()
  
  return {
    name: name,
    imageUrl: 'https://picsum.photos/350',
    imageDescription: 'Placeholder image',
    markdown: markdown1 + '\n\n' + markdown2,
    details: [
      {
        title: 'Title 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        title: 'Title 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ]
  }
}

export { getArticle };
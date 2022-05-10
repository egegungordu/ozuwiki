import { SkeletonTable } from '../../common/Skeletons'

export default function TableOfContents(props) {
  const contents = calculateTableOfContents(props.markdown)
  const compact = props.compact || 6
  const contentsComponents = contents.map((content, index) => {
    return <Content key={index} content={content} compact={compact} onClick={props.onLinkClick} />
  })
 
  return (
    <div className="d-flex flex-column">
      {props.markdown ? contentsComponents : <SkeletonTable />}
    </div>
  )
}

function Content(props) {
  const { index, level, title, id } = props.content
  
  const handleClick = (e) => {
    e.preventDefault()
    const top = document.getElementById(id).offsetTop
    window.scrollTo(0, top)
    props.onClick && props.onClick(id)
  }

  return (
    <div className="d-flex flex-row">
      {Array.from({length: level}).map((_, index) => {
        return (
          <div key={index} className="ms-1 me-3 border-start">
          </div>
        )
      })}
      <div className={`py-1 d-flex flex-${level > props.compact - 1 ? 'column' : 'row'}`}>
        <span className="toc-counter">{index}</span>
        <a className="ms-2 toc-content" href={'#' + id} onClick={handleClick}>{title}</a>
      </div>
    </div>
  )
}

function calculateTableOfContents(article) {
  // TODO: this matches unvalid headers that are longer than 6
  const regex = /(#{1,6}) (.*)/g
  const contents = []
  const counters = new Array(6).fill(0)
  let match
  while(null != (match=regex.exec(article))) {
    const level = match[1].length - 1
    const title = match[2]
    const id = title.replace(/\s/g, '-').toLowerCase()
    counters[level]++
    for(let i = level+1; i < 6; i++) {
      counters[i] = 0
    }
    contents.push({
      index: counters.slice(0, level+1).join('.'),
      level: level,
      title: title,
      id: id
    })
  }
  return contents
}
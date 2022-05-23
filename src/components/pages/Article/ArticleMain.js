import Skeleton from 'react-loading-skeleton';
import { SkeletonArticle } from '../../common/Skeletons';
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

export default function ArticleMain(props) {
  const {
    name,
    markdown,
    lastUpdated,
  } = props.article || {}

  const date = useMemo(() => {
    const date = new Date(lastUpdated)
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }, [lastUpdated])

  return (
    <div className="p-5">
      <div className="d-none d-sm-block primary-text">
        <div className="d-flex justify-content-between align-items-end">
          <h1 className="mb-0">{name || <Skeleton />}</h1>
          <small className="text-muted text-start mb-0">
            {lastUpdated ? `Last updated ${date}` : <Skeleton />}
          </small>
        </div>
        <hr></hr>
      </div>
      {markdown
        ? <ReactMarkdown className="markdown" children={markdown} remarkPlugins={[remarkGfm]}
          components={{
            h1: HeadingRenderer,
            h2: HeadingRenderer,
            h3: HeadingRenderer,
            h4: HeadingRenderer,
            h5: HeadingRenderer,
            h6: HeadingRenderer,
          }}
        />
        : <SkeletonArticle />
      }
    </div>
  )
}

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children)
  var text = children.reduce(flatten, '')
  var slug = text.toLowerCase().replace(/\W/g, '-')
  return React.createElement('h' + props.level, { id: slug, className: 'anchor' }, props.children)
}
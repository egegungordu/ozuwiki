

export default function ContributePanel() {
  return (
    <div className="p-4">
      <h3>
        How to contribute
      </h3>
      <p>
        You are viewing the <strong>Contribute</strong> page. Students of Ozyegin University can make edits and updates to the articles on this website. All edits are reviewed by the Ozyegin University staff before being approved and published.
      </p>
      <p>
        Things to pay attention to:
      </p>
      <ul>
        <li>
          <strong>Article Name</strong> - This is the name of the article. It is used to identify the article.
        </li>
        <li>
          <strong>Article Image</strong> - This is the main image that will be displayed on the article. It is recommended to use a square image. Aditional images can be added in the content section in Markdown.
          <small className="text-muted">
            {' '}<a href="https://www.markdownguide.org/basic-syntax/#images-1" className="text-tertiary" target="_blank" rel="noopener noreferrer">How to add images in markdown</a>
          </small>
        </li>
        <li>
          <strong>Article Details</strong> - This is where you can add additional details to the article. These details will be displayed on the right side of the article, below the image.
        </li>
        <li>
          <strong>Article Content</strong> - This is the main content of the article. It is recommended to get familiar with the Markdown syntax before editing this section.
          <small className="text-muted">
            {' '}<a href="https://www.markdownguide.org/basic-syntax/" className="text-tertiary" target="_blank" rel="noopener noreferrer">Learn more</a>
          </small>
        </li>
        <li>
          <strong>Contribution Comment</strong> - This is where you explain your edits. This is required. It is not displayed on the website, but is used to help the staff understand your edits.
        </li>
      </ul>
      <small className="text-muted">
        <strong>Note:</strong> The <strong>Article Image</strong> and <strong>Article Details</strong> are optional.
      </small>
    </div>
  )

}
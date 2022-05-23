/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from "react";
import { Spinner, Row, Col, Form, Button, Image, Toast } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getArticle, articleExists } from '../../../api/ArticleAPI';

export default function ContributeMain() {
  const [article, setArticle] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState(null)
  const [showToast, setShowToast] = useState(false);
  const [articleNameExists, setArticleNameExists] = useState(false);
  const [lastCheckTimeout, setLastCheckTimeout] = useState(null);
  const params = useParams();
  const articleNameInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const spinnerRef = useRef(null);
  const maxDetailTitleLength = 30;
  const maxDetailDescriptionLength = 200;
  const maxImageDescriptionLength = 200;
  const maxArticleNameLength = 40;
  const maxContributionCommentLength = 500;

  useEffect(() => {
    const asyncSet = async () => {
      const response = await getArticle(params.articleName, 3);
      setArticle(response)
      setHasImage(response.imageUrl ? response.imageUrl !== '' : false)
    }
    asyncSet()
  }, []);

  const toggleShowToast = () => setShowToast(!showToast);

  // const [lastName, setLastName] = useState('');

  let lastName = useMemo(() => '');

  // After 1000 milliseconds, check if the article name exists
  const handleArticleNameChange = async (e) => {
    // setLastName(e.target.value);
    lastName = e.target.value
    console.log(lastName);
    const articleName = e.target.value;
    if (articleName.length === 0) {
      clearTimeout(lastCheckTimeout);
      spinnerRef.current && spinnerRef.current.classList.add('d-none');
      setArticleNameExists(false);
    } else {
      spinnerRef.current && spinnerRef.current.classList.remove('d-none');
      clearTimeout(lastCheckTimeout);
      const timeout = setTimeout(async () => {
        const response = await articleExists(articleName);
        console.log(lastName, articleName)
        setArticleNameExists(response);
        spinnerRef.current && spinnerRef.current.classList.add('d-none');
        // this fixes weirdness with bootstrap not changing validity
        articleNameInputRef && articleNameInputRef.current.setCustomValidity(response ? 'im a non empty string' : '');
      }, 1000);
      setLastCheckTimeout(timeout);
    }
  }

  const handleRemoveDetail = (index) => {
    const newArticle = { ...article };
    newArticle.details.splice(index, 1);
    setArticle(newArticle);
  }

  const handleRemoveImage = () => {
    const newArticle = { ...article };
    newArticle.imageUrl = '';
    setArticle(newArticle);
    setHasImage(false);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const image = URL.createObjectURL(file);
    setImage(image);
    setHasImage(true);
  }

  const handleCheckboxChange = (e) => {
    submitButtonRef.current.disabled = !e.target.checked;
  }

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setShowToast(true);
    setValidated(true);
  };

  return (
    <div className="p-5 pt-4">
      <h2 style={{ fontFamily: 'inherit', color: 'var(--text-secondary)' }}>
        You are editing:
        <span style={{ color: 'var(--text-primary)' }}>
          {` ${params.articleName}`}
        </span>
      </h2>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <fieldset >
          <Form.Group className="mb-3 col col-12 col-sm-6 col-md-4">
            <Form.Label htmlFor="articleName">Article Name</Form.Label>
            <div className="d-flex align-items-top">
              <div>
                <Form.Control ref={articleNameInputRef} required maxLength={maxArticleNameLength} onChange={handleArticleNameChange} isInvalid={articleNameExists} id="articleName" placeholder="Article Name" defaultValue={article && article.name} />
                <Form.Control.Feedback type="invalid" >{articleNameExists ? "Theres already an article about" : "Article Name is required!"}</Form.Control.Feedback>
              </div>
              <Spinner ref={spinnerRef} animation="border" variant="primary" className="ms-3 d-none" />
            </div>
          </Form.Group>
          <Row>
            <Col className="col-12 col-lg-6">
              <Form.Group className="mb-3">
                <Form.Label>Article Image</Form.Label>
                <br></br>
                <div className="d-flex align-items-center">
                  <Form.Label className="m-0 btn-primary btn" htmlFor="articleImage">Choose Image</Form.Label>
                  <Form.Control className="d-none" id="articleImage" type="file" onChange={handleImageChange} accept="image/*" />
                  {hasImage && <Button variant="outline-danger" className="ms-auto" size="sm" onClick={handleRemoveImage}>Remove Image</Button>}
                </div>
              </Form.Group>
              {hasImage && (image
                ? <Image variant="top" fluid src={image} rounded className="w-100" />
                : <Image variant="top" src={article && article.imageUrl} rounded className="w-100" />)}
              {hasImage && <Form.Group className="mt-3">
                <Form.Label htmlFor="articleImageDescription">Image Description</Form.Label>
                <Form.Control required maxLength={maxImageDescriptionLength} id="articleImageDescription" as="textarea" rows="3" placeholder="Detail Description" defaultValue={article && article.imageDescription} />
                <Form.Control.Feedback type="invalid" >Image Description is required!</Form.Control.Feedback>
              </Form.Group>}
            </Col>
            <Col className="col-12 col-lg-6">
              <Row className="m-0">
                <Form.Group className="mb-3">
                  <Form.Label>Article Details</Form.Label>
                  {article && article.details.map((detail, index) => {
                    return (
                      <div key={detail.id} className="d-flex py-3 flex-column">
                        <Form.Control required maxLength={maxDetailTitleLength} placeholder="Detail Title" defaultValue={detail.title} />
                        <Form.Control.Feedback type="invalid" >Detail Title is required!</Form.Control.Feedback>
                        <Form.Control required maxLength={maxDetailDescriptionLength} className="mt-2" as="textarea" rows="3" placeholder="Detail Description" defaultValue={detail.description} />
                        <Form.Control.Feedback type="invalid" >Detail Description is required!</Form.Control.Feedback>
                        <Button variant="outline-danger" className="mt-2" size="sm" onClick={() => handleRemoveDetail(index)}>
                          <i className="">Remove</i>
                        </Button>
                      </div>
                    )
                  })}
                </Form.Group>
                <div className="d-flex justify-content-start">
                  <Button variant="outline-primary" size="sm" onClick={() => {
                    const newArticle = { ...article };
                    newArticle.details.push({
                      id: Math.random(),
                      title: '',
                      description: '',
                    });
                    setArticle(newArticle);
                  }
                  }>
                    <i className="">Add Detail</i>
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
          <Form.Group className="my-3">
            <Form.Label htmlFor="articleContent">Article Content</Form.Label>
            <small className="text-muted ps-3">
              Articles use the Markdown syntax. <a href="https://www.markdownguide.org/basic-syntax/" className="text-tertiary" target="_blank" rel="noopener noreferrer">Learn more</a>
            </small>
            <Form.Control required as="textarea" rows="30" id="articleContent" placeholder="Article Content" defaultValue={article && article.markdown} />
            <Form.Control.Feedback type="invalid" >Article Content is required!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label htmlFor="articleContent">Contribution Comment</Form.Label>
            <small className="text-muted ps-3">
              Detailed description of the contribution.
            </small>
            <Form.Control maxLength={maxContributionCommentLength} required as="textarea" rows="8" id="comment" placeholder="Explain your edits here..." />
            <Form.Control.Feedback type="invalid" >Contribution Comment is required!</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end align-items-start">
            <Form.Group className="mb-3">
              <Form.Check
                required
                type="checkbox"
                id="disabledFieldsetCheck"
                label="I read & agree to the OzuWiki Terms and Conditions"
                onChange={handleCheckboxChange}
              />
              <small className="text-muted">
                <a href="https://youtu.be/dQw4w9WgXcQ" className="text-tertiary" target="_blank" rel="noopener noreferrer">
                  Read the OzuWiki Terms and Conditions
                </a>
              </small>
            </Form.Group>
            <Button ref={submitButtonRef} disabled className="ms-4" type="submit">Submit for Review</Button>
            <Toast bg="danger" show={showToast} onClose={toggleShowToast} className="position-absolute" delay={40000} autohide style={{ right: '20px' }}>
              <Toast.Header>
                <strong className="me-auto">Oops</strong>
              </Toast.Header>
              <Toast.Body>You have invalid fields, please check and try again!</Toast.Body>
            </Toast>
          </div>
        </fieldset>
      </Form>
    </div>
  )
}
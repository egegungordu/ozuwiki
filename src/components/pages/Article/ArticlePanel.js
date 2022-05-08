import { Container, Row, Col } from 'react-bootstrap';
import { SkeletonImage } from '../../common/Skeletons';
import Skeleton from 'react-loading-skeleton';

export default function ArticlePanel(props) {
  const { 
    name,
    imageUrl, 
    imageDescription, 
    details = [null, null],
  } = props.article || {}
    
  return (
    <>
      <h1 className="p-3 m-0 d-sm-none" id="article-title">{name}</h1>
      {imageUrl ? <img src={imageUrl} alt="placeholder" className="img-fluid mx-auto d-block" />
        : <SkeletonImage />}
      <div className="px-3 pt-2">
        <p className="m-0">
          {imageDescription || <Skeleton />}
        </p>
        <hr className="m-2"></hr>
        <Container fluid className="p-0">
          {details.map((detail, index)  => {
            return (
              <Row key={index} className="pb-3">
                <Col xs={4}>
                  <h6 className="m-0">{detail ? detail.title : <Skeleton />}</h6>
                </Col>
                <Col xs={8}>
                  <p className="m-0">{detail ? detail.description : <Skeleton count={4}/>}</p>
                </Col>
              </Row>
            )
          })}
        </Container>
      </div>
    </>
  )
}
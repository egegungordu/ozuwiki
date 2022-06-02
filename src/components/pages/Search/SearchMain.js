import { Col, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getArticles } from '../../../api/ArticleAPI';

export default function SearchMain() {
  const [articles, setArticles] = React.useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const asyncSet = async () => {
      setArticles(await getArticles(searchParams.get("q")));
    }
    asyncSet()
  }
  , [searchParams.get("q")])

  const handleSearch = (item) => {
    navigate('/article/'+item)
  }

  return (
    <Row className="h-100">
          <Col className="my-auto text-center">
          <h3>
              {articles.length} result(s) found for {searchParams.get("q")}
          </h3>
          <ul className ="dotless">
            {articles.map((element) =>{
              const item = element.name
                   return <a  key={item} href="" onClick={()=>{handleSearch(item)}} ><li>{item}</li></a>
            })}
          </ul>
            
          </Col>
        </Row>
  )
}

import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useContext } from 'react';
import { getArticles } from '../../../api/ArticleAPI';

export default function SearchMain() {
  const [articles, setArticles] = React.useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

            React.useEffect(() => {
              const asyncSet = async () => {
                let articlesList = await getArticles(searchParams.get("q"));
                setArticles([]);
                articlesList.map((element) => {
                  const item = element.name;
                  console.log(element.name);
                  setArticles(articles => [...articles, <a  key={item} href="" onClick={() => {navigate('/article/'+item)}} ><li>{item}</li></a>]);
                })
                
              }
              asyncSet()
            }
            , [searchParams.get("q")])
  return (
    <Row className="h-100">
          <Col className="my-auto text-center">

          <h3>
              {articles.length} result(s) found for {searchParams.get("q")}
          </h3>
          <ul className ="dotless">
            {articles}
          </ul>
            
          </Col>
        </Row>
  )
}

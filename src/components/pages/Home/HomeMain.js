import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { WikiPageContext } from '../../../context/WikiPageContext';
import React, { useContext } from 'react';
import { getArticles } from '../../../api/ArticleAPI';
import { useAsync } from 'react-use';

export default function HomeMain() {
  const [articles, setArticles] = React.useState(null);
  const navigate = useNavigate();
  const wikiPageContext = useContext(WikiPageContext);
  
  return (
    <Row className="h-100">
          <Col className="my-auto text-center">
          <h2>
              Welcome to the Ozu Wiki
          </h2>
          <p>
            Ozu Wiki aims to inform students about the Ozyegin University. It is made by students, for students.
            You can find any relevant information about our school here. 
            Can't find what you are looking for? You can add it by clicking <a href="">here!</a>
          </p>
          <h3>
            Here is a list of all the articles we have:
          </h3>
          <ul>
            {
            React.useEffect(() => {
              const asyncSet = async () => {
                let articlesList = await getArticles();
                articlesList.map((element) => {
                  const item = element.name;
                  //console.log(element.name);
                  setArticles(<a href="" ><li key={item}>{item}</li></a>)})
                 
              }
              asyncSet()
            }, [])
            }
            {articles}
          </ul>
            
          </Col>
        </Row>
  )
}

import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { WikiPageContext } from '../../../context/WikiPageContext';
import React, { useContext } from 'react';
import { getArticles } from '../../../api/ArticleAPI';

export default function HomeMain() {
  const [articles, setArticles] = React.useState([]);
  const navigate = useNavigate();
  const wikiPageContext = useContext(WikiPageContext);

  React.useEffect(() => {
    const asyncSet = async () => {
      setArticles(await getArticles());
    }
    asyncSet()
  }
  , [])

  const handleContributeNew = () => {
    navigate("article/New_Article/contribute")
  }
  
  return (
    <Row className="h-100">
          <Col className="my-auto text-center">
          <h2>
              Welcome to the Ozu Wiki
          </h2>
          <p>
            Ozu Wiki aims to inform students about the Ozyegin University. It is made by students, for students.
            You can find any relevant information about our school here. 
            Can't find what you are looking for? You can add it by clicking <a href="" onClick={handleContributeNew}>here!</a>
          </p>
          <h3>
            Here is a list of all the articles we have:
          </h3>
          <ul className ="dotless">
<<<<<<< HEAD
            {articles.map((element) =>{
              const item = element.name
                   return <a  key={item} href="" onClick={() => {navigate('/article/'+item)}} ><li>{item}</li></a>
            })}
=======
            {
            React.useEffect(() => {
              const asyncSet = async () => {
                let articlesList = await getArticles();
                articlesList.map((element) => {
                  const item = element.name;
                  setArticles(articles => [...articles, <a  key={item} href="" onClick={() => {navigate('/article/'+item)}} ><li>{item}</li></a>]);
                })
                
              }
              asyncSet()
            }
            , [])
            }
            {articles}
>>>>>>> f9b525cc454bbfefa83d845a90d88ca93a28eec5
          </ul>
            
          </Col>
        </Row>
  )
}

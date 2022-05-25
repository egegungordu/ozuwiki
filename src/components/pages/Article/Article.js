/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import React from 'react';
import { getArticle, postContribution } from '../../../api/ArticleAPI';
import WikiPage from '../../common/WikiPage/WikiPage';
import ArticleMain from './ArticleMain';
import ArticleSidebar from './ArticleSidebar';
import ArticlePanel from './ArticlePanel';
import { addToHistory } from "../../common/WikiPage/WikiHistory";

export default function Article() {
  const [article, setArticle] = React.useState(null);
  const params = useParams();
  const navigate = useNavigate();

  //this part adds the page to history when it is opened
  //TODO add link to page and fix the name
  /*const history = JSON.parse(window.localStorage.getItem("history"));
  let index = history.indexOf(params.articleName);
  if(index > -1)
  {history.splice(index, 1)};
  history.unshift(params.articleName)
  window.localStorage.setItem("history", JSON.stringify(history));*/
  addToHistory(params.articleName);

  React.useEffect(() => {
    const asyncSet = async () => {
      const response = await getArticle(params.articleName, 3);
      console.log(response)
      if (response) {
        setArticle(response)
      } else {
        navigate('/404', { replace: true });
      }
    }
    asyncSet()
  }, []);

  return (
    <WikiPage
      title={'Article'}
      showSearch={true}
      showHome={true}
      showAccount={true}
      navigation={[
        {
          title: 'Read',
          path: `/article/${params.articleName}`,
          active: true
        },
        {
          title: 'Contribute',
          path: `/article/${params.articleName}/contribute`
        }
      ]}
    >
      <WikiPage.Sidebar >
        <ArticleSidebar article={article} />
      </WikiPage.Sidebar>
      <WikiPage.Main>
        <ArticleMain article={article} />
      </WikiPage.Main>
      <WikiPage.Panel>
        <ArticlePanel article={article} />
      </WikiPage.Panel>
    </WikiPage >
  )
}

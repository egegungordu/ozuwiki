/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import React from 'react';
import { getArticle } from '../../../api/ArticleAPI';
import WikiPage from '../../common/WikiPage/WikiPage';
import ArticleMain from './ArticleMain';
import ArticleSidebar from './ArticleSidebar';
import ArticlePanel from './ArticlePanel';

export default function Article() {
  const [article, setArticle] = React.useState(null);
  const params = useParams();
  
  React.useEffect(() => {
    const asyncSet = async () => {
      const response = await getArticle(params.articleName, 3);
      setArticle(response)
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
      <WikiPage.Sidebar>
        <ArticleSidebar article={article} />
      </WikiPage.Sidebar>
      <WikiPage.Main>
        <ArticleMain article={article}/>
      </WikiPage.Main>
      <WikiPage.Panel>
        <ArticlePanel article={article} />
      </WikiPage.Panel>
    </WikiPage>
  )
}
      
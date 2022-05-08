import { useParams } from "react-router-dom";
import React from 'react';
import WikiPage from "../../common/WikiPage/WikiPage";

export default function Contribute(props) {
  const params = useParams();
  return (
    <WikiPage
      title="Edit"
      showHome={true}
      showSearch={true}
      showAccount={true}
      navigation={[
        {
          title: 'Read',
          path: `/article/${params.articleName}`,
        },
        {
          title: 'Contribute',
          path: `/article/${params.articleName}/contribute`,
          active: true
        }
      ]}
    >
      <WikiPage.Main>
        <p>
          Im the main content
        </p>
      </WikiPage.Main>
      <WikiPage.Panel>
        <p>
          Im the panel
        </p>
      </WikiPage.Panel>
    </WikiPage>
  )
}
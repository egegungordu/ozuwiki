import { useParams } from "react-router-dom";
import React from 'react';
import WikiPage from "../../common/WikiPage/WikiPage";
import ContributeMain from "./ContributeMain";
import ContributePanel from "./ContributePanel";

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
        <ContributeMain />
      </WikiPage.Main>
      <WikiPage.Panel>
        <ContributePanel />
      </WikiPage.Panel>
    </WikiPage>
  )
}
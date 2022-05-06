import { useParams } from "react-router-dom";
import React from 'react';
import WikiNavbar from '../../common/WikiNavbar';

export default function Contribute(props) {
  const params = useParams();
  
  return (
    <>
      <WikiNavbar 
        title="Form"
        showHome={true}
        showSearch={true}
        showAccount={true}
        navigation={[
          {
            title: "Read",
            path: `/article/${params.articleName}`,
          },
          {
            title: "Contribute",
            path: `/article/${params.articleName}/contribute`,
            active: true
          },
        ]}
      />
    </>
  )
}
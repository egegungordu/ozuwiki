import { WikiPageContext } from '../../../context/WikiPageContext';
import { useContext } from 'react';
import { getHistory } from '../../common/WikiPage/WikiHistory';

export default function HomeSidebar() {
  const wikiPageContext = useContext(WikiPageContext);
  let history = getHistory();
  return (
    <>
      <h4 className="ozuwikiheader text-center my-5">Ozu Wiki</h4>
      <div className="sticky-top px-4" style={{top: 48}}>

      <h6><b>Recently visited pages:</b></h6>
      <ul id="history_list">
        { history.map((item) => {return <li key={item}>{item}</li>}) }
      </ul>
      </div>
    
    </>
  )
}

import { getHistory } from '../../../api/HistoryAPI';
import { useNavigate } from 'react-router-dom';

export default function HomeSidebar() {

  const navigate = useNavigate();
  let history = getHistory();

  const handleGotoArticle = (articleName) => {
    articleName.replace(/_/g, " ");
    navigate('/article/'+articleName);
  }
  return (
    <>
      <h4 className="ozuwikiheader text-center my-5">Ozu Wiki</h4>
      <div className="sticky-top px-4" style={{top: 48}}>

      <h6><b>Recently visited pages:</b></h6>
      
        <ul id="history_list">

        {
        history.map((articleName) => {
          return <a key={articleName} href="" onClick={()=>{handleGotoArticle(articleName)}}> 
                 <li >{articleName}</li></a>
        })}

      </ul>
      </div>
    </>
  )
}

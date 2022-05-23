import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WikiPage from '../../common/WikiPage/WikiPage';

export default function NotFound() {
  const navigate = useNavigate();

  const handleNavigate = () => navigate('/');

  return (
    <WikiPage
      showAccount={true}
      showHome={true}>
      <WikiPage.Main>
        <div className="container">
          <div className="col-12 d-flex flex-column align-items-center space-around p-5">
            <h1>Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Button variant="primary" onClick={handleNavigate}>Go Home</Button>
          </div>
        </div>
      </WikiPage.Main>
    </WikiPage>
  )
}
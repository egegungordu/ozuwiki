import WikiNavbar from '../../common/WikiNavbar';

export default function Login() {
  
  return (
    <>
      <WikiNavbar 
        title="Home"
        showSearch={true}
        showAccount={true}
        offcanvasEnabled={true}
        offcanvasContent={
          <p>asdasd</p>
        }
      />
    </>
  )
}
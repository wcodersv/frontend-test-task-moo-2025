import {Outlet} from 'react-router-dom';
import {Nav} from "../components/nav";


function App() {
  return (
    <>
      <Nav/>
      <Outlet/>
    </>
  )
}

export default App

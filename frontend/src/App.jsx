import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Navbar from './component/Navbar';
import Homepage from './component/Homepage';
import Pastes from './component/Pastes';
import ViewPaste from './component/ViewPaste';
import Loginpopup from './component/Loginpopup';
import Signuppopup from './component/Signuppopup';
import { useAppContext } from './context/isLoginContext';

// creating routes 
//homepage -> cretion and updation pastes 
// pastes -> getting all pastes 
// pastes/:id => getting individual pastes 



function App() {
 
  const {showPopUp,setShowPopUp} = useAppContext()

const router = createBrowserRouter(
    [
       {
        path:"/",
        element:
        <div>
           <Navbar/>
           <Homepage/>
          {showPopUp && <Loginpopup/>}
        </div>
       },
       {
        path:"/pastes",
        element:
        <div>
          <Navbar/>
          <Pastes/>
        </div>
       },
       {
        path:"/paste/:id",
        element:
        <div>
            <Navbar/>
            <ViewPaste/>
        </div>
       },
      
       
    ]
    );
  


  return (
    <div className='max-w-[80%] mx-auto'>
     <RouterProvider router={router}>
      
     </RouterProvider>
     
    </div>
  )
}

export default App

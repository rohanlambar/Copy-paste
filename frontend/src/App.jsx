import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Navbar from './component/Navbar';
import Homepage from './component/Homepage';
import Pastes from './component/Pastes';
import ViewPaste from './component/ViewPaste';
import Loginpopup from './component/Loginpopup';
import Signuppopup from './component/Signuppopup';

// creating routes 
//homepage -> cretion and updation pastes 
// pastes -> getting all pastes 
// pastes/:id => getting individual pastes 



const router = createBrowserRouter(
  [
     {
      path:"/",
      element:
      <div>
         <Navbar/>
         <Homepage/>
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
      path:"/pastes/:id",
      element:
      <div>
          <Navbar/>
          <ViewPaste/>
      </div>
     },
     {
      path:"/test",
      element:
      <div>
          <Navbar/>
          <Loginpopup/>
      </div>
     },
     {
      path:"/signup",
      element:
      <div>
          <Navbar/>
          <Signuppopup/>
      </div>
     },
  ]
  );

function App() {
 



  return (
    <div className='max-w-[80%] mx-auto'>
     <RouterProvider router={router}>
      
     </RouterProvider>
     
    </div>
  )
}

export default App

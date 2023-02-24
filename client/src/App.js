
import {Header} from './components/Header.jsx';
import Login from './components/Login';
import Register from './components/Register';
import CreateBook from './components/CreateBook.jsx';
import Update from './components/Update'
import Delete from './components/Delete'
import GetAllBooksList from './components/GetAllBooks.js';
import CreateReview from './components/CreateReviews.jsx';
import GetAllReviews from './components/GetAllReviews.jsx';
import DeleteReview from './components/DeleteReview.jsx';
import UpdateReviewsData from './components/UpdateReview.jsx';
import SearchBooksData from './components/SearchData.js';
import PageNotFound from './components/PageNotFound.jsx';
import AttractiveUi from './UserInteraction/Ui.jsx';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

const userToken= localStorage.getItem('token')

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        {/* {userToken ? undefined : <Header />} */}
        <Header />
        <h1>Welcome To In MERN Based Project</h1>
        <Routes>
          <Route path='/' >  </Route>
          <Route path='register' element={<Register />} >  </Route>
          <Route path='login' element={<Login />} >  </Route>
          <Route path='CreateBook' element={<CreateBook />} >  </Route>
          <Route path='GetAllBooksList' element={<GetAllBooksList />} >  </Route>
          <Route path='update/:id' element={<Update />} >  </Route>
          <Route path='delete/:id' element={<Delete />} >  </Route>
          <Route path='/createReview/:id' element={<CreateReview />} >  </Route>
          <Route path='/GetAllReviewsList' element={<GetAllReviews />} >  </Route>
          <Route path='/DeleteReviews/:id' element={<DeleteReview />} >  </Route>
          <Route path='/UpdateReviews/:id' element={<UpdateReviewsData />} >  </Route>
          <Route path='searchBook' element={<SearchBooksData />} >  </Route>
          <Route path='*' element={<PageNotFound />} >  </Route>

        </Routes>
        {userToken ? null : <AttractiveUi />}
      </BrowserRouter>
    </div>



  );
}

export default App;

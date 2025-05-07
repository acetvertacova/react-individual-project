import { Route, Routes } from 'react-router-dom';
import './App.css'
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import ReviewDetails from './components/ReviewDetails';
import ReviewForm from './components/ReviewForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/reviews/:id' element={<ReviewDetails />} />
          <Route path='form'>
            <Route path='create' element={<ReviewForm />} />
            <Route path=':id/edit' element={<ReviewForm />} />
          </Route>
          <Route path="/fav" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes >
      <ToastContainer />
    </>
  );
}

export default App;

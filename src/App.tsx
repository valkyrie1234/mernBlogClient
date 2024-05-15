import React from 'react';
import Main from './pages/Main/Main';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Registartion from './pages/Registration/Registration';
import FullPost from './pages/FullPost';
import { useAppDispatch } from './store/Hooks/useDispatch';
import { fetchAuthMe } from './store/slices/auth';
import CreatePost from './pages/CreatePost/CreatePost';
import { AnimatePresence } from 'framer-motion';
import ProfilePage from './pages/ProfilePage/ProgilePage';
import { Paths } from './consts/consts';
import ErrorPage from './pages/ErrorPage/ErrorPage';




const App: React.FC = () => {

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])


  return (
    <>
      <AnimatePresence>
        <Routes>
          <Route path={Paths.Main} element={<Main />} />
          <Route path={Paths.CreatePost} element={<CreatePost />} />
          <Route path={Paths.EditPost} element={<CreatePost />} />
          <Route path={Paths.Login} element={<Login />} />
          <Route path={Paths.Registration} element={<Registartion />} />
          <Route path={Paths.CurrentPost} element={<FullPost />} />
          <Route path={Paths.UserProfile} element={<ProfilePage />} />
          <Route path={Paths.Error} element={<ErrorPage/>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;

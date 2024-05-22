import React from 'react';
import Main from './pages/Main/Main';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Registartion from './pages/Registration/Registration';
import FullPost from './pages/FullPost';
import { useAppDispatch } from './store/Hooks/useDispatch';
import { fetchAuthMe } from './store/slices/auth';
// import CreatePost from './pages/CreatePost/CreatePost';
import { AnimatePresence } from 'framer-motion';
import { Paths } from './consts/consts';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import { userApi } from './store/Api/UserApi';

const ProfilePage = React.lazy(() => import('./pages/ProfilePage/ProgilePage'))
const CreatePost = React.lazy(() => import('./pages/CreatePost/CreatePost'))

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  const { data: userData } = userApi.useGetMeQuery()


  return (
    <>
      <AnimatePresence>
        <Routes>
          <Route path={Paths.Main} element={<Main />} />
          <Route path={Paths.CreatePost} element={<React.Suspense fallback={<LoadingPage />}> <CreatePost /></React.Suspense>} />
          <Route path={Paths.EditPost} element={<React.Suspense fallback={<LoadingPage />}> <CreatePost /></React.Suspense>} />
          <Route path={Paths.Login} element={<Login />} />
          <Route path={Paths.Registration} element={<Registartion />} />
          <Route path={Paths.CurrentPost} element={<FullPost />} />
          <Route path={Paths.UserProfile} element={<React.Suspense fallback={<LoadingPage />}> <ProfilePage /></React.Suspense>} />
          <Route path={Paths.Error} element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;

import React from 'react';
import PageTransition from '../../components/PageTransition/PageTransition';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import LoginForm from '../../components/LoginForm/LoginForm';






const Login: React.FC = () => {
    return (
        <div>
            <MemoizedMyHeader />
            <PageTransition>
                <LoginForm />
            </PageTransition>
        </div>
    );
}

export default Login;







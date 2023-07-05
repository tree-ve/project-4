import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LogInForm from '../../components/LogInForm/LogInForm';
// import { Link } from "react-router-dom"

export default function AuthPage({ user, setUser, authPage }) {
    return (
        <main>
            {authPage && <>
                <h1>Sign In</h1>
                <SignUpForm user={user} setUser={setUser}/>
            </>}
            {!authPage && <>
                <h2>Log In</h2>
                <LogInForm user={user} setUser={setUser}/>
            </>}
        </main>
    );
}
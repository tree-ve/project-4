import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ user, setUser }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        // console.log(credentials)
        setError('');
    }

    async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await usersService.login(credentials);
            setUser(user);
        } catch {
            setError('Log In Failed - Try Again');
        }
    }

    return (
        <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                    <button type="submit">LOG IN</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}

// export default function LoginForm({ user, setUser }) {

//     // const [newSkill, setNewSkill] = useState({
//     //     skill: "",
//     //     level: ""
//     // })

//     const [loginFormData, setLoginFormData] = useState({
//         email: '',
//         password: ''
//     })

//     function handleChange(e) {
//         e.preventDefault()
//         console.log('change')
//         console.log(`${e.target.name}: ${e.target.value}`)
//         // console.log('1', skills)
//         // const newSkillFormData = {[e.target.name]: e.target.value};
//         // console.log(newSkill.skill, newSkill.level)
//         const newLoginFormData = {
//             ...loginFormData,
//             [e.target.name]: e.target.value
//         };
//         // console.log('2', skills)
//         setLoginFormData(newLoginFormData);
//         // const newSkills = [...skills, newSkill];
//         // setSkills(newSkills);
//     }

//     function handleSubmit(e) {
//         e.preventDefault()
//         const newUsers = [
//             ...user.user, loginFormData
//         ];
//         console.log(newUsers)
//         user.setUser(newUsers);
//         setLoginFormData({
//             email: '',
//             password: ''
//         })
//     }

//     return (
//         <div>
//             <div className="form-container">
//                 <form autoComplete="off" onSubmit={handleSubmit}>
//                     <label>Email</label>
//                     <input type="text" name="email" value={loginFormData.email} onChange={handleChange} required />
//                     <label>Password</label>
//                     <input type="password" name="password" value={loginFormData.password} onChange={handleChange} required />
//                     <button type="submit">LOG IN</button>
//                 </form>
//             </div>
//             {/* <p className="error-message">&nbsp;{error}</p> */}
//         </div>
//     )
// }
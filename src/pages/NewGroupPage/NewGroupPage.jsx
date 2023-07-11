import NewGroupForm from '../../components/NewGroupForm/NewGroupForm';
// import LogInForm from '../../components/LogInForm/LogInForm';
// import './LogInPage.css';
// import { Link } from "react-router-dom"

export default function NewGroupPage({ groups, setGroups, user }) {
    return (
        <main>
            <h1>New Group</h1>
            <NewGroupForm groups={groups} setGroups={setGroups} user={user}/>
        </main>
    );
}
import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
// export default function SignUpForm({ user, setUser }) {
    state = {
        username: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    };

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };

    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const formData = { ...this.state};
            // Remove the unnecessary fields from the object we plan to submit to the server
            delete formData.confirm
            delete formData.error
            console.log(formData)
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await signUp(formData);
            // console.log(user)
            this.props.setUser(user)
            // setUser(user)
        } catch (error) {
            // An error occurred
            console.log(error)
            this.setState({ error: 'Sign Up Failed - Try Again' });
        }
    };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
                <div className="form-container">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <label>Username</label>
                            <input type="text" name="username" value={this.state.name} onChange={this.handleChange} required />
                        </div>
                        <div className="input-field">
                            <label>Email</label>
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                        </div>
                        <div className="input-field">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                        </div>
                        <div className="input-field">
                            <label>Confirm</label>
                            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                        </div>
                        <button type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    }
}
import { Component } from 'react';
// import { newGroup } from '../../utilities/groups-service';
import * as groupsAPI from '../../utilities/groups-api';
// import { Link, useNavigate } from 'react-router-dom';

export default class NewGroupForm extends Component {
    state = {
        title: '',
        users: [this.props.user._id],
        owner: this.props.user._id,
        error: ''
    };

    // navigate = useNavigate();

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
            delete formData.error
            await groupsAPI.newGroup(formData);
            const groups = await groupsAPI.getGroups();
            this.props.setGroups(groups)
            // this.props.navigate('/groups')
        } catch (error) {
            console.log(error)
            this.setState({ error: "Couldn't Create Group - Try Again" });
        }
    };

    render() {
        // const disable = this.state.title !== '';
        return (
            <div>
                <div className="form-container">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <label>Title</label>
                            <input type="text" name="title" value={this.state.name} onChange={this.handleChange} required />
                        </div>
                        {/* <button type="submit" disabled={disable}>MAKE GROUP</button> */}
                        <button type="submit">MAKE GROUP</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    }
}
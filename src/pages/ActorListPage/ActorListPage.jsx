import ActorCard from "../../components/ActorCard/ActorCard"
import './ActorListPage.css';

export default function ActorListPage({ castArray }) {
    return (
        <div className="actor-list">
            <ActorCard actors={castArray}/>
        </div>
    )
}
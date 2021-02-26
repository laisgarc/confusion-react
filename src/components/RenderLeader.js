import { Media } from 'reactstrap';

function RenderingLeader({leader}) {
    return(
        <Media>
            <Media left middle>
                <Media object src={leader.image} alt={leader.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{leader.name}</Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </Media>
        </Media>
    )
}

const RenderLeader = (props) => {
    return(
        <RenderingLeader leader={props.leader} />
    )
}

export default RenderLeader;
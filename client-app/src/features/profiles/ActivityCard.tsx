import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { UserActivity } from "../../app/models/profile";

interface Props {
    activity: UserActivity;
}

export default observer(function ActivityCard({activity}: Props){
    return (
        <Card as={Link} to={`/activities/${activity.id}`}>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Description>
                    {activity.date}
                </Card.Description>
                {/* <Card.Description>{activity.date?.toLocaleTimeString()}</Card.Description> */}
            </Card.Content>
        </Card>
    )
})
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  cancelSelectedActivity: () => void;
  handleOpenForm: (id: string) => void;
  deleteSelectedActivity: (id: string) => void;
}

export default function ActivityDetails({
  activity,
  cancelSelectedActivity,
  handleOpenForm,
  deleteSelectedActivity,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group>
          <Button onClick={() => handleOpenForm(activity.id)} basic color="blue" content="Edit" />
          <Button onClick={() => deleteSelectedActivity(activity.id)} basic color="red" content="Delete" />
          <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

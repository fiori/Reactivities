import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      setActivities(
        response.map((a) => {
          a.date = a.date.split("T")[0];
          return a;
        })
      );
      setLoading(false);
    });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((a) => a.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleOpenForm(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleCloseForm() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([activity, ...activities.filter((a) => a.id !== activity.id)])
      : setActivities([{ ...activity, id: uuid() }, ...activities]);

    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities(activities.filter((a) => a.id !== id));
    setEditMode(false);
    setSelectedActivity(undefined);
  }

  if (isLoading) return <LoadingComponent content="Loading..." />;

  return (
    <Fragment>
      <NavBar handleOpenForm={handleOpenForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectedActivity={handleCancelSelectActivity}
          handleOpenForm={handleOpenForm}
          handleCloseForm={handleCloseForm}
          editMode={editMode}
          createOrEdit={handleCreateOrEditActivity}
          deleteSelectedActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;

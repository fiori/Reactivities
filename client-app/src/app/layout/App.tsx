import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Header, List, Segment, Divider, Icon, Container } from "semantic-ui-react";
import PlaceholderExampleGrid from "../../features/PlaceholderExample";
import RevealExampleRotate from "../../features/RotateGallery";
import CardExampleGroups from "../../features/Card";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { getuid } from "process";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
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

  function CreateGuid() {
    function _p8(s: boolean) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    if (activity.id) setActivities([activity, ...activities.filter((a) => a.id !== activity.id)]);
    else {
      activity.id = CreateGuid();
      setActivities([activity, ...activities]);
    }

    setEditMode(false);
    setSelectedActivity(activity);
  }

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
        />
      </Container>
    </Fragment>
  );
}

export default App;

import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  handleOpenForm: (id: string) => void;
  deleteSelectedActivity: (id: string) => void;
  handleCloseForm: () => void;
  editMode: boolean;
  createOrEdit: (activity: Activity) => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectedActivity,
  handleOpenForm,
  handleCloseForm,
  editMode,
  createOrEdit,
  deleteSelectedActivity,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            handleOpenForm={handleOpenForm}
            cancelSelectedActivity={cancelSelectedActivity}
            deleteSelectedActivity={deleteSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            activityToEdit={selectedActivity}
            createOrEdit={createOrEdit}
            handleCloseForm={handleCloseForm}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

import React from 'react';
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List, Segment, Divider, Icon, Container } from 'semantic-ui-react'
import PlaceholderExampleGrid from './PlaceholderExample';
import RevealExampleRotate from './RotateGallery';
import CardExampleGroups from './Card';


function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <Container> 
        <Segment inverted>
          <List divided inverted relaxed>
                {
                activities.map(
                  (activity: any) => {
                    return (
                    <List.Item key={activity.id}>
                      <List.Content>
                          <List.Header>{activity.title}</List.Header>
                        {activity.city}
                      </List.Content>
                    </List.Item>);
                  })
                }
              </List>
        </Segment>
        <br />

        <Divider horizontal>
          <Header as='h4'>
            <Icon name='user' />
            Placeholder
          </Header>
        </Divider>
        <br />

        <br />
        <PlaceholderExampleGrid />
        <br />

        <Divider horizontal>
          <Header as='h4'>
            <Icon name='image' />
            Image Test
          </Header>
        </Divider>
        <RevealExampleRotate />
        <br />

        <Divider horizontal>
          <Header as='h4'>
            <Icon name='id card' />
            Card Test
          </Header>
        </Divider>
        <div style={{display:'flex', justifyContent:'center'}}>
          <CardExampleGroups />
        </div>
      </Container>
    </div>
  );
}

export default App
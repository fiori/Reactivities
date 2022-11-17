import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  handleOpenForm: () => void;
}

export default function NavBar({ handleOpenForm }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/images/puky.png" alt="puky" style={{ marginRight: 20 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={handleOpenForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

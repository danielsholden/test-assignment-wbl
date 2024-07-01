import * as React from "react";

import { Button } from "@mui/material";

import FormDialog from "./FormDialog";
import Form from "./Form";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = (): void => setIsOpen(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <FormDialog open={isOpen} onClose={onClose}>
        <Form onClose={onClose} />
      </FormDialog>
    </>
  );
}

import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
} from "@mui/material";

import { emailRegex, formField, initialValues } from "./data/constants";
import { IFormValues } from "./types/form";
import { useFormStore } from "./store/form";

type Props = {
  onClose(): void;
};

export default function FormDialog(props: Props & DialogProps) {
  const { children, onClose, ...rest } = props;

  const methods = useForm<IFormValues>();
  const email = methods.watch(formField);
  const submitForm = useFormStore((state) => state.submitForm);

  const isValidField = React.useMemo(() => emailRegex.test(email), [email]);

  const handleClose = (): void => {
    methods.reset(initialValues);
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Dialog {...rest}>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button disabled={!isValidField} onClick={submitForm}>
            Submit
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}

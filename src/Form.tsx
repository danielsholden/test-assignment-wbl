import React from "react";
import { useFormContext } from "react-hook-form";

import { Stack, TextField } from "@mui/material";

import { emailErrorMessage, emailRegex, formField, initialValues } from "./data/constants";
import { IFormValues } from "./types/form";
import { useFormStore } from "./store/form";

type Props = {
  onClose(): void;
};

export default function Form(props: Props) {
  const { handleSubmit, register, watch, reset } = useFormContext<IFormValues>();
  const email = watch(formField);
  const setSubmitForm = useFormStore(state => state.setSubmitForm);

  React.useEffect(() => {
    setSubmitForm(() => handleSubmit(onSubmit)());
  }, [setSubmitForm, handleSubmit]);

  const isValidField = React.useMemo(() => {
    if (!email) {
      return true;
    }
    return emailRegex.test(email);
  }, [email]);

  const onSubmit = (values: IFormValues): void => {
    console.log("email", values.email);
    reset(initialValues);
    props.onClose();
  };

  return (
    <Stack component="form">
      <TextField
        error={!isValidField}
        {...register(formField, {
          required: true,
          pattern: {
            value: emailRegex,
            message: emailErrorMessage,
          },
        })}
      />
    </Stack>
  );
}

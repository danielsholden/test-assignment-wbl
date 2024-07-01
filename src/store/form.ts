import { create } from 'zustand';

interface IFormState {
  submitForm: (() => void);
  setSubmitForm: (submit: () => void) => void;
}

export const useFormStore = create<IFormState>(set => ({
  submitForm: () => undefined,
  setSubmitForm: (submit) => set({ submitForm: submit }),
}));

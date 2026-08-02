import { emailPattern } from ".";

export const name_validation = {
  name: "name",
  label: "name",
  type: "text",
  id: "name",
  placeholder: "Alex Rivera",
  validation: {
    required: {
      value: true,
      message: "name is required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const desc_validation = {
  name: "description",
  label: "description",
  multiline: true,
  id: "description",
  placeholder: "write description ...",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};

export const password_validation = {
  name: "password",
  label: "Password",
  type: "password",
  id: "password",
  placeholder: "your password",
  validation: {
    required: {
      value: true,
      message: "password is required",
    },
    minLength: {
      value: 6,
      message: "min 6 characters",
    },
  },
};

export const num_validation = {
  name: "num",
  label: "number",
  type: "number",
  id: "num",
  placeholder: "write a random number",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const email_validation = {
  name: "email",
  label: "Email",
  type: "text",
  id: "email",
  placeholder: "you@mail.com",
  validation: {
    required: {
      value: true,
      message: "email is required",
    },
    pattern: {
      value: emailPattern,
      message: "invalid email",
    },
  },
};

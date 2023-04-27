import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextInput from "../../Components/TextInput";
import PasswordInput from "../../Components/PasswordInput";
import Button from "../../Components/Button";

const RegisterPanel = () => {
  const [userName, setUserName] = useState(null);

  const { t: translate } = useTranslation();

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, translate("register_panel.User_name.error_message.short"))
      .max(50, translate("register_panel.User_name.error_message.long"))
      .required(translate("register_panel.User_name.error_message.required")),
    password: Yup.string()
      .min(2, translate("register_panel.password.error_message.short"))
      .max(50, translate("register_panel.password.error_message.long"))
      .required(translate("register_panel.password.error_message.required")),
    ConfirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        translate("register_panel.confirm_password.error_message.match")
      )
      .min(2, translate("register_panel.confirm_password.error_message.short"))
      .max(50, translate("register_panel.confirm_password.error_message.long"))
      .required(
        translate("register_panel.confirm_password.error_message.required")
      ),
  });

  const show = () => {
    console.log(formik.values);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      ConfirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      data && show(data);
      formik.resetForm();
    },
  });

  return (
    <div className="flex justify-content-around pt-4 pb-4">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-column gap-4 w-4 p-4 border-2 border-blue-500 border-round-lg"
      >
        <div className="text-2xl font-bold">
          {translate("register_panel.header")}
        </div>
        <TextInput
          value={formik.values.userName}
          onChangeValue={(e) => {
            formik.setFieldValue("userName", e.target.value);
          }}
          label={translate("register_panel.User_name.label")}
          errormsg={formik.errors["userName"]}
          isError={formik.errors["userName"]}
        />
        <TextInput
          value={formik.values.password}
          onChangeValue={(e) => {
            formik.setFieldValue("password", e.target.value);
          }}
          label={translate("register_panel.password.label")}
          errormsg={formik.errors["password"]}
          isError={formik.errors["password"]}
        />
        <TextInput
          value={formik.values.ConfirmPassword}
          onChangeValue={(e) => {
            formik.setFieldValue("ConfirmPassword", e.target.value);
          }}
          label={translate("register_panel.confirm_password.label")}
          errormsg={formik.errors["ConfirmPassword"]}
          isError={formik.errors["ConfirmPassword"]}
        />
        <div className="flex flex-column gap-2 w-full p-3">
          <Button
            type="submit"
            label={translate("register_panel.register_button.label")}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterPanel;

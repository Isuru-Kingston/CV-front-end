import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectuserRegistration,
  userRegistration,
} from "../../Store/Slices/userSlice";

import TextInput from "../../Components/TextInput";
import PasswordInput from "../../Components/PasswordInput";
import Button from "../../Components/Button";
import Toast from "../../Components/Toast";
import Spinner from "../../Components/Spinner";

const RegisterPanel = () => {
  const { t: translate } = useTranslation();

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, translate("register_panel.User_name.error_message.short"))
      .max(50, translate("register_panel.User_name.error_message.long"))
      .required(translate("register_panel.User_name.error_message.required")),
    email: Yup.string()
      .email(translate("register_panel.email.error_message.invalid"))
      .required(translate("register_panel.email.error_message.required")),
    firstName: Yup.string()
      .min(2, translate("register_panel.first_name.error_message.short"))
      .max(50, translate("register_panel.first_name.error_message.long"))
      .required(translate("register_panel.first_name.error_message.required")),
    lastName: Yup.string()
      .min(2, translate("register_panel.last_name.error_message.short"))
      .max(50, translate("register_panel.last_name.error_message.long"))
      .required(translate("register_panel.last_name.error_message.required")),
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

  const dispatch = useDispatch();
  const toast = useRef(null);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userRegistration);

  const onCreateUser = () => {
    const data = {
      username: formik.values.userName,
      email: formik.values.email,
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      password: formik.values.password,
    };
    dispatch(
      userRegistration({
        data,
        showToast,
        toastMsg: {
          success: translate("register_panel.success_message"),
          error: translate("register_panel.error_message"),
        },
      })
    );
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      ConfirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      data && onCreateUser();
      formik.resetForm();
    },
  });

  return (
    <div className="flex justify-content-around pt-4 pb-4 w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-column gap-4 w-full p-4 shadow-8 border-round-lg"
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
          value={formik.values.email}
          onChangeValue={(e) => {
            formik.setFieldValue("email", e.target.value);
          }}
          label={translate("register_panel.email.label")}
          errormsg={formik.errors["email"]}
          isError={formik.errors["email"]}
        />
        <TextInput
          value={formik.values.firstName}
          onChangeValue={(e) => {
            formik.setFieldValue("firstName", e.target.value);
          }}
          label={translate("register_panel.first_name.label")}
          errormsg={formik.errors["firstName"]}
          isError={formik.errors["firstName"]}
        />
        <TextInput
          value={formik.values.lastName}
          onChangeValue={(e) => {
            formik.setFieldValue("lastName", e.target.value);
          }}
          label={translate("register_panel.last_name.label")}
          errormsg={formik.errors["lastName"]}
          isError={formik.errors["lastName"]}
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
        {user.status == "loading" && (
          <div className="flex flex-column w-full">
            <Spinner />
          </div>
        )}
        <div className="flex flex-column gap-2 w-full p-3">
          <Button
            type="submit"
            label={translate("register_panel.register_button.label")}
          />
          <Button
            onClick={() => navigate("/login")}
            label={translate("register_panel.login_button.label")}
          />
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
};

export default RegisterPanel;

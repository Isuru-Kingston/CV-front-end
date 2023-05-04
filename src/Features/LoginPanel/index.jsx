import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { selectuser, userLogin } from "../../Store/Slices/userSlice";

import TextInput from "../../Components/TextInput";
import PasswordInput from "../../Components/PasswordInput";
import Button from "../../Components/Button";
import Toast from "../../Components/Toast";

const LoginPanel = () => {
  const { t: translate } = useTranslation();

  const LoginSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, translate("login_panel.User_name.error_message.short"))
      .max(50, translate("login_panel.User_name.error_message.long"))
      .required(translate("login_panel.User_name.error_message.required")),
    password: Yup.string()
      .min(2, translate("login_panel.password.error_message.short"))
      .max(50, translate("login_panel.password.error_message.long"))
      .required(translate("login_panel.password.error_message.required")),
  });

  const user = useSelector((state) => state.user.userLogin);
  const dispatch = useDispatch();

  const toast = useRef(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onLoginUser = () => {
    const data = {
      username: formik.values.userName,
      password: formik.values.password,
    };
    dispatch(
      userLogin({
        data,
        showToast,
        toastMsg: {
          success: translate("login_panel.success_message"),
          error: translate("login_panel.error_message"),
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
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      data && onLoginUser();
      formik.resetForm();
    },
  });
  return (
    <div className="flex justify-content-around pt-4">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-column gap-4 w-4 p-4 border-2 border-blue-500 border-round-lg"
      >
        <div className="text-2xl font-bold">
          {translate("login_panel.header")}
        </div>
        <TextInput
          value={formik.values.userName}
          onChangeValue={(e) => {
            formik.setFieldValue("userName", e.target.value);
          }}
          label={translate("login_panel.User_name.label")}
          errormsg={formik.errors["userName"]}
          isError={formik.errors["userName"]}
        />
        <TextInput
          value={formik.values.password}
          onChangeValue={(e) => {
            formik.setFieldValue("password", e.target.value);
          }}
          label={translate("login_panel.password.label")}
          errormsg={formik.errors["password"]}
          isError={formik.errors["password"]}
        />
        <div className="flex flex-column gap-2 w-full p-4">
          <Button
            label={translate("login_panel.login_button.label")}
            type="submit"
          />
          <Button label={translate("login_panel.register_button.label")} />
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
};

export default LoginPanel;

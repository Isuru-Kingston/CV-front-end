import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectuser, userLogin } from "../../Store/Slices/userSlice";

import TextInput from "../../Components/TextInput";
import PasswordInput from "../../Components/PasswordInput";
import Button from "../../Components/Button";
import Toast from "../../Components/Toast";
import Spinner from "../../Components/Spinner";

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
  const navigate = useNavigate();

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
    <div className="flex justify-content-around align-items-center pt-4 ">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-column gap-4 w-full p-4 border-round-lg shadow-8"
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
        {user.status == "loading" && (
          <div className="flex flex-column w-full">
            <Spinner />
          </div>
        )}

        <div className="flex flex-column gap-2 w-full p-4">
          <Button
            label={translate("login_panel.login_button.label")}
            type="submit"
          />
          <Button
            onClick={() => navigate("/register")}
            label={translate("login_panel.register_button.label")}
          />
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
};

export default LoginPanel;

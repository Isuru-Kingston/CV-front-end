import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import TextInput from "../../Components/TextInput";
import PasswordInput from "../../Components/PasswordInput";
import Button from "../../Components/Button";

const LoginPanel = () => {
  const [userName, setUserName] = useState(null);

  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-content-around pt-4">
      <div className="flex flex-column gap-4 w-4 p-4 border-2 border-blue-500 border-round-lg">
        <div className="text-2xl font-bold">
          {translate("login_panel.header")}
        </div>
        <TextInput
          value={userName}
          setValue={setUserName}
          label={translate("login_panel.User_name.label")}
          errormsg={translate("login_panel.User_name.error_message")}
          isError={true}
        />
        <TextInput
          value={userName}
          setValue={setUserName}
          label={translate("login_panel.password.label")}
          errormsg={translate("login_panel.password.error_message")}
          isError={true}
        />
        <div className="flex flex-column gap-2 w-full p-4">
          <Button label={translate("login_panel.login_button.label")} />
          <Button label={translate("login_panel.register_button.label")} />
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;

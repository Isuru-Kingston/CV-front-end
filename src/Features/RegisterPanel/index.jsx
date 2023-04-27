import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import TextInput from "../../Components/TextInput";
import PasswordInput from "../../Components/PasswordInput";
import Button from "../../Components/Button";

const RegisterPanel = () => {
  const [userName, setUserName] = useState(null);

  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-content-around pt-4 pb-4">
      <div className="flex flex-column gap-4 w-4 p-4 border-2 border-blue-500 border-round-lg">
        <div className="text-2xl font-bold">
          {translate("register_panel.header")}
        </div>
        <TextInput
          value={userName}
          setValue={setUserName}
          label={translate("register_panel.User_name.label")}
          errormsg={translate("register_panel.User_name.error_message")}
          isError={true}
        />
        <TextInput
          value={userName}
          setValue={setUserName}
          label={translate("register_panel.password.label")}
          errormsg={translate("register_panel.password.error_message")}
          isError={true}
        />
        <TextInput
          value={userName}
          setValue={setUserName}
          label={translate("register_panel.confirm_password.label")}
          errormsg={translate("register_panel.confirm_password.error_message")}
          isError={true}
        />
        <div className="flex flex-column gap-2 w-full p-3">
          <Button label={translate("register_panel.register_button.label")} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPanel;

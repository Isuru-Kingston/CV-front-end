import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { userLogout } from "../../Store/Slices/userSlice";

import HeaderComponent from "../../Components/Header";
import Avatar from "../../Components/Avatar";
import Alert from "../../Components/Alert";

function Header() {
  const { t: translate } = useTranslation();
  const [visible, setVisible] = useState(false);

  const user = useSelector((state) => state.user.userLogin);
  const dispatch = useDispatch();

  const accept = () => {
    dispatch(userLogout());
  };

  const reject = () => {};
  const end = () => {
    return (
      <div class="card">
        <div class="card-container purple-container overflow-hidden">
          <div class="flex">
            <div class="flex-1 flex align-items-center justify-content-center p-2">
              <Avatar label={user?.userName.charAt(0)} shape="circle" />
            </div>
            <div class="flex-none flex align-items-center justify-content-center p-2">
              {user?.userName}
            </div>
            <div class="flex-1 flex align-items-center justify-content-center p-2">
              <>
                <Alert
                  visible={visible}
                  onHide={() => setVisible(false)}
                  message={translate("header.alert.message")}
                  header={translate("header.alert.header")}
                  icon="pi pi-exclamation-triangle"
                  accept={accept}
                  reject={reject}
                />
                <div className="card flex justify-content-center cursor-pointer">
                  <i
                    className="pi pi-power-off"
                    style={{ fontSize: "1.2rem" }}
                    onClick={() => setVisible(true)}
                  ></i>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return <HeaderComponent end={end} />;
}

export default Header;

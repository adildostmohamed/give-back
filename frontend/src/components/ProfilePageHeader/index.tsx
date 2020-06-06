import React from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Dropdown, Menu } from "antd";
import { CaretDownOutlined, LogoutOutlined } from "@ant-design/icons";
import "./index.scss";
import apolloClient from "../../apolloClient";

interface IProps {
  firstName: string;
  lastName: string;
}

const HeaderMenu = (props: any) => {
  return (
    <Menu>
      <Menu.Item key="0">
        <button className="header-dropdown__btn" onClick={props.handleSignout}>
          <LogoutOutlined /> Sign out
        </button>
      </Menu.Item>
    </Menu>
  );
};

const ProfilePageHeader = (props: IProps) => {
  const profileInitials = `${props.firstName.substring(
    0,
    1
  )}${props.lastName.substring(0, 1)}`;
  const history = useHistory();
  const handleSignoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
    apolloClient.resetStore();
  };
  return (
    <header className="header">
      <h1 className="header__title">Give Back</h1>
      <div className="header__profile-wrapper">
        <Dropdown
          overlay={<HeaderMenu handleSignout={handleSignoutClick} />}
          trigger={["click"]}
        >
          <button className="header__avatar-btn">
            <Avatar>{profileInitials}</Avatar>
            <p className="header__avatar-name">{props.firstName}</p>
            <CaretDownOutlined className="header__avatar-icon" />
          </button>
        </Dropdown>
      </div>
    </header>
  );
};

export default ProfilePageHeader;

import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  MailOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const OrgProfileMenu = () => {
  const location = useLocation();
  return (
    <Menu mode="vertical" selectedKeys={[location.pathname]}>
      <Menu.Item key="/org/listings">
        <NavLink to="/org/listings">
          <UnorderedListOutlined /> Listings
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/org/inbox">
        <NavLink to="/org/inbox">
          <MailOutlined /> Inbox
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/org/assignments">
        <NavLink to="/org/assignments">
          <TeamOutlined />
          Assignments
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/org/settings">
        <NavLink to="/org/settings">
          <SettingOutlined /> Settings
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default OrgProfileMenu;

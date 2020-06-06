import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  UnorderedListOutlined,
  FolderViewOutlined,
  StarOutlined,
} from "@ant-design/icons";

const VolunteerProfileMenu = () => {
  const location = useLocation();
  return (
    <Menu mode="vertical" selectedKeys={[location.pathname]}>
      <Menu.Item key="/profile/listings">
        <NavLink to="/profile/listings">
          <UnorderedListOutlined /> Listings
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/profile/shortlisted">
        <NavLink to="/profile/shortlisted">
          <StarOutlined /> Shortlisted
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/profile/viewed">
        <NavLink to="/profile/viewed">
          <FolderViewOutlined /> Recently viewed
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default VolunteerProfileMenu;

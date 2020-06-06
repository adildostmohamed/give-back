import React from "react";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

interface IProps {
  children: React.ReactChildren | React.ReactNode;
}

const PageLayout = (props: IProps) => {
  return (
    <Layout>
      <Header>hello</Header>
      <Content>{props.children}</Content>
      <Footer>This is the footer</Footer>
    </Layout>
  );
};

export default PageLayout;

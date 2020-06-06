import React from "react";
import { Layout, Row, Col } from "antd";
import VolunteerProfileMenu from "../VolunteerProfileMenu";
import OrgProfileMenu from "../OrgProfileMenu";
import ProfilePageHeader from "../ProfilePageHeader";
import { useQuery, gql } from "@apollo/client";

const { Content, Footer } = Layout;

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      firstName
      lastName
      profileType
    }
  }
`;

interface IProps {
  children: React.ReactChildren | React.ReactNode;
}

const VolunteerProfilePageLayout = (props: IProps) => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);
  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;
  const { currentUser } = data;
  return (
    <Layout>
      <Row>
        <Col lg={{ span: 24 }}>
          <ProfilePageHeader
            firstName={currentUser.firstName}
            lastName={currentUser.lastName}
          />
        </Col>
      </Row>
      <Layout>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 22, offset: 1 }}>
            <div className="content-wrapper">
              <Row>
                <Col lg={{ span: 4 }}>
                  {currentUser.profileType === "VOLUNTEER" && (
                    <VolunteerProfileMenu />
                  )}
                  {currentUser.profileType === "ORGANISATION" && (
                    <OrgProfileMenu />
                  )}
                </Col>
                <Col lg={{ span: 20 }}>
                  <Content className="content-wrapper__inner">
                    {props.children}
                  </Content>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Layout>
      <Row>
        <Footer>This is the footer</Footer>
      </Row>
    </Layout>
  );
};

export default VolunteerProfilePageLayout;

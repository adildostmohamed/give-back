import React from "react";
import { useHistory } from "react-router-dom";
import { Table, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Created on",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string, record: any) => {
      const date = new Date(text);
      const formattedDate = date.toDateString();
      return formattedDate;
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    filters: [
      {
        text: "Design",
        value: "DESIGN",
      },
      {
        text: "Data",
        value: "DATA",
      },
      {
        text: "Consulting",
        value: "CONSULTING",
      },
    ],
    filterMultiple: true,
    onFilter: (value: any, record: any) => {
      console.log(value);
      return record.category.indexOf(value) === 0;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text: any, record: any) => (
      <span>
        <a>
          Edit <EditOutlined />
        </a>
      </span>
    ),
  },
];

const OrgsListingsTable = (props: any) => {
  const history = useHistory();
  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push("/org/listings/new");
  };
  const listingsDataWithKeys = props.data.map((item: any) =>
    Object.assign({}, item, { key: item._id })
  );
  return (
    <>
      <div className="listings__header">
        <h2 className="listings__heading">Your listings</h2>
        <Button type="primary" onClick={onButtonClick}>
          Add a new lisitng
        </Button>
      </div>
      <div className="listings__body">
        <Table columns={columns} dataSource={listingsDataWithKeys} />
      </div>
    </>
  );
};

export default OrgsListingsTable;

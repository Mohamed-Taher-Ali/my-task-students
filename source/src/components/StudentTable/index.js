import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Alert, Table } from 'antd';
import React from 'react';

import './StudentTable.css';

export default function StudentTable({
  onClickRow = () => { },
  dataArray = [],
}) {
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Birth Date',
      dataIndex: 'dateOfBirth',
      render: (text) => {
        const date = new Date(text).toDateString();
        return(
          <span>{date}</span>
        )
      }
    },
    {
      title: 'Verified',
      dataIndex: 'key',
      render: (text, record, index) => {
        const { ID } = record;
        const color = ID ? 'green' : 'red';
        const Icon = ID ? CheckCircleOutlined : CloseCircleOutlined;

        return (
          <Icon color={color} style={{ color, fontSize: '22px', }} />
        );
      }
    },
  ];

  const onRow = (data, ind) => {
    return {
      onClick: e => {
        onClickRow(data, ind);
      }
    }
  }

  return (
    !!dataArray.length
    ? <Table onRow={onRow} columns={columns} dataSource={dataArray} pagination={false} />
    : <Alert className='my-alert' style={{fontSize: '16px'}} message="No Students Found" type="info" />
  );
}
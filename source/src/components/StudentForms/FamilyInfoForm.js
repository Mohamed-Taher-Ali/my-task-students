import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Row, Space } from 'antd';
import { getFamilyObj } from '../../config/helpers';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyDropdown from '../MyDropdown';

import './StudentForm.css'


export default function FamilyInfoForm({
  onSubmit = (data = {}) => { },
  onCancel = () => { },
  disabled = false,
}) {
  const { students: { nationalities, familyTypes, families, editing } } = useSelector(s => s);
  const nationalitiesData = nationalities.map(n => n.Title);

  const family = (editing.ID && families
  .find(f => f.stdId === editing.ID)?.family) || [];

  const familyObj = getFamilyObj(nationalitiesData[0], familyTypes[0]);

  const [familyData, setFamilyData] = useState(
    family.length ? family : [familyObj]
  );

  const onChangeFamily = (ind, type, value) => {
    const updateFamilyData = [...familyData].map((f, i) => {
      if (i == ind) {
        f[type] = value;
        if (f.ID) f.edited = true;
      }
      return f;
    });

    setFamilyData([...updateFamilyData]);
  }

  const onAdd = () => {
    setFamilyData([...familyData, {...familyObj}]);
  }

  const onDelete = (ind) => () => {
    const updateFamilyData = !familyData[ind].ID
      ? familyData.filter((f, i2) => ind !== i2)
      : familyData.map((f, i2) => (ind === i2 ? { ...f, deleted: true } : f));

    setFamilyData(updateFamilyData);
  }


  return (
    <Row>
      <Card title="Family Information" bordered={false}>
        {
          familyData.map((f, i) => (
            f.deleted
              ? <></>
              : <Form
                key={i}
                layout={'inline'}
                disabled={disabled}
                style={{ marginBottom: '15px' }}
              >
                <Form.Item label="First Name">
                  <Input
                    value={f.firstName}
                    placeholder="Enter fist name"
                    onChange={(e) => onChangeFamily(i, 'firstName', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Last Name">
                  <Input
                    value={f.lastName}
                    placeholder="Enter last name"
                    onChange={(e) => onChangeFamily(i, 'lastName', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Relationship">
                  <MyDropdown
                    dataArray={familyTypes}
                    onChange={(relationship) => onChangeFamily(i, 'relationship', relationship)}
                  />
                </Form.Item>
                <Form.Item label="Nationality">
                  <MyDropdown
                    selectedWord={f.nationality}
                    dataArray={nationalitiesData}
                    onChange={(nationality) => onChangeFamily(i, 'nationality', nationality)}
                  />
                </Form.Item>
                <Space style={{ paddingBottom: '10px' }}>
                  {
                    familyData.length > 1 &&
                    <span className='trash-icon'>
                      <DeleteOutlined onClick={disabled ? () => { } : onDelete(i)} />
                    </span>
                  }
                  {
                    i === familyData.length - 1 &&
                    <span className='add-icon'>
                      <PlusOutlined onClick={disabled ? () => { } : onAdd} />
                    </span>
                  }
                </Space>
              </Form>
          ))
        }
        <Form
          layout={'inline'}
          disabled={disabled}
          style={{ marginTop: '20px' }}
        >
          <Form.Item>
            <Space>
              <Button
                type='primary'
                onClick={() => onSubmit(familyData)}
              >{!familyData?.ID && familyData?.fakeId ? "Validate" : "Submit"}</Button>
              <Button disabled={false} onClick={onCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}
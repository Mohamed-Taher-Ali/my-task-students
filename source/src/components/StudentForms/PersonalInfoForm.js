import { Button, Card, DatePicker, Form, Input, Row, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import MyDropdown from '../MyDropdown';
import moment from 'moment';
import useGlobalState from '../../customHooks/useGlobalState';
import './StudentForm.css'

const dateFormat = "YYYY-MM-DD";

export default function PersonalInfoForm({
  onSubmit = (data = {}) => { },
  onCancel = () => { },
  disabled = false,
  data,
}) {
  const { state: {students: {nationalities}} } = useGlobalState();
  const nationalitiesData = nationalities.map(n => n.Title);
  const [intData, setIntData] = useState(data || {});
  const datePicker = useRef();

  useEffect(() => {
    setIntData(data);
  }, [data]);

  const onSetData = (newData) => setIntData({
    ...intData, ...newData
  });

  const onCancelHandler = () => {
    setIntData({});
    onCancel();
  }

  const onSubmitHandler = () => {
    onSubmit({ ...intData });
    if (!intData.ID) {
      setIntData({});
    }
  }

  return (
    <Row>
      <Card title="Personal Information" bordered={false}>
        <Form
          layout={'inline'}
          disabled={disabled}
        >
          <Form.Item rules={[{ required: true }]} label="First Name">
            <Input
              value={intData?.firstName}
              placeholder="Enter first name"
              onChange={(e) => onSetData({ firstName: e.target.value })}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="Last Name">
            <Input
              value={intData?.lastName}
              placeholder="Enter last name"
              onChange={(e) => onSetData({ lastName: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Birth date">
            <DatePicker
              ref={datePicker}
              format={dateFormat}
              onChange={(v, dateString) => onSetData({ dateOfBirth: dateString })}
              disabledDate={(current) => (current && current.valueOf() > Date.now())}
              value={intData?.dateOfBirth ? moment(intData.dateOfBirth, dateFormat) : undefined}
            />
          </Form.Item>
          <Form.Item label="Nationality">
            <MyDropdown
              dataArray={nationalitiesData}
              selectedWord={intData?.nationality}
              onChange={(nationality) => onSetData({ nationality })}
            />
          </Form.Item>
        </Form>
        <Form
          layout={'inline'}
          disabled={disabled}
          style={{ marginTop: '20px' }}
        >
          <Form.Item>
            <Space>
              <Button
                type='primary'
                onClick={onSubmitHandler}
              >{!intData?.ID && intData?.fakeId ? "Validate" : "Submit"}</Button>
              <Button disabled={false} onClick={onCancelHandler}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}
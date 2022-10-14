import React from 'react';
import { Layout } from 'antd';
import MyDropdown from '../MyDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { selectRole } from '../../store/actions/authAction';
import './MyLayout.css';

export default function MyHeader() {
  const {auth} = useSelector(s => s);
  const dispatch = useDispatch();

  const onSelectRole = (selectedRole)=>{
    dispatch(selectRole(selectedRole));
  }
  
  return (
    <Layout.Header className='my-header'>
      <div className="logo">Students</div>
      <div className='my-header-btns'>
        <MyDropdown
          dataArray={auth.roles}
          onChange={onSelectRole}
          selectedWord={auth.selectedRole}
        />
      </div>
    </Layout.Header>
  );
}
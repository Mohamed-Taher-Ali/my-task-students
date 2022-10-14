import { loadNationalities, loadStudents } from '../../store/actions/studentAction';
import useGlobalState from '../../customHooks/useGlobalState';
import React, { useLayoutEffect } from 'react';
import MyContent from './MyContent';
import MyFooter from './MyFooter';
import MyHeader from './MyHeader';
import { Layout } from 'antd';

import './MyLayout.css';


const MyLayout = ({ children }) => {
  const { dispatch } = useGlobalState();

  useLayoutEffect(() => {
    dispatch(loadNationalities());
    dispatch(loadStudents());
  }, []);

  return (
    <Layout>
      <MyHeader />
      <MyContent content={children} />
      <MyFooter />
    </Layout>
  );
}

export default MyLayout;
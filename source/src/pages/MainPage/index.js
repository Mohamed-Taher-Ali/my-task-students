import React, { Fragment } from 'react';
import StudentList from './StudentList';
import './MainPage.css';
import StudentFormContainer from './StudentFormContainer';


export default function MainPage() {

  return (
      <Fragment>
        <StudentFormContainer />
        <StudentList />
      </Fragment>
  );
}
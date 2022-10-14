import React from 'react';
import MyAccordion from '../../../components/MyAccordion';
import useGlobalState from '../../../customHooks/useGlobalState';
import { addStudent } from '../../../store/actions/studentAction';
import PersonalInfoForm from '../../../components/StudentForms/PersonalInfoForm';
import './StudentFormContainer.css';


export default function StudentFormContainer() {
  const { isRegisterer, dispatch } = useGlobalState();
  
  const onSubmit = (data) => {
    dispatch(addStudent(isRegisterer, data));
  }

  const body = (
    <div className="site-card-wrapper">
      <PersonalInfoForm
        onSubmit={onSubmit}
      />
    </div>
  );

  return (
    <div className='student-form-container'>
      <MyAccordion
        dataArray={[
          {
            body,
            showArrow: false,
            header: '+ Add New Student',
          }
        ]}
      />
    </div>
  );
}
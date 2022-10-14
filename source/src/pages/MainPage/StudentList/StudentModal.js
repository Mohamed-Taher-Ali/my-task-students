import PersonalInfoForm from '../../../components/StudentForms/PersonalInfoForm';
import FamilyInfoForm from '../../../components/StudentForms/FamilyInfoForm';
import { addFamilyMembers, validateStudent } from '../../../store/actions/studentAction';
import useGlobalState from '../../../customHooks/useGlobalState';
import { Modal } from 'antd';
import React from 'react';

import './StudentList.css';


export default function StudentModal({
  isOpen = false,
  onClose = () => { },
}) {
  const {
    dispatch,
    isRegisterer,
    state: { students: { editing } },
  } = useGlobalState();

  const onSubmitPersonalHandler = (data) => {
    dispatch(validateStudent(data));
    onClose();
  }

  const onSubmitFamilyHandler = (familyArray) => {
    dispatch(addFamilyMembers(editing.ID, familyArray))
    onClose();
  }


  return (
    <Modal
      width={1200}
      footer={false}
      open={isOpen}
      destroyOnClose={true}
      title="Student Information"
      onOk={() => onClose()}
      onCancel={() => onClose()}
    >
      <PersonalInfoForm
      data={editing}
      disabled={!isRegisterer}
      onCancel={() => onClose()}
      onSubmit={onSubmitPersonalHandler}
      />
      <FamilyInfoForm
      disabled={!isRegisterer}
      onCancel={() => onClose()}
      onSubmit={onSubmitFamilyHandler}
      />
    </Modal>
  );
}
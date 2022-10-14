import { loadStudentToEdit } from '../../../store/actions/studentAction';
import useGlobalState from '../../../customHooks/useGlobalState';
import StudentTable from '../../../components/StudentTable';
import StudentModal from './StudentModal';
import React, { useState } from 'react';

import './StudentList.css';


export default function StudentList() {
  const { state: { students }, dispatch } = useGlobalState();

  const tableData = students.students.map((s, i) => ({ ...s, key: i + 1 }));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickRow = (student, ind) => {
    dispatch(loadStudentToEdit(ind))
    setIsModalOpen(true);
  }

  return (
    <div>
      <StudentTable
        dataArray={tableData}
        onClickRow={onClickRow}
      />
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
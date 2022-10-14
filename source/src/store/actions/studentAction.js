import {
  addStudentService,
  loadStudentsService,
  getStudentNationalityService,
  updateStudentNationalityService,
  updateStudentService,
} from '../../services/studentService';
import { loadNationalitiesService } from '../../services/nationalityService';
import { notification } from 'antd';
import { addFamilyMemberService, updateFamilyMemberNationalityService } from '../../services/familyService';


export const STUDENT_ADDED = 'STUDENT_ADDED';
export const STUDENTS_LOADED = 'STUDENTS_LOADED';
export const STUDENT_VALIDATED = 'STUDENT_VALIDATED';
export const FAMILY_MEMBERS_ADDED = 'FAMILY_MEMBERS_ADDED';
export const NATIONALITIES_LOADED = 'NATIONALITIES_LOADED';
export const STUDENT_LOADED_TO_EDITED = 'STUDENT_LOADED_TO_EDITED';
export const STUDENT_NATIONALITY_UPDATED = 'STUDENT_NATIONALITY_UPDATED';


export const addStudent = (isRegisterer, student) => {
  return (dispatch, getState) => {
    if (isRegisterer) {
      const { students } = getState();
      const { nationality, fakeId, ...remainStudent } = student;
      const natId = students.nationalities.find(n => n.Title === nationality).ID;

      addStudentService(remainStudent)
        .then(res => {
          const studentData = res.data;
          updateStudentNationalityService(studentData.ID, natId)
            .then(res => {
              studentData.nationality = res.data.nationality.Title;

              dispatch({
                type: STUDENT_ADDED,
                payload: {
                  student: studentData,
                  fakeId
                },
              });
            })
            .catch(err => {
              notification.error({
                message: 'Update error',
                description: 'Failed to update student nationality',
              });
            });
        })
        .catch(err => {
          notification.error({
            message: 'Creation error',
            description: 'Failed to create student please check all fields',
          });
        });
    } else {
      dispatch({
        type: STUDENT_ADDED,
        payload: { student }
      });
    }
  };
};

export const loadNationalities = () => {
  return (dispatch) => {
    loadNationalitiesService()
      .then(res => {
        dispatch({
          type: NATIONALITIES_LOADED,
          payload: res.data
        })
      })
      .catch(err => {
        notification.error({
          message: 'Loading error',
          description: 'Failed to load nationalities',
        });
      })
  };
};

export const loadStudents = () => {
  return (dispatch) => {
    loadStudentsService()
      .then(async res => {
        const stdWithNat = await Promise.all(res.data.map(async s => {
          const nat = await getStudentNationalityService(s.ID);
          return { ...s, ...(nat?.data && { nationality: nat.data.Title }) };
        }));
        
        dispatch({
          type: STUDENTS_LOADED,
          payload: stdWithNat || []
        });
      })
      .catch(err => {
        notification.error({
          message: 'Loading error',
          description: 'Failed to load students',
        });
      });
  };
};

export const addFamilyMembers = (stdId, family) => {
  return async (dispatch, getState) => {
    const { students: { nationalities } } = getState();

    const savedFamily = await Promise.all(
      family.filter(f => Object.keys(f || {}).length === 4).map(async f => {
        const { nationality, remainMember } = f;
        const member = (await addFamilyMemberService(stdId, remainMember)).data;
        const natId = nationalities.find(n => n.Title === nationality).ID;
        const nat = (await updateFamilyMemberNationalityService(member.ID, natId)).data;
        return { ...member, nationality: nat.Title };
      })
    );

    const payload = { stdId, family: savedFamily };

    dispatch({
      type: FAMILY_MEMBERS_ADDED,
      payload
    });
  };
};

export const loadStudentToEdit = (ind) => {
  return (dispatch) => {
    dispatch({
      type: STUDENT_LOADED_TO_EDITED,
      payload: ind
    })
  };
};

export const validateStudent = (data) => {
  return async (dispatch, getState) => {
    const { students: { editing, nationalities } } = getState();

    if (editing.ID) {
      const { ID, nationality, ...studentData } = { ...editing, ...data };
      let savedStudent = {};

      if (Object.keys(studentData).length) {
        savedStudent = (await updateStudentService(ID, studentData)).data;
        savedStudent = { ...savedStudent, nationality: savedStudent.nationality.Title };
      }

      if (nationality) {
        const natId = nationalities.find(n => n.Title === nationality).ID;
        const updatedNat = (await updateStudentNationalityService(ID, natId)).data;

        savedStudent = {
          ...savedStudent,
          ...updatedNat,
          nationality: updatedNat.nationality.Title,
        };
      }

      dispatch({
        type: STUDENT_VALIDATED,
        payload: savedStudent,
      });
    } else {
      dispatch(addStudent(true, editing));
    }
  };
};
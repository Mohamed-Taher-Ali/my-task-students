export const ROLE_SELECTED = 'ROLE_SELECTED';


export const selectRole = (role) => {
  return (dispatch) => {
    dispatch({
      type: ROLE_SELECTED,
      payload: role
    });
  };
};
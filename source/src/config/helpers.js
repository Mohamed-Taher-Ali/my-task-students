export const capitalizeFirstLetter = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

export const getUserInit = () => ({
  name: '',
  email: '',
  phone: '',
  age: 15
});

export const scrollTopDomElemById = (domElemId) => {
  const myDiv = document.getElementById(domElemId);
  myDiv.scrollTop = 0;
}

export function calculateAge(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function getAge(birthDate) {
  return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
}

export function getFamilyObj(nationality, relationship) {
  return {
    firstName: '',
    lastName: '',
    relationship,
    nationality,
  };
}
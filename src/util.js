import assert from 'node:assert/strict';
/**
 * set formData with key and value 
 *   const formData = {};
 *   setFormData(formData, 'foo', 1);
 *   setFormData(formData, 'bar', 2);
 *   setFormData(formData, 'students[a][first]', 'John'); 
 *   setFormData(formData, 'students[a][last]', 'Doe'); 
 *   setFormData(formData, 'students[a][age]', 30); 
 *   setFormData(formData, 'students[b][first]', 'Jane'); 
 *   setFormData(formData, 'students[b][last]', 'Doe'); 
 *   setFormData(formData, 'students[b][age]', 23); 
 * The above code will build the following formData
 * {
 *   foo: 1,
 *   bar: 2,
 *   students: {
 *     a: { first: 'John', last: 'Doe', age: 30 },
 *     b: { first: 'Jane', last: 'Doe', age: 23 }
 *   }
 * }
 * @param formData formData object
 * @param controlName e.g. 'foo', 'students[a][firstName]'
 * @param value value of form control name
 * @returns value gathered formData
 */
function setFormData(formData={}, controlName, value) {
  const arr = controlName.split(/[\[\]]/).filter(e => !!e);
  
  const ret = arr.reduce( (acc, el, index) => {
    if (index === arr.length -1) {
      acc[el] = value;
    } else {
      acc[el] = acc[el] || {};
    }
    return acc[el];
  }, formData);

  return formData;
}

// the following is to test the above function
const formData = {};
setFormData(formData, 'foo', 1);
setFormData(formData, 'bar', 2);
setFormData(formData, 'students[a][first]', 'John'); 
setFormData(formData, 'students[a][last]', 'Doe'); 
setFormData(formData, 'students[a][age]', 30); 
setFormData(formData, 'students[b][first]', 'Jane'); 
setFormData(formData, 'students[b][last]', 'Doe'); 
setFormData(formData, 'students[b][age]', 23); 

assert.deepEqual(formData, {
  foo: 1,
  bar: 2,
  students: {
    a: { first: 'John', last: 'Doe', age: 30 },
    b: { first: 'Jane', last: 'Doe', age: 23 }
  }
});
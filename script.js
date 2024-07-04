const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const sortAZBtn = document.getElementById('sort-az-btn');
const sortZABtn = document.getElementById('sort-za-btn');
const sortMarksBtn = document.getElementById('sort-marks-btn');
const sortPassingBtn = document.getElementById('sort-passing-btn');
const sortClassBtn = document.getElementById('sort-class-btn');
const sortGenderBtn = document.getElementById('sort-gender-btn');
const genderTablesDiv = document.getElementById('gender-tables');

let students = []; 
const url = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    
    students = data.map(student => ({
      id: student.id,
      firstName: student.first_name,
      lastName: student.last_name,
      email: student.email,
      class: student.class,
      marks: student.marks,
      passing: student.passing,
      gender: student.gender.toLowerCase(), 
      image: student.img_src
    }));
    renderTableData(students); 
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

searchInput.addEventListener('input', handleSearch);
searchBtn.addEventListener('click', handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(searchTerm) ||
    student.lastName.toLowerCase().includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm)
  );
  renderTableData(filteredStudents);
}


sortAZBtn.addEventListener('click', () => {
  students.sort((a, b) => a.firstName.localeCompare(b.firstName));
  renderTableData(students);
});

sortZABtn.addEventListener('click', () => {
  students.sort((a, b) => b.firstName.localeCompare(a.firstName));
  renderTableData(students);
});

sortMarksBtn.addEventListener('click', () => {
  students.sort((a, b) => a.marks - b.marks);
  renderTableData(students);
});

sortPassingBtn.addEventListener('click', () => {
  const passingStudents = students.filter((student) => student.passing);
  renderTableData(passingStudents);
});

sortClassBtn.addEventListener('click', () => {
  students.sort((a, b) => a.class.localeCompare(b.class));
  renderTableData(students);
});

sortGenderBtn.addEventListener('click', () => {
  const maleStudents = students.filter((student) => student.gender === 'male');
  const femaleStudents = students.filter((student) => student.gender === 'female');
  renderGenderTables(maleStudents, femaleStudents);
});

function renderTableData(students) {
  tableBody.innerHTML = '';
  students.forEach((student) => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${student.id}</td>
      <td><img src="${student.image}" alt="${student.firstName} ${student.lastName}">${student.firstName} ${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? 'Passing' : 'Failed'}</td>
    `;
    tableBody.appendChild(tableRow);
  });
}

function renderGenderTables(maleStudents, femaleStudents) {
  genderTablesDiv.innerHTML = '';
  const maleTable = document.createElement('table');
  maleTable.className = 'gender-table';
  const femaleTable = document.createElement('table');
  femaleTable.className = 'gender-table';
  maleTable.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Class</th>
        <th>Marks</th>
        <th>Passing</th>
      </tr>
    </thead>
    <tbody id="male-table-body">
      <!-- male student data will be rendered here -->
    </tbody>
  `;
  femaleTable.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Class</th>
        <th>Marks</th>
        <th>Passing</th>
      </tr>
    </thead>
    <tbody id="female-table-body">
      <!-- female student data will be rendered here -->
    </tbody>
  `;
  maleStudents.forEach((student) => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${student.id}</td>
      <td><img src="${student.image}" alt="${student.firstName} ${student.lastName}">${student.firstName} ${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? 'Passing' : 'Failed'}</td>
    `;
    maleTable.querySelector('#male-table-body').appendChild(tableRow);
  });
  femaleStudents.forEach((student) => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${student.id}</td>
      <td><img src="${student.image}" alt="${student.firstName} ${student.lastName}">${student.firstName} ${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? 'Passing' : 'Failed'}</td>
    `;
    femaleTable.querySelector('#female-table-body').appendChild(tableRow);
  });
  genderTablesDiv.appendChild(maleTable);
  genderTablesDiv.appendChild(femaleTable);
}

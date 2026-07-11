const grid = document.getElementById("studentGrid");

let allStudents = [];

async function loadStudents() {
  const res = await fetch("/api/students");
  const data = await res.json();

  allStudents = data;
  render(data);
}

loadStudents();

function render(students) {
  let html = "";

  students.forEach(s => {
    html += `
      <div class="student-card">
        <h3>${s.name}</h3>
        <p>Roll: ${s.roll}</p>
        <p>Course: ${s.course}</p>

      <button onclick="editStudent('${s._id || s.id}')" class="btn btn-ghost">
  Edit
</button>

<button onclick="deleteStudent('${s._id || s.id}')" class="btn btn-danger">
  Delete
</button>
      </div>
    `;
  });

  grid.innerHTML = html;
}

async function deleteStudent(id) {
  if (!confirm("Delete?")) return;

  await fetch(`/api/students/${id}`, {
    method: "DELETE"
  });

  loadStudents();
}

function editStudent(id) {
  window.location.href = `add-student.html?id=${id}`;
}
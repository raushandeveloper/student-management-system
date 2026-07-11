const form = document.getElementById("studentForm");
const statusBox = document.getElementById("formStatus");

const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

// EDIT LOAD
if (studentId) {
  fetch(`/api/students/${studentId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("fullName").value = data.name || "";
      document.getElementById("rollNo").value = data.roll || "";
      document.getElementById("course").value = data.course || "";
    });
}

// SUBMIT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("fullName").value,
    roll: document.getElementById("rollNo").value,
    course: document.getElementById("course").value
  };

  let url = "/api/students";
  let method = "POST";

  if (studentId) {
    url = `/api/students/${studentId}`;
    method = "PUT";
  }

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });

  window.location.href = "students.html";
});
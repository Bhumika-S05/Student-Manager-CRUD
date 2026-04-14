const API = "http://localhost:5000/students";

// Load students
async function loadStudents() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("studentList");
    list.innerHTML = "";

    data.forEach(student => {
        list.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
                <button onclick="deleteStudent('${student._id}')">Delete</button>
            </td>
        </tr>`;
    });
}

// Add student
async function addStudent() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;

    if (!name || !age || !course) {
        alert("Please fill all fields!");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, age, course })
    });

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";

    loadStudents();
}

// Delete student
async function deleteStudent(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadStudents();
}

// Load on start
loadStudents();
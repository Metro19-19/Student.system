const students = [];

document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const id = document.getElementById("studentId").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const form = parseInt(document.getElementById("form").value);

    if (students.some(student => student.id === id)) {
        alert("Student ID must be unique!");
        return;
    }

    const student = {
        id,
        name,
        age,
        gender,
        form,
        performance: []
    };

    students.push(student);
    displayStudents();
    this.reset();
});

function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        const avg = calculateAverage(student);

        table.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>Form ${student.form}</td>
            <td>${avg}</td>
            <td>
                <button onclick="addPerformance(${index})">Add Result</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

function addPerformance(index) {
    const math = parseInt(prompt("Math Score:"));
    const english = parseInt(prompt("English Score:"));
    const science = parseInt(prompt("Science Score:"));
    const social = parseInt(prompt("Social Studies Score:"));

    const performance = {
        form: students[index].form,
        subjects: { math, english, science, social }
    };

    students[index].performance.push(performance);
    displayStudents();
}

function calculateAverage(student) {
    if (student.performance.length === 0) return "N/A";

    const latest = student.performance[student.performance.length - 1];
    const scores = Object.values(latest.subjects);
    const total = scores.reduce((a, b) => a + b, 0);
    return (total / scores.length).toFixed(2);
}
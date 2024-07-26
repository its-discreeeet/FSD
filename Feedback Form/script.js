function showForm(role) {
    document.getElementById('student-form').style.display = 'none';
    document.getElementById('teacher-form').style.display = 'none';
    document.getElementById(`${role}-form`).style.display = 'block';
}

function submitStudentFeedback(event) {
    event.preventDefault();

    const studentName = document.getElementById('student-name').value;
    if (!/^[a-zA-Z\s]+$/.test(studentName)) {
        alert('Name must contain alphabets only.');
        return;
    }

    const studentId = document.getElementById('student-id').value;
    if (!/^\d{8}$/.test(studentId)) {
        alert('Student ID must be an 8-digit number.');
        return;
    }

    const attendanceInput = document.getElementById('attendance').value;
    const attendance = parseFloat(attendanceInput);
    if (isNaN(attendance) || attendance < 0 || attendance > 100 || !/^\d+(\.\d{1,2})?$/.test(attendanceInput)) {
        alert('Attendance must be a number between 0 and 100, with up to 2 decimal places.');
        return;
    }

    if (attendance < 80) {
        alert('You must have at least 80% attendance to submit feedback.');
        return;
    }

    const form = document.getElementById('student-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert('Please fill out all fields before submitting.');
            return;
        }
    }
    
    const courseRating = document.getElementById('course-rating').value;
    const courseFeedback = document.getElementById('course-feedback').value;
    const teacherRating = document.getElementById('teacher-rating').value;
    const teacherFeedback = document.getElementById('teacher-feedback').value;
    
    console.log('Student Feedback:', {
        studentName,
        studentId,
        attendance,
        courseRating,
        courseFeedback,
        teacherRating,
        teacherFeedback
    });
    
    alert('Thank you for your feedback!');
    document.getElementById('student-form').reset();
}

function submitTeacherFeedback(event) {
    event.preventDefault();

    const form = document.getElementById('teacher-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert('Please fill out all fields before submitting.');
            return;
        }
    }

    const studentSelected = document.getElementById('student-select').value;
    if (studentSelected === "") {
        alert('Please select a student.');
        return;
    }

    const teacherName = document.getElementById('teacher-name').value;
    if (!/^[a-zA-Z\s]+$/.test(teacherName)) {
        alert('Teacher name must contain alphabets only.');
        return;
    }
    
    const studentPerformance = document.getElementById('student-performance').value;
    if (studentPerformance === "") {
        alert('Please select a performance rating for the student.');
        return;
    }

    const teacherComments = document.getElementById('teacher-comments').value;
    if (teacherComments.trim().length < 10) {
        alert('Please provide more detailed comments (at least 10 characters).');
        return;
    }
    
 
    console.log('Teacher Feedback:', {
        teacherName,
        studentSelected,
        studentPerformance,
        teacherComments
    });
    
    alert('Thank you for your feedback!');
    document.getElementById('teacher-form').reset();
}

// Simulating a list of students (in a real application, this would come from a database)
const students = [
    {id: '1', name: 'Alan Turing'},
    {id: '2', name: 'J. Robert Oppenheimer'},
    {id: '3', name: 'Charles Babbage'},
];


const studentSelect = document.getElementById('student-select');
students.forEach(student => {
    const option = document.createElement('option');
    option.value = student.id;
    option.textContent = student.name;
    studentSelect.appendChild(option);
});

document.querySelectorAll('button[type="reset"]').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
            this.form.reset();
        }
    });
});
from flask import abort, Flask, jsonify, request, render_template
from werkzeug.exceptions import HTTPException, NotFound, Unauthorized
from encrypte import verify_password
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.subject import Subject
from models.course import Course
from models.instructor import Instructor
from models.student import Student
from models.base import Base
from models import storage
from models.engine.db_storage import BaseDB
from datetime import datetime, timedelta
from jose import JWTError, jwt
from os import getenv
from flask_cors import CORS
from dotenv import load_dotenv

SECRET_KEY="e13d15c8879290396492efb62d0a424734fadd0727f19789cf62c206e16c5d2cce065e0f314661d64d083938c1ea7400ac423746e6b57c33ab68a711f1a68d91"
ALGORITHM = "HS256"

load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


# CRUD operations for Subject
@app.route('/subjects', methods=['GET'])
def get_subjects():
    subjects = storage.all(Subject).values()
    
    return jsonify([subject.to_dict() for subject in subjects])

@app.route('/subjects/<subject_id>/courses', methods=['GET'])
def get_courses_subject_id(subject_id):
    subject = storage.get(Subject, subject_id)

    if not subject:
        abort(404)
    list_courses = []
    for course in subject.courses:
        list_courses.append(course.to_dict())

    return jsonify(list_courses)

    

@app.route('/subjects/<int:subject_id>', methods=['GET'])
def get_subject(subject_id):
    subject = storage.get(Subject, subject_id)
    if subject:
        return render_template("subjects_courses.html", subject=subject)
    else:
        return render_template("not_found.html")

@app.route('/subjects', methods=['POST'])
def create_subject():
    data = request.get_json()
    new_subject = Subject(**data)
    new_subject.save()
    return jsonify({'message': 'Subject created successfully', 'id': new_subject.id}), 201

@app.route('/subjects/<int:subject_id>', methods=['PUT'])
def update_subject(subject_id):
    subject = storage.get(Subject, subject_id)
    if not subject:
        return render_template("not_found.html")
    data = request.get_json()
    for key, value in data.items():
        setattr(subject, key, value)
    return jsonify({'message': 'Subject updated successfully'}), 200

@app.route('/subjects/<int:subject_id>', methods=['DELETE'])
def delete_subject(subject_id):
    subject = storage.get(Subject, subject_id)
    if not subject:
        return render_template("not_found.html")
    subject.delete()
    return jsonify({'message': 'Subject deleted successfully'}), 200


# CRUD operations for Instructor
@app.route('/instructors', methods=['GET'])
def get_instructors():
    instructors = storage.all(Instructor).values()
    return render_template("instructors.html", instructors=instructors)

@app.route('/instructors/<int:instructor_id>', methods=['GET'])
def get_instructor(instructor_id):
    instructor = storage.get(Instructor, instructor_id)
    if instructor:
        return render_template("instructors.html", instructor=instructor)
    else:
        return render_template("not_found.html")

@app.route('/instructors', methods=['POST'])
def create_instructor():
    data = request.get_json()
    new_instructor = Instructor(**data)
    new_instructor.save()
    return jsonify({'message': 'Instructor created successfully', 'id': new_instructor.id}), 201

@app.route('/instructors/<int:instructor_id>', methods=['PUT'])
def update_instructor(instructor_id):
    instructor = storage.get(Instructor, instructor_id)
    if not instructor:
        return render_template("not_found.html")
    data = request.get_json()
    for key, value in data.items():
        setattr(instructor, key, value)
    instructor.save()
    return jsonify({'message': 'Instructor updated successfully'}), 200

@app.route('/instructors/<int:instructor_id>', methods=['DELETE'])
def delete_instructor(instructor_id):
    instructor = storage.get(Instructor, instructor_id)
    if not instructor:
        return render_template("not_found.html")
    instructor.delete()
    return jsonify({'message': 'Instructor deleted successfully'}), 200


# CRUD operations for Student
@app.route('/students', methods=['GET'])
def get_students():
    students = storage.all(Student).values()
    return jsonify([student.to_dict() for student in students])

@app.route('/students/<student_id>', methods=['GET'])
def get_student(student_id):
    student = storage.get(Student, student_id)
    return jsonify(student.to_dict())

@app.route('/students/register', methods=['POST'])
def create_student():
    data = request.get_json()
    print(data)
    new_student = Student(**data)
    new_student.save()
    return jsonify({'message': 'Student created successfully', 'id': new_student.id}), 201


def authenticate_user(email, password):
    user = storage.get_user_email(Student, email)
    if not user:
        # Raise a 404 Not Found if user doesn't exist
        raise NotFound(description="Email does not exist")
    if not verify_password(password, user.password):
        # Raise a 401 Unauthorized if password is incorrect
        raise Unauthorized(description="Incorrect password")
    return user

@app.route('/students/login', methods=['POST'])
def login_student():
    data = request.get_json()  # Get the data from the request
    email = data.get('email')
    password = data.get('password')
    try:
        # Attempt to authenticate the user
        user = authenticate_user(email, password)
        data = {
            "email": user.email,
            "exp": datetime.utcnow() + timedelta(minutes=1)
        }
        token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return jsonify({"access_token": token, "token_type": "Bearer"}), 200
    except HTTPException as e:
        # Catch HTTP exceptions and return the appropriate response
        return jsonify({"error": e.description}), e.code

@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    student = storage.get(Student, student_id)
    if not student:
        return render_template("not_found.html")
    data = request.get_json()
    for key, value in data.items():
        setattr(student, key, value)
    student.save()
    return jsonify({'message': 'Student updated successfully'}), 200

@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = storage.get(Student, student_id)
    if not student:
        return render_template("not_found.html")
    student.delete()
    return jsonify({'message': 'Student deleted successfully'}), 200


# CRUD operations for Course
@app.route('/courses', methods=['GET'])
def get_courses():
    courses = storage.all(Course).values()
    return jsonify([course.to_dict() for course in courses])

@app.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = storage.get(Course, course_id)
    if course:
        return render_template("courses.html", course=course)
    else:
        return render_template("not_found.html")

@app.route('/courses', methods=['POST'])
def create_course():
    data = request.get_json()
    if 'subject_id' not in data or 'instructor_id' not in data:
        return jsonify({'error': 'subject_id and instructor_id are required'}), 400
    new_course = Course(**data)
    new_course.save()
    return jsonify({'message': 'Course created successfully', 'id': new_course.id}), 201

@app.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    course = storage.get(Course, course_id)
    if not course:
        return render_template("not_found.html")
    data = request.get_json()
    if 'subject_id' not in data or 'instructor_id' not in data:
        return jsonify({'error': 'subject_id and instructor_id are required'}), 400
    for key, value in data.items():
        setattr(course, key, value)
    course.save()
    return jsonify({'message': 'Course updated successfully'}), 200

@app.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = storage.get(Course, course_id)
    if not course:
        return render_template("not_found.html")
    course.delete()
    return jsonify({'message': 'Course deleted successfully'}), 200

from flask import jsonify, request, render_template
from models import storage
from models.student import Student
from models.course import Course

# Enroll a student in a course
@app.route('/courses/<int:course_id>/enroll/<int:student_id>', methods=['POST'])
def enroll_student(course_id, student_id):
    course = storage.get(Course, course_id)
    student = storage.get(Student, student_id)

    if not course or not student:
        return jsonify({'error': 'Course or student not found'}), 404

    if student in course.students:
        return jsonify({'error': 'Student already enrolled in the course'}), 400

    course.students.append(student)
    course.save()
    return jsonify({'message': 'Student enrolled successfully'}), 200

# Unenroll a student from a course
@app.route('/courses/<int:course_id>/unenroll/<int:student_id>', methods=['POST'])
def unenroll_student(course_id, student_id):
    course = storage.get(Course, course_id)
    student = storage.get(Student, student_id)

    if not course or not student:
        return jsonify({'error': 'Course or student not found'}), 404

    if student not in course.students:
        return jsonify({'error': 'Student is not enrolled in the course'}), 400

    course.students.remove(student)
    course.save()
    return jsonify({'message': 'Student unenrolled successfully'}), 200



if __name__ == '__main__':
    app.run(debug=True)

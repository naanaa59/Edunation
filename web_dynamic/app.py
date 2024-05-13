from flask import abort, Flask, jsonify, request, render_template
from werkzeug.exceptions import HTTPException, NotFound, Unauthorized
from encrypte import verify_password
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.subject import Subject
from models.course import Course
from models.instructor import Instructor, InstructorCourses
from models.student import Student, StudentCourses
from models.base import Base
from models import storage
from models.engine.db_storage import BaseDB
from datetime import datetime, timedelta
from jose import JWTError, jwt
from os import getenv
from flask_cors import CORS
from dotenv import load_dotenv
from sqlalchemy.exc import IntegrityError

SECRET_KEY="e13d15c8879290396492efb62d0a424734fadd0727f19789cf62c206e16c5d2cce065e0f314661d64d083938c1ea7400ac423746e6b57c33ab68a711f1a68d91"
ALGORITHM = "HS256"


load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


# CRUD operations for Subject OK
@app.route('/subjects', methods=['GET'])
def get_subjects():
    subjects = storage.all(Subject).values()
    return jsonify([subject.to_dict() for subject in subjects])

@app.route('/subjects/<subject_id>', methods=['GET'])
def get_subject(subject_id):
    subject = storage.get(Subject, subject_id)
    if subject:
        return jsonify(subject.to_dict())
    else:
        return jsonify({'message': 'Subject not found'}), 404

@app.route('/subjects', methods=['POST'])
def create_subject():
    data = request.get_json()
    new_subject = Subject(**data)
    new_subject.save()
    return jsonify({'message': 'Subject created successfully', 'id': new_subject.id}), 201

@app.route('/subjects/<subject_id>', methods=['PUT'])
def update_subject(subject_id):
    subject = storage.get(Subject, subject_id)
    if not subject:
        return jsonify({'message': 'subject not found'}), 404
    data = request.get_json()
    for key, value in data.items():
        setattr(subject, key, value)
    subject.save()
    return jsonify({'message': 'Subject updated successfully'}), 200

@app.route('/subjects/<subject_id>', methods=['DELETE'])
def delete_subject(subject_id):
    subject = storage.get(Subject, subject_id)
    if not subject:
        return jsonify({'message': 'subject not found'}), 404
    subject.delete()
    storage.save()
    return jsonify({'message': 'Subject deleted successfully'}), 200


# CRUD operations for Instructor OK
@app.route('/instructors', methods=['GET'])
def get_instructors():
    instructors = storage.all(Instructor).values()
    return jsonify([instructor.to_dict() for instructor in instructors])

@app.route('/instructors/<instructor_id>', methods=['GET'])
def get_instructor(instructor_id):
    instructor = storage.get(Instructor, instructor_id)
    if not instructor:
        return jsonify({'message': 'Instructor not found'}), 404
    else:
        return jsonify(instructor.to_dict())

@app.route('/instructors', methods=['POST'])
def create_instructor():
    data = request.get_json()
    new_instructor = Instructor(**data)
    new_instructor.save()
    return jsonify({'message': 'Instructor created successfully', 'id': new_instructor.id}), 201

@app.route('/instructors/<instructor_id>', methods=['PUT'])
def update_instructor(instructor_id):
    instructor = storage.get(Instructor, instructor_id)
    if not instructor:
        return jsonify({'message': 'Instructor not found'}), 404
    data = request.get_json()
    for key, value in data.items():
        setattr(instructor, key, value)
    instructor.save()
    return jsonify({'message': 'Instructor updated successfully'}), 200

@app.route('/instructors/<instructor_id>', methods=['DELETE'])
def delete_instructor(instructor_id):
    instructor = storage.get(Instructor, instructor_id)
    if not instructor:
        return jsonify({'message': 'Instructor not found'}), 404
    instructor.delete()
    storage.save()
    return jsonify({'message': 'Instructor deleted successfully'}), 200


# CRUD operations for Student OK
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
            "sub": user.email,
            "exp": datetime.utcnow() + timedelta(minutes=60)
        }
        print(data["exp"])
        token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return jsonify({"access_token": token, "token_type": "Bearer"}), 200
    except HTTPException as e:
        # Catch HTTP exceptions and return the appropriate response
        return jsonify({"error": e.description}), e.code

@app.route('/students/<student_id>', methods=['PUT'])
def update_student(student_id):
    student = storage.get(Student, student_id)
    if not student:
        return render_template("not_found.html")
    data = request.get_json()
    for key, value in data.items():
        setattr(student, key, value)
    student.save()
    return jsonify({'message': 'Student updated successfully'}), 200

@app.route('/students/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = storage.get(Student, student_id)
    if not student:
        return render_template("not_found.html")
    student.delete()
    storage.save()
    return jsonify({'message': 'Student deleted successfully'}), 200

# CRUD operations for Course OK
@app.route('/courses', methods=['GET'])
def get_courses():
    courses = storage.all(Course).values()
    return jsonify([course.to_dict() for course in courses])

@app.route('/courses/<course_id>', methods=['GET'])
def get_course(course_id):
    course = storage.get(Course, course_id)
    if course:
        return jsonify(course.to_dict())
    else:
        return jsonify({'message': 'Course not found'}), 404

@app.route('/courses/<subject_id>/<instructor_id>', methods=['POST'])
def create_course(subject_id, instructor_id):
    data = request.get_json()
    # if 'subject_id' not in data or 'instructor_id' not in data:
    if not subject_id or not instructor_id:
        return jsonify({'error': 'subject_id and instructor_id are required'}), 400
    subject_ins= storage.get(Subject, data["subject_id"])
    instructor = storage.get(Instructor, data["instructor_id"])
    if subject_ins is None:
        return jsonify({'error': "subject not found in dababase"})
    if instructor is None:
        return jsonify({'error': "instructor not found in dababase"})
    course = Course(**data)
    inst_c_instance = InstructorCourses(instructor_id= instructor.id,
                                        course_id=course.id)

    subject_ins.courses.append(course)
    course.subject = subject_ins
    course.instructor_courses.append(inst_c_instance)      
    instructor.instructor_courses.append(inst_c_instance)          
    course.save()

    return jsonify({'message': 'Course created successfully', 'id': course.id}), 201

@app.route('/courses/<course_id>', methods=['PUT'])
def update_course(course_id):
    course = storage.get(Course, course_id)
    if not course:
        return jsonify({"message": "Course not found"}), 404
    data = request.get_json()
    for key, value in data.items():
        setattr(course, key, value)
    course.save()
    return jsonify({'message': 'Course updated successfully'}), 200

@app.route('/courses/<course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = storage.get(Course, course_id)
    if not course:
        return jsonify({"message": "Course not found"}), 404
    course.delete()
    storage.save()
    return jsonify({'message': 'Course deleted successfully'}), 200

# >---------- RELATIONSHIPS -----------<

# >------ Student's Courses ---------<
@app.route('/user/me/courses/', methods=['GET'])
def get_user_courses():
    authorization = request.headers.get('Authorization')
    user = check_token(authorization)
    student = storage.get(Student, user["id"])
    all_courses = courses = [enrollment.courses.to_dict() for enrollment in student.student_courses]
    return jsonify({"courses": all_courses})

# This method was for testing without authorization It WORKS :D
@app.route('/students/<student_id>/courses/', methods=['GET'])
def list_all_student_courses(student_id):
    student = storage.get(Student, student_id)
    all_courses =  [enrollment.courses.to_dict() for enrollment in student.student_courses]
    return jsonify({"courses": all_courses})

# Get all courses of a subject OK
@app.route('/subjects/<subject_id>/courses', methods=['GET'])
def get_courses_subject_id(subject_id):
    subject = storage.get(Subject, subject_id)
    if not subject:
        return jsonify({'message': 'subject not found'}), 404
    list_courses = subject.courses
    return jsonify([course.to_dict() for course in list_courses])

# Enroll a student in a course OK
@app.route('/courses/<course_id>/enroll/<student_id>', methods=['POST'])
def enroll_student(course_id, student_id):
    course = storage.get(Course, course_id)
    student = storage.get(Student, student_id)

    if not course or not student:
        return jsonify({'error': 'Course or student not found'}), 404

    # Check if the student is already enrolled in the course
    try:
        enrollment = StudentCourses(student_id=student.id, course_id=course.id)
        storage.new(enrollment)
        storage.save()
        course.student_courses.append(enrollment)
        student.student_courses.append(enrollment)
        storage.save()
        return jsonify({'message': 'Student enrolled successfully'}), 200
    except IntegrityError as e:
        storage.rollback_db()
        return jsonify({'error': 'Student already enrolled'}), 400


# Unenroll a student from a course
@app.route('/courses/<course_id>/unenroll/<student_id>', methods=['POST'])
def unenroll_student(course_id, student_id):
    course = storage.get(Course, course_id)
    student = storage.get(Student, student_id)

    if not course or not student:
        return jsonify({'error': 'Course or student not found'}), 404

    # Check if the student is already enrolled in the course
    if not storage.is_student_enrolled(student_id, course_id):
        return jsonify({'error': 'Student is not enrolled in the course'}), 400

    enrollment = storage.get_enrollment(student_id=student.id, course_id=course.id)
    storage.delete(enrollment)
    storage.save()
        
    return jsonify({'message': 'Student unenrolled successfully'}), 200
    
# List all enrollement
@app.route('/courses/all-enrollement', methods=['GET'])
def list_all_enrollement():
    enrollements = storage.list_enrollements()
    enrollements_list = [enrollement.to_dict() for enrollement in enrollements]
    return jsonify(enrollements_list), 200


#decoder

def check_token(authorization: str = None):
    if not authorization or not authorization.startswith("Bearer "):
        abort(400, description="Authorization header missing or invalid")
    try:
        token = authorization[7:]
        print(token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        email = payload.get("sub")
    except jwt.JWTError as e:

        print("Exception: ", e)
        abort(401, description="Invalid token")

    # Assuming you have a function to get the user by email
    user = storage.get_user_email(Student, email)
    return user.to_dict()

@app.route('/token_check/', methods=['GET'])
def client_login():
    authorization = request.headers.get('Authorization')
    print(authorization)
    user = check_token(authorization)
    print(user)
    return jsonify({"user": user})


if __name__ == '__main__':
    app.run(debug=True)
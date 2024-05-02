""" This script test the db_storage module"""
import unittest
from models.engine.db_storage import DBStorage
from models.user import User
from models.subject import Subject
from models.course import Course
from models.student import Student, StudentCourses
from models.instructor import Instructor, InstructorCourses
from models.base import Base, BaseDB
from models import storage


class TestDBStorage(unittest.TestCase):
    def setUp(self):
        """ Set up the test environment """
        storage.reload()

    def tearDown(self):
        """ Clean up after each test """
        storage.close()

    def test_create_dbstorage(self):
        """ Test creating a DBStorage instance """
        self.assertIsInstance(storage, DBStorage)

    def test_save_object(self):
        """ Test saving an object using DBStorage """
        subject = Subject(name="Test Subject", description="Test description")
        storage.new(subject)
        storage.save()
        self.assertIn(subject, storage.all(Subject).values())
        storage.delete(subject)

    def test_delete_object(self):
        """ Test deleting an object using DBStorage """
        subject = Subject(name="Test Subject", description="Test description")
        storage.new(subject)
        storage.save()
        storage.delete(subject)
        self.assertNotIn(subject, storage.all(Subject).values())

    
    
    def test_all_method(self):
        """ Test the all method of DBStorage """
        subjects = {Subject(name=f"Subject{i}", description=f"Description{i}") for i in range(3)}

        
        for subject in subjects:
            storage.new(subject)
        storage.save()

        all_subjects = storage.all(Subject)
        
        self.assertEqual(len(all_subjects), len(subjects))
        for subject in subjects:
            self.assertIn(subject, all_subjects.values())
        for subject in subjects:
            storage.delete(subject)

    def test_get_method(self):
        """ Test the get method of DBStorage """
        subject = Subject(name="Math", description="Mathematics")
        storage.new(subject)
        storage.save()

        retrieved_subject = storage.get(Subject, subject.id)
        self.assertEqual(retrieved_subject, subject)
        storage.delete(subject)
    
    def test_subject_course_relationship(self):
        """ Test the relationship between Subject and Course """
        subject = Subject(name="Test Subject", description="Test description")
        instructor = Instructor(first_name="Emily", last_name="Davis", level="Intermediate")
        storage.new(subject)
        storage.new(instructor)
        storage.save()
        course = Course(subject_id=subject.id, instructor_id=instructor.id, title="Test Course",
                        description="Course description", subject=subject)
        
        
        storage.new(course)
        storage.save()

        retrieved_subject = storage.get(Subject, subject.id)
        retrieved_course = storage.get(Course, course.id)

        self.assertEqual(retrieved_course.subject, retrieved_subject)
        storage.delete(subject)
        storage.delete(course)
        storage.delete(instructor)

    def test_course_student_relationship(self):
        """ Test the relationship between Course and Student """
        subject = Subject(name="Test Subject", description="Test description")
        instructor = Instructor(first_name="Emily", last_name="Davis", level="Intermediate")
        storage.new(subject)
        storage.new(instructor)
        storage.save()
        course = Course(subject_id=subject.id, instructor_id=instructor.id, title="Test Course",
                        description="Course description", subject=subject)
        
        
        storage.new(course)
        storage.save()
        student = Student(username="test_user", grade="A")

        storage.new(student)
        storage.save()

        enrollment = StudentCourses(student_id=student.id, course_id=course.id)
        storage.new(enrollment)
        storage.save()
        course.student_courses.append(enrollment)
        student.student_courses.append(enrollment)

        retrieved_course = storage.get(Course, course.id)
        retrieved_student = storage.get(Student, student.id)

        self.assertIn(enrollment, retrieved_course.student_courses)
        storage.delete(enrollment)
        storage.delete(subject)
        storage.delete(student)
        
        storage.delete(course)
        storage.delete(instructor)

    def test_course_instructor_relationship(self):
        """ Test the relationship between Course and Instructor """
        subject = Subject(name="Test Subject", description="Test description")
        instructor = Instructor(first_name="Emily", last_name="Davis", level="Intermediate")
        storage.new(subject)
        storage.new(instructor)
        storage.save()
        course = Course(subject_id=subject.id, instructor_id=instructor.id, title="Test Course",
                        description="Course description", subject=subject)
        
        
        storage.new(course)
        storage.save()
        
        course_instructor_link = InstructorCourses(course_id=course.id,
                                                   instructor_id=instructor.id)

        retrieved_course = storage.get(Course, course.id)
        retrieved_instructor = storage.get(Instructor, instructor.id)

        instructor.instructor_courses.append(course_instructor_link)
        course.instructor_courses.append(course_instructor_link)

        self.assertIn(course_instructor_link, retrieved_course.instructor_courses)

        storage.delete(subject)
        storage.delete(instructor)
        storage.delete(course)
        

if __name__ == '__main__':
    unittest.main()

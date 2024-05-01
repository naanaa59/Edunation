""" This script test the course module"""
import unittest
from models.course import Course
from models.subject import Subject
from models.instructor import Instructor
from models import storage

class TestCourse(unittest.TestCase):
    def test_create_course(self):
        """ Test creating a Course instance"""
        subject = Subject(name="It", description="Computer Science")
        instructor = Instructor(first_name="Emily", last_name="Davis", level="Intermediate")
        storage.new(subject)
        storage.save()
        storage.new(instructor)
        storage.save()
        course = Course(instructor_id=instructor.id, subject_id=subject.id, title="Python Programming",
                        description="Learn Python programming")
        

        self.assertIsInstance(course, Course)
        storage.delete(subject)
        storage.save()
        storage.delete(instructor)
        storage.save()
        

    def test_save_course(self):
        """ Test saving a Course instance"""
        subject = Subject(name="It", description="Computer Science")
        instructor = Instructor(first_name="Emily", last_name="Davis", level="Intermediate")
        storage.new(subject)
        storage.save()
        storage.new(instructor)
        storage.save()
        course = Course(instructor_id=instructor.id, subject_id=subject.id, title="Python Programming",
                        description="Learn Python programming")
        
        storage.new(course)
        storage.save()
        self.assertIn(course, storage.all(Course).values())
        storage.delete(course)
        storage.save()
        storage.delete(subject)
        storage.save()
        storage.delete(instructor)
        storage.save()
    
    def test_delete_course(self):
        """ Test deleting a Course instance """
        subject = Subject(name="It", description="Computer Science")
        instructor = Instructor(first_name="Emily", last_name="Davis", level="Intermediate")
        storage.new(subject)
        storage.save()
        storage.new(instructor)
        storage.save()
        course = Course(instructor_id=instructor.id, subject_id=subject.id, title="Python Programming",
                        description="Learn Python programming")
        
        storage.new(course)
        storage.save()
        self.assertIn(course, storage.all(Course).values())
        storage.delete(course)
        storage.save()
        storage.delete(subject)
        storage.save()
        storage.delete(instructor)
        storage.save()
        self.assertNotIn(course, storage.all(Course).values())

    def test_invalid_object_retrieval(self):
        """ Test retrieving a non-existent object """
        retrieved_course = storage.get(Course, "nonexistent_id")
        self.assertIsNone(retrieved_course)
        
    def test_invalid_object_deletion(self):
        """ Test deleting a non-existent object """
        subject = Subject(name="It", description="Computer Science")
        instructor = Instructor(first_name="Emily", last_name="Davis", level="Intermediate")
        storage.new(subject)
        storage.save()
        storage.new(instructor)
        storage.save()
        invalid_subject = Course(instructor_id=instructor.id, subject_id=subject.id, title="Python Programming",
                        description="Learn Python programming")

        # Save the object to the database
        storage.new(invalid_subject)
        storage.save()

        # Now attempt to delete the object without committing immediately
        storage.delete(invalid_subject)

        # Check if the object is still present before committing
        self.assertIn(invalid_subject, storage.all(Course).values())

        # Explicitly commit the changes after the deletion
        storage.save()

        # Check if the object is not present in the storage after committing
        self.assertNotIn(invalid_subject, storage.all(Course).values())

if __name__ == '__main__':
    unittest.main()
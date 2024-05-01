import unittest
from models.student import Student
from models import storage

class TestStudent(unittest.TestCase):
    def test_create_student(self):
        """ Test creating a Student instance"""
        student = Student(first_name="John", last_name="Doe", grade="A")
        self.assertIsInstance(student, Student)

    def test_save_student(self):
        """ Test saving a Student instance"""
        student = Student(first_name="Jane", last_name="Smith", grade="B")
        
        storage.new(student)
        storage.save()
        self.assertIn(student, storage.all(Student).values())
        storage.delete(student)
        storage.save()
    
    def test_delete_student(self):
        """ Test deleting a Student instance """
        student = Student(first_name="Alice", last_name="Johnson", grade="C")
        storage.new(student)
        storage.save()
        storage.delete(student)
        storage.save()
        self.assertNotIn(student, storage.all(Student).values())
    
    def test_invalid_object_retrieval(self):
        """ Test retrieving a non-existent object """
        retrieved_student = storage.get(Student, "nonexistent_id")
        self.assertIsNone(retrieved_student)


if __name__ == '__main__':
    unittest.main()
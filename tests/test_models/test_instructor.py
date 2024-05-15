""" This script test the instructor module"""
import unittest
from models.instructor import Instructor
from models import storage

class TestInstructor(unittest.TestCase):
    def test_create_instructor(self):
        """ Test creating an Instructor instance"""
        instructor = Instructor(first_name="Michael", last_name="Smith", level="Expert")
        self.assertIsInstance(instructor, Instructor)


    def test_save_instructor(self):
        """ Test saving an Instructor instance"""
        instructor = Instructor(first_name="Emily", last_name="Davis", level="Intermediate")
        
        storage.new(instructor)
        storage.save()
        self.assertIn(instructor, storage.all(Instructor).values())
        storage.delete(instructor)
        storage.save()

    
    def test_delete_instructor(self):
        """ Test deleting an Instructor instance """
        instructor = Instructor(first_name="David", last_name="Jones", level="Beginner")
        storage.new(instructor)
        storage.save()
        storage.delete(instructor)
        storage.save()
        self.assertNotIn(instructor, storage.all(Instructor).values())
    
    def test_invalid_object_retrieval(self):
        """ Test retrieving a non-existent object """
        retrieved_instructor = storage.get(Instructor, "nonexistent_id")
        self.assertIsNone(retrieved_instructor)
    
    def test_invalid_object_deletion(self):
        """ Test deleting a non-existent object """
        invalid_subject = Instructor(username="Invalid Instructor")

        # Save the object to the database
        storage.new(invalid_subject)
        storage.save()

        # Now attempt to delete the object
        storage.delete(invalid_subject)

        # Commit the changes after the deletion
        storage.save()

        # Check if the object is not present in the storage after deletion
        self.assertNotIn(invalid_subject, storage.all(Instructor).values())



if __name__ == '__main__':
    unittest.main()
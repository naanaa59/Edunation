""" This script test the subject module"""
import unittest
from models.subject import Subject
from models import storage

class TestSubject(unittest.TestCase):
    def test_create_subject(self):
        """ Test creating a Subject instance"""
        subject = Subject(name="Math", description="Mathematics")
        self.assertIsInstance(subject, Subject)
        

    def test_save_subject(self):
        """ Test saving a Subject instance"""
        subject = Subject(name="Science", description="Science subject")
        
        storage.new(subject)
        storage.save()
        self.assertIn(subject, storage.all(Subject).values())
        storage.delete(subject)
        storage.save()


    def test_delete_subject(self):
        """ Test deleting a Subject instance """
        subject = Subject(name="History", description="History subject")
        storage.new(subject)
        storage.save()
        storage.delete(subject)
        storage.save()
        self.assertNotIn(subject, storage.all(Subject).values())
    
    def test_invalid_object_retrieval(self):
        """ Test retrieving a non-existent object """
        retrieved_subject = storage.get(Subject, "nonexistent_id")
        self.assertIsNone(retrieved_subject)

    def test_invalid_object_deletion(self):
        """ Test deleting a non-existent object """
        invalid_subject = Subject(name="Invalid Subject", description="Invalid description")

        # Save the object to the database
        storage.new(invalid_subject)
        storage.save()

        # Now attempt to delete the object
        storage.delete(invalid_subject)

        # Commit the changes after the deletion
        storage.save()

        # Check if the object is not present in the storage after deletion
        self.assertNotIn(invalid_subject, storage.all(Subject).values())


if __name__ == '__main__':
    unittest.main()



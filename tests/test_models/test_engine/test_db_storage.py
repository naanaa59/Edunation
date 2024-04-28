from unittest.mock import MagicMock, patch
import unittest
from models.engine.db_storage import DBStorage, Course

class TestDBStorage(unittest.TestCase):
    def setUp(self):
        # Create a MagicMock for the session
        self.mock_session = MagicMock()
        # Patch the sessionmaker to return the mock session
        patch('models.engine.db_storage.sessionmaker', return_value=self.mock_session).start()
        # Create an instance of DBStorage
        self.db_storage = DBStorage()

    def test_create_course(self):
        # Create a sample course object
        course = Course(name='Test Course')
        # Call the new method to add the course to the session
        self.db_storage.new(course)
        # Save changes to the session
        self.db_storage.save()
        # Assert that the course was added to the session
        self.assertIn(course, self.mock_session.add.call_args_list[0][0])

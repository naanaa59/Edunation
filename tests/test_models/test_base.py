import unittest
from unittest.mock import patch, MagicMock
from datetime import datetime
from models import storage
from models.base import Base 

class TestBase(unittest.TestCase):
    """ Test cases for the Base class """

    def setUp(self):
        """ Set up test environment """
        self.base_model = Base()

    def tearDown(self):
        """ Clean up after each test """
        pass # No cleanup needed for this example

    @patch('models.storage.new')
    @patch('models.storage.save')
    def test_save(self, mock_save, mock_new):
        """ Test save method of Base class """
        self.base_model.save()
        mock_new.assert_called_once_with(self.base_model)
        mock_save.assert_called_once()

    def test_to_dict(self):
        """ Test to_dict method of Base class """
        base_dict = self.base_model.to_dict()
        self.assertIsInstance(base_dict, dict)
        self.assertIn('__class__', base_dict)
        self.assertIn('id', base_dict)
        self.assertIn('created_at', base_dict)
        self.assertIn('updated_at', base_dict)
        self.assertEqual(base_dict['__class__'], 'Base')
        self.assertIsInstance(base_dict['created_at'], str)
        self.assertIsInstance(base_dict['updated_at'], str)

    @patch('models.storage.delete')
    def test_delete(self, mock_delete):
        """ Test delete method of Base class """
        self.base_model.delete()
        mock_delete.assert_called_once_with(self.base_model)

if __name__ == '__main__':
    unittest.main()
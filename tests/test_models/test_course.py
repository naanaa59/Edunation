# import unittest
# from models.subject import Subject
# from models.course import Course
# from models.instructor import Instructor
# from models.engine.db_storage import DBStorage, BaseDB
# from os import getenv


# class TestDBStorage(unittest.TestCase):
#     """ Test cases for the DBStorage class """
#     def setUp(self):
#         """ Set up test environment """
#         EDU_MYSQL_USER = getenv("EDU_MYSQL_USER")
#         EDU_MYSQL_PWD = getenv("EDU_MYSQL_PWD")
#         EDU_MYSQL_HOST = getenv("EDU_MYSQL_HOST")
#         EDU_MYSQL_DB = getenv("EDU_MYSQL_DB")

#         # Create a separate database for testing
#         test_db_name = EDU_MYSQL_DB + "_test"  # Append '_test' to the database name
#         test_engine_url = f'mysql+mysqldb://{EDU_MYSQL_USER}:{EDU_MYSQL_PWD}@{EDU_MYSQL_HOST}/{test_db_name}'
        
#         self.__test_engine = create_engine(test_engine_url)

#         # Create all tables for the test engine
#         BaseDB.metadata.create_all(self.__test_engine)

#         # Create a session for the test engine
#         self.__test_session = sessionmaker(bind=self.__test_engine)()

#     def tearDown(self):
#         """ Clean up after each test """
#         self.storage.close()

#     def test_create_course(self):
#         """ Test creating a new Course object """
#         subject = Subject()
#         instructor = Instructor()

#         self.storage.new(subject)
#         self.storage.new(instructor)
#         self.storage.save()

#         course = Course(subject_id=subject.id, instructor_id=instructor.id)
#         self.storage.new(course)
#         self.storage.save()

#         result = self.storage.get(Course, course.id)
#         self.assertIsNotNone(result)
#         self.assertEqual(result.id, course.id)

#     def test_query_course(self):
#         """ Test querying a Course object """
#         subject = Subject()
#         instructor = Instructor()

#         self.storage.new(subject)
#         self.storage.new(instructor)
#         self.storage.save()

#         course = Course(subject_id=subject.id, instructor_id=instructor.id)
#         self.storage.new(course)
#         self.storage.save()

#         result = self.storage.get(Course, course.id)
#         self.assertIsNotNone(result)
#         self.assertEqual(result.id, course.id)

#     def test_delete_course(self):
#         """ Test deleting a Course object """
#         subject = Subject()
#         instructor = Instructor()

#         self.storage.new(subject)
#         self.storage.new(instructor)
#         self.storage.save()

#         course = Course(subject_id=subject.id, instructor_id=instructor.id)
#         self.storage.new(course)
#         self.storage.save()

#         self.storage.delete(course)
#         self.storage.save()

#         result = self.storage.get(Course, course.id)
#         self.assertIsNone(result)

# if __name__ == '__main__':
#     unittest.main()

#!/usr/bin/python3
""" This is dbstorage class that define all methods to handle database """

import models
import sqlalchemy
from models.user import User
from models.subject import Subject
from models.course import Course
from models.student import Student
from models.instructor import Instructor
from sqlalchemy import create_engine
from models.base import Base, BaseDB
from os import getenv
from sqlalchemy.orm import scoped_session, sessionmaker


classes = {"Subject": Subject, "Course": Course, "Student": Student, "Instructor": Instructor}


class DBStorage:
    """ DBStorage class with database """
    __engine = None
    __session = None

    def __init__(self):
        """ Instantiate a DBStorage object """
        EDU_MYSQL_USER = getenv("EDU_MYSQL_USER")
        EDU_MYSQL_PWD = getenv("EDU_MYSQL_PWD")
        EDU_MYSQL_HOST = getenv("EDU_MYSQL_HOST")
        EDU_MYSQL_DB = getenv("EDU_MYSQL_DB")
        EDU_ENV = getenv('EDU_ENV')

        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                       format(EDU_MYSQL_USER,
                                              EDU_MYSQL_PWD,
                                              EDU_MYSQL_HOST,
                                              EDU_MYSQL_DB))

        if EDU_ENV == "test":
            BaseDB.metadata.drop_all(self.__engine)
    def all(self, cls=None):
        """ query the database session """
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return new_dict


    def new(self, obj):
        """ add an object to the database session """
        self.__session.add(obj)
        # self.relationship_manager(obj)

    def save(self):
        """ commit all changes to database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """ delete from database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        BaseDB.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session


    def close(self):
        """ Call remove() method on the session attribute """
        self.__session.remove()

    def get(self, cls, id):
        """ returns an object basen on cls and its id """
        if cls not in classes.values():
            return None
        all_cls = models.storage.all(cls)
        for value in all_cls.values():
                if (value.id == id):
                    return value
        return None
    
    # def relationship_manager(self, obj):
    #     """ This function sets relationships in database for created obj"""
    #     if isinstance(obj, Student):
    #         for course in obj.courses:
    #             course.students.append(obj)
    #     elif isinstance(obj,Instructor):
    #         for course in obj.courses:
    #             course.instructors.append(obj)
    #     elif isinstance(obj, Course):
    #         for student in obj.students:
    #             student.courses.append(obj)
    #         for instructor in obj.instructors:
    #             instructor.courses.append(obj)
    #     self.save()




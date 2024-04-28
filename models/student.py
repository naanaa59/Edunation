#!/usr/bin/python3su
""" This script define student object """

import models
from models.base import Base, BaseDB
from models.user import User
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship

# student_courses = Table('student_courses', BaseDB.metadata,
#                        Column('student_id', String(60),
#                               ForeignKey('students.id'),
#                               primary_key=True),
#                        Column('course_id', String(60),
#                               ForeignKey('courses.id'),
#                               primary_key=True))
class StudentCourses(BaseDB):
    """ Represents the student_courses table """

    __tablename__ = 'student_courses'

    student_id = Column(String(60), ForeignKey('students.id'), primary_key=True)
    course_id = Column(String(60), ForeignKey('courses.id'), primary_key=True)

    students = relationship("Student", back_populates="student_courses")
    courses = relationship("Course", back_populates="student_courses")
    

    


class Student(User, BaseDB):
    """ Subject Class definition """
    __tablename__ = 'students'
    # user_id = Column(String(60), primary_key=True, nullable=False)
    grade = Column(String(128), nullable=True)
    student_courses = relationship("StudentCourses", back_populates="students")
#     courses = relationship("Course", secondary=StudentCourses,
#                            viewonly=False, back_populates="students")
       
    def __init__(self, *args, **kwargs):
        """ initializes student """
        super().__init__(*args, **kwargs)
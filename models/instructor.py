#!/usr/bin/python3
""" This script define instructor class """

import models
from models.base import Base, BaseDB
from models.user import User
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship


class InstructorCourses(BaseDB):
    """ Represents the instructor_courses table """

    __tablename__ = 'instructor_courses'
    __mapper_args__ = {
        'confirm_deleted_rows': False
    }

    instructor_id = Column(String(60), ForeignKey('instructors.id', ondelete='CASCADE',),
                           onupdate='CASCADE', primary_key=True)
    course_id = Column(String(60), ForeignKey('courses.id', ondelete='CASCADE'),
                       onupdate='CASCADE', primary_key=True)
    instructor = relationship("Instructor", back_populates="instructor_courses")
    courses = relationship("Course", back_populates="instructor_courses")

    def __init__(self, instructor_id, course_id):
       """ Initializes an instructor-course relationship """
       self.instructor_id = instructor_id
       self.course_id = course_id


class Instructor(User, BaseDB):
    """ Subject Class definition """
    __tablename__ = 'instructors'
    __mapper_args__ = {
        'confirm_deleted_rows': False
    }
    # user_id = Column(String(60), primary_key=True, nullable=False)
    level = Column(String(128), nullable=True)
#     courses = relationship("Course", secondary="instructor_courses",
#                            viewonly=False, back_populates="instructors")
    instructor_courses = relationship("InstructorCourses", back_populates="instructor",
                                      cascade="all, delete-orphan")

    def __init__(self, *args, **kwargs):
        """ initializes student """
        super().__init__(*args, **kwargs)
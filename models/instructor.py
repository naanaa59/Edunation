#!/usr/bin/python3
""" This script define instructor class """

import models
from models.base import Base, BaseDB
from models.user import User
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship

# instructor_courses = Table('instructor_courses', BaseDB.metadata,
#                        Column('instructor_id', String(60),
#                               ForeignKey('instructors.id', onupdate='CASCADE',
#                                          ondelete='CASCADE'),
#                               primary_key=True),
#                        Column('course_id', String(60),
#                               ForeignKey('courses.id', onupdate='CASCADE',
#                                          ondelete='CASCADE'),
#                               primary_key=True))
class InstructorCourses(BaseDB):
    """ Represents the instructor_courses table """

    __tablename__ = 'instructor_courses'

    instructor_id = Column(String(60), ForeignKey('instructors.id'), primary_key=True)
    course_id = Column(String(60), ForeignKey('courses.id'), primary_key=True)

    instructor = relationship("Instructor", back_populates="instructor_courses")
    courses = relationship("Course", back_populates="instructor_courses")

    def __init__(self, instructor_id, course_id):
       """ Initializes an instructor-course relationship """
       self.instructor_id = instructor_id
       self.course_id = course_id


class Instructor(User, BaseDB):
    """ Subject Class definition """
    __tablename__ = 'instructors'
    # user_id = Column(String(60), primary_key=True, nullable=False)
    level = Column(String(128), nullable=True)
#     courses = relationship("Course", secondary="instructor_courses",
#                            viewonly=False, back_populates="instructors")
    instructor_courses = relationship("InstructorCourses", back_populates="instructor")

    def __init__(self, *args, **kwargs):
        """ initializes student """
        super().__init__(*args, **kwargs)
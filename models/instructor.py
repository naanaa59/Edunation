#!/usr/bin/python3
""" This script define instructor class """

import models
from models.base import Base, BaseDB
from models.user import User
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship

instructor_courses = Table('instructor_courses', BaseDB.metadata,
                       Column('instructor_id', String(60),
                              ForeignKey('instructors.id', onupdate='CASCADE',
                                         ondelete='CASCADE'),
                              primary_key=True),
                       Column('course_id', String(60),
                              ForeignKey('courses.id', onupdate='CASCADE',
                                         ondelete='CASCADE'),
                              primary_key=True))

class Instructor(User, BaseDB):
    """ Subject Class definition """
    __tablename__ = 'instructors'
    # user_id = Column(String(60), primary_key=True, nullable=False)
    level = Column(String(128), nullable=True)
    courses = relationship("Course", secondary="instructor_courses",
                           viewonly=False, back_populates="instructors")

    def __init__(self, *args, **kwargs):
        """ initializes student """
        super().__init__(*args, **kwargs)
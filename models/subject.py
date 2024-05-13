#!/usr/bin/python3su
""" This script define Subject object """

import models
from models.base import Base, BaseDB
import sqlalchemy
from sqlalchemy import Column, String, Table, ForeignKey
from sqlalchemy.orm import relationship


# subject_courses = Table('subject_courses', BaseDB.metadata,
#                        Column('subject_id', String(60),
#                               ForeignKey('subjects.id', onupdate='CASCADE',
#                                          ondelete='CASCADE'),
#                               primary_key=True),
#                        Column('course_id', String(60),
#                               ForeignKey('courses.id', onupdate='CASCADE',
#                                          ondelete='CASCADE'),
#                               primary_key=True))
                       

class Subject(Base, BaseDB):
    """ Subject Class definition """
    __tablename__ = 'subjects'
    name = Column(String(128), nullable=True)
    description = Column(String(1024), nullable=True)
    courses = relationship("Course", back_populates="subject",
                           cascade="all, delete-orphan")
    
    def __init__(self, *args, **kwargs):
        """ initializes user """
        super().__init__(*args, **kwargs)


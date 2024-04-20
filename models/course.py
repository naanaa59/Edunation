#!/usr/bin/python3su
""" This script define Course object """

import models
from models.base import Base, BaseDB
import sqlalchemy
from sqlalchemy import Column, String, Table, ForeignKey
from sqlalchemy.orm import relationship


course_subject = Table('course_subject', BaseDB.metadata,
                       Column('course_id', String(60),
                              ForeignKey('courses.id', onupdate='CASCADE',
                                         ondelete='CASCADE'),
                              primary_key=True),
                       Column('subject_id', String(60),
                              ForeignKey('subjects.id', onupdate='CASCADE',
                                         ondelete='CASCADE'),
                              primary_key=True))


class Course(Base, BaseDB):
    """ Course Class definition """
    __tablename__ = 'courses'
    subject_id = Column(String(60), ForeignKey('subjects.id'), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    user_role = Column(String(60), ForeignKey('users.role'), nullable=False)
    title = Column(String(128), nullable=False)
    description = Column(String(1024), nullable=True)
    users = relationship("User", backref="courses")
    subjects = relationship("Subject",
                                 secondary=course_subject,
                                 viewonly=False)

    def __init__(self, *args, **kwargs):
        """ initializes user """
        super().__init__(*args, **kwargs)


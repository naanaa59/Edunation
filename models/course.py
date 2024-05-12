#!/usr/bin/python3su
""" This script define Course object """

import models
from models.base import Base, BaseDB
import sqlalchemy
from sqlalchemy import Column, String, Table, ForeignKey
from sqlalchemy.orm import relationship


class Course(Base, BaseDB):
    """ Course Class definition """
    __tablename__ = 'courses'
    __mapper_args__ = {
        'confirm_deleted_rows': False
    }
    subject_id = Column(String(60), ForeignKey('subjects.id'), nullable=False)
    # student_id = Column(String(60), ForeignKey('students.id', ondelete='SET NULL'), nullable=True)
    instructor_id = Column(String(60), ForeignKey('instructors.id'), nullable=False)

    title = Column(String(128), nullable=True)
    # link_video = Column(String(1000), nullable=True)
    link_photo = Column(String(1000), nullable=True)
    description = Column(String(15000), nullable=True)

    subject = relationship("Subject", back_populates="courses")
    
    student_courses = relationship("StudentCourses", back_populates="courses",
                                   cascade="all, delete")

    instructor_courses = relationship("InstructorCourses", back_populates="courses",
                                      cascade="all, delete")
    


    def __init__(self, *args, **kwargs):
        """ initializes course """
        super().__init__(*args, **kwargs)
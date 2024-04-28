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
    subject_id = Column(String(60), ForeignKey('subjects.id'), nullable=False)
    student_id = Column(String(60), ForeignKey('students.id'), nullable=True)
    instructor_id = Column(String(60), ForeignKey('instructors.id'), nullable=False)

    title = Column(String(128), nullable=True)
    # link_video = Column(String(1000), nullable=True)
    description = Column(String(15000), nullable=True)
    subject = relationship("Subject", back_populates="courses")
    # students = relationship("Student", secondary="StudentCourses",
    #                         viewonly=False, back_populates="courses")
    student_courses = relationship("StudentCourses", back_populates="courses")
    # instructors = relationship("Instructor", secondary="instructor_courses",
    #                            viewonly=False, back_populates="courses")
    instructor_courses = relationship("InstructorCourses", back_populates="courses")

    def __init__(self, *args, **kwargs):
        """ initializes user """
        super().__init__(*args, **kwargs)
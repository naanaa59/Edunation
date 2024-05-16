#!/usr/bin/python3su
""" This script define student object """

import models
from models.base import Base, BaseDB
from models.user import User
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship


class StudentCourses(BaseDB):
    """ Represents the student_courses table """

    __tablename__ = 'student_courses'
    __mapper_args__ = {
        'confirm_deleted_rows': False
    }
    
    student_id = Column(String(60), ForeignKey('students.id'), nullable=True,
                        primary_key=False)
    course_id = Column(String(60), ForeignKey('courses.id', ondelete='CASCADE'),
                       nullable=True, primary_key=True)

    students = relationship("Student", back_populates="student_courses")
    courses = relationship("Course", back_populates="student_courses")

    def to_dict(self):
        """ Convert StudentCourses object to dictionary """
        enrollment_dict = {
            'student_id': self.student_id,
            'course_id': self.course_id,
            'student': self.students.to_dict(),
            'course': self.courses.to_dict()
        }
        return enrollment_dict

class Student(User, BaseDB):
    """ Subject Class definition """
    __tablename__ = 'students'
    __mapper_args__ = {
        'confirm_deleted_rows': False
    }

    grade = Column(String(128), nullable=True)
    student_courses = relationship("StudentCourses", back_populates="students")

       
    def __init__(self, *args, **kwargs):
        """ initializes student """
        super().__init__(*args, **kwargs)
#!/usr/bin/python3su
""" This script define Subject object """

import models
from models.base import Base, BaseDB
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Subject(Base, BaseDB):
    """ Subject Class definition """
    __tablename__ = 'subjects'
    name = Column(String(128), nullable=False)
    description = Column(String(1024), nullable=True)
    courses = relationship("Course", backref="subject")

    def __init__(self, *args, **kwargs):
        """ initializes user """
        super().__init__(*args, **kwargs)


#!/usr/bin/python3
""" This script define User object """

import models
from models.base import Base, BaseDB
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class User(Base, BaseDB):
    """ User Class definition """
    __tablename__ = 'users'
    username = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    role = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)

    def __init__(self, *args, **kwargs):
        """ initializes user """
        super().__init__(*args, **kwargs)


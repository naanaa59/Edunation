#!/usr/bin/python3
""" This script define User object """

import models
from models.base import Base, BaseDB
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class User(Base):
    __abstract__ = True
    """ User Class definition """
    username = Column(String(128), nullable=True)
    email = Column(String(128), nullable=True)
    password = Column(String(128), nullable=True)
    # role = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    

    def __init__(self, *args, **kwargs):
        """ initializes user """
        super().__init__(*args, **kwargs)


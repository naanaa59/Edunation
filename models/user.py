#!/usr/bin/python3
""" This script define User object """

import models
from models.base import Base, BaseDB
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from encrypte import hash_password


class User(Base):
    __abstract__ = True
    """ User Class definition """
    username = Column(String(128), nullable=True)
    email = Column(String(128), nullable=True)
    password = Column(String(128), nullable=True)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    

    def __init__(self, *args, **kwargs):
        """ initializes user """
        super().__init__(*args, **kwargs)
    
    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = hash_password(value)
        super().__setattr__(name, value)


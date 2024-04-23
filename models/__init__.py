#!/usr/bin/python3
""" Initialize the models package """

from models.engine.db_storage import DBStorage


storage = DBStorage()

# storage.register_user()
storage.reload()

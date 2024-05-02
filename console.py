#!/usr/bin/python3
""" console """

import cmd
from datetime import datetime
import models
from models.base import Base
from models.user import User
from models.course import Course
from models.subject import Subject
from models.student import Student, StudentCourses
from models.instructor import Instructor, InstructorCourses
import shlex  # for splitting the line along spaces except in double quotes

classes = {"Base": Base, "Course": Course,
           "Subject": Subject, "Student": Student, "Instructor": Instructor}


class EDUCommand(cmd.Cmd):
    """ EduNation console """
    prompt = '(Edu\'Nation) '

    def do_EOF(self, arg):
        """Exits console"""
        return True

    def emptyline(self):
        """ overwriting the emptyline method """
        return False

    def do_quit(self, arg):
        """Quit command to exit the program"""
        return True

    def _key_value_parser(self, args):
        """creates a dictionary from a list of strings"""
        new_dict = {}
        for arg in args:
            if "=" in arg:
                kvp = arg.split('=', 1)
                key = kvp[0]
                value = kvp[1]
                if value[0] == value[-1] == '"':
                    value = shlex.split(value)[0].replace('_', ' ')
                else:
                    try:
                        value = int(value)
                    except:
                        try:
                            value = float(value)
                        except:
                            continue
                new_dict[key] = value
        # print("parsed args:", new_dict)
        return new_dict

    def do_create(self, arg):
        """Creates a new instance of a class"""
        args = arg.split()
        if len(args) == 0:
            print("** class name missing **")
            return False
        if args[0] in classes:
            new_dict = self._key_value_parser(args[1:])
            if args[0] == "Course":
                if "subject_id" not in new_dict:
                    print("** no subject_id **")
                    return
                if "instructor_id" not in new_dict:
                    print("** no instructor_id")
                    return
                else:
                    subject = models.storage.get(Subject, new_dict["subject_id"])
                    instructor = models.storage.get(Instructor, new_dict["instructor_id"])
                    if subject is None:
                        print("** subject not found in dababase **")
                        return
                    if instructor is None:
                        print("** instructor not found in database **")
                        return
                    instance = Course(**new_dict)
                    inst_c_instance = InstructorCourses(instructor_id= instructor.id,
                                                        course_id=instance.id)

                    subject.courses.append(instance)
                    instance.instructor_courses.append(inst_c_instance)      
                    instructor.instructor_courses.append(inst_c_instance)          
            else:    
                instance = classes[args[0]](**new_dict)
        else:
            print("** class doesn't exist **")
            return False
        print(instance.id)
        instance.save()
        # models.storage.relationship_manager(instance)

    def do_show(self, arg):
        """Prints an instance as a string based on the class and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
            return False
        if args[0] in classes:
            if len(args) > 1:
                key = args[0] + "." + args[1]
                if key in models.storage.all():
                    print(models.storage.all()[key])
                else:
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")

    def do_destroy(self, arg):
        """Deletes an instance based on the class and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
        elif args[0] in classes:
            if len(args) > 1:
                
                obj = models.storage.get(classes[args[0]], args[1])
                if obj is not None:
                    models.storage.delete(obj)
                    models.storage.save()
                else:
                    print("** no instance found **")

                # key = args[0] + "." + args[1]
                # if key in models.storage.all():
                #     models.storage.all().pop(key)
                #     models.storage.save()
                # else:
                #     print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")

    def do_all(self, arg):
        """Prints string representations of instances"""
        args = shlex.split(arg)
        obj_list = []
        if len(args) == 0:
            obj_dict = models.storage.all()
        elif args[0] in classes:
            obj_dict = models.storage.all(classes[args[0]])
        else:
            print("** class doesn't exist **")
            return False
        for key in obj_dict:
            obj_list.append(str(obj_dict[key]))
        print("[", end="")
        print(", ".join(obj_list), end="")
        print("]")

    def do_update(self, arg):
        """Updates an instance based on the class name, id, and attributes"""
        args = shlex.split(arg)
        print("Input args:", args)  # Debug print
        if len(args) < 3:
            print("** incomplete command **")
            return False

        class_name = args[0]
        if class_name not in classes:
            print(f"** class '{class_name}' doesn't exist **")
            return False

        obj_id = args[1]
        obj = models.storage.get(classes[class_name], obj_id)
        if obj is None:
            print(f"** no instance found with id '{obj_id}' for class '{class_name}' **")
            return False

        # Extract key-value pairs from the argument list
        attributes = {}
        for arg in args[2:]:
            if "=" in arg:
                kvp = arg.split('=', 1)
                key = kvp[0]
                value = kvp[1].strip('"')
                attributes[key] = value

        # print("Parsed attributes:", attributes)  # Debug print
        for k, v in attributes.items():
            setattr(obj, k, v)
        models.storage.save()

        print(f"** instance '{obj_id}' updated **")

    def do_enroll(self, arg):
        """ Enrolls a student in a course
            enroll <student_id> <course_id>
        """
        args = shlex.split(arg)
        if len(args) < 2:
            print("** missing ids/ Usage :enroll <student_id> <course_id>**")
            return
        
        student = models.storage.get(Student, args[0])
        course = models.storage.get(Course, args[1])
        if student is None and course is None:
            print("** Student instance and Course instance\
not found Usage : enroll <student_id> <course_id>**")
            return
        if student is None:
            print("** Student instance not found Usage :\
enroll <student_id> <course_id>**")
            return
        
        if course is None:
            print("** Course instance not found Usage :\
enroll <student_id> <course_id>**")
            return
        
        enrollment = StudentCourses(student_id=student.id, course_id=course.id)
        models.storage.new(enrollment)
        models.storage.save()
        course.student_courses.append(enrollment)
        student.student_courses.append(enrollment)
        # course.students.append(student)
        models.storage.save()
        

if __name__ == '__main__':
    EDUCommand().cmdloop()

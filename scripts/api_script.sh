#!/bin/bash

# Set the base URL for the Flask app
BASE_URL="http://localhost:5003"

# Function to extract ID from JSON response
extract_id() {
    grep -o '"id": *"[^"]*"' | grep -o '"[^"]*"$' | tr -d '"'
}

echo " Creating models using POST method..."

# Make POST requests and extract IDs directly
subject_id=$(curl -s -X POST -H "Content-Type: application/json" -d '{"name": "New Subject"}' "${BASE_URL}/subjects" | extract_id)
instructor_id=$(curl -s -X POST -H "Content-Type: application/json" -d '{"first_name": "New Instructor"}' "${BASE_URL}/instructors" | extract_id)
student_id=$(curl -s -X POST -H "Content-Type: application/json" -d '{"first_name": "New Student"}' "${BASE_URL}/students/register" | extract_id)
course_id=$(curl -s -X POST -H "Content-Type: application/json" -d '{"title": "New Course", "subject_id": "'"$subject_id"'", "instructor_id": "'"$instructor_id"'"}' "${BASE_URL}/courses/${subject_id}/${instructor_id}" | extract_id)


# Print the extracted IDs
echo "Subject ID: $subject_id"
echo "Instructor ID: $instructor_id"
echo "Student ID: $student_id"
echo "Course ID: $course_id"

echo "------------------------------------------------------"
curl -X GET "${BASE_URL}/subjects/${subject_id}"
echo "------------------------------------------------------"
curl -X GET "${BASE_URL}/instructors/${instructor_id}"
echo "------------------------------------------------------"
curl -X GET "${BASE_URL}/students/${student_id}"
echo "------------------------------------------------------"
curl -X GET "${BASE_URL}/courses/${course_id}"
echo "------------------------------------------------------"

# Test PUT endpoints with selected IDs

curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Subject"}' "${BASE_URL}/subjects/${subject_id}"

echo "------------------------------------------------------"
curl -X PUT -H "Content-Type: application/json" -d '{"first_name": "Updated Instructor"}' "${BASE_URL}/instructors/${instructor_id}"
echo "------------------------------------------------------"
curl -X PUT -H "Content-Type: application/json" -d '{"first_name": "Updated Student"}' "${BASE_URL}/students/${student_id}"
echo "------------------------------------------------------"
curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Course"}' "${BASE_URL}/courses/${course_id}"
echo "------------------------------------------------------"

# >------------ Testing relationships -------------<
#Enroll and unenroll test 
echo "----------Testing enrolling-----------------"
curl -s -X POST ${BASE_URL}/courses/${course_id}/enroll/${student_id}


read -p "Do you want to unenroll the student? [yes/no]: " confirm_delete
if [[ "$confirm_delete" == "yes" ]]; then
    echo "Unenrolling student..."
    curl -s -X POST ${BASE_URL}/courses/${course_id}/unenroll/${student_id}

    curl -X GET "${BASE_URL}/students/${student_id}"
    echo "------------------------------------------------------"
fi
# Prompt user for confirmation
read -p "Do you want to delete the resources [yes/no]: " confirm_delete

# Check user input and execute DELETE requests if user confirms
if [[ "$confirm_delete" == "yes" ]]; then
    echo "Deleting resources..."
    curl -X DELETE "${BASE_URL}/courses/${course_id}"
    echo "------------------------------------------------------"
    curl -X DELETE "${BASE_URL}/subjects/${subject_id}"
    echo "------------------------------------------------------"
    curl -X DELETE "${BASE_URL}/instructors/${instructor_id}"
    echo "------------------------------------------------------"
    curl -X DELETE "${BASE_URL}/students/${student_id}"
    echo "----------------------------------------------------"
    
    
else
    echo "No resources will be deleted."
fi



$body = @{
    studentId = "STU001"
    firstName = "John"
    lastName = "Doe"
    email = "john@university.edu"
    phone = "+1234567890"
    course = "Computer Science"
    year = 1
    address = "123 Main St"
    gender = "Male"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri 'http://localhost:5000/api/students' -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing
$response.Content

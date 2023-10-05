
# Student Result Management System

The Student Result Management System is a web application developed using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB. It provides a platform for students and teachers to manage student records and view results.

## Key Features

### User Authentication and Authorization

- Students can register using their name, email, password, and role (Student).
- Teacher accounts have pre-seeded credentials fetched from environment variables.
- Role-based access control ensures restricted access to specific pages.

### Student Registration and Login

- New users can register with their name, email, password, and role (Student).
- Registered students can log in using their credentials.

### Teacher Login

- Teacher credentials (email and password) are securely pre-seeded and loaded from environment variables for authentication.

### Student Result Lookup

- Students can easily search for their results using their roll number and date of birth.
- Results include the student's name, roll number, date of birth, semester, and score.

### Teacher Record Management

- Teachers can efficiently manage student records by adding, updating, and deleting records.
- Teacher credentials are pre-seeded and securely stored using password hashing.

## Technologies Used

The Student Result Management System is built using the following technologies:

- HTML/CSS: Standard web technologies used for designing and styling the user interface.
- JavaScript: The programming language used for front-end interactivity.
- Node.js: JavaScript runtime for server-side development.
- Express.js: Web framework for routing and handling HTTP requests.
- MongoDB: A NoSQL database for storing student records and user data.
- bcrypt: A library for password hashing and security.
- JWT (JSON Web Tokens): Used for user authentication and role-based access control.

## Getting Started

To get started with the Student Result Management System, follow these steps:

1. Clone the project repository from GitHub.
2. If Node.js is not already installed, install it.
3. Configure environment variables by creating a `.env` file in the project root.
4. Install project dependencies using `npm install`.
5. Start the server with `npm start`.
6. Access the application in a web browser at `http://localhost:3000`.

## Usage

Here's how you can use the application:

- Register as a student with a unique email and password.
- Log in as a registered student or teacher.
- Easily search for your results using your roll number and date of birth.
- Teachers can efficiently manage student records by adding, updating, and deleting records.

## Author

The Student Result Management System was developed by Manish. If you have any further questions or require assistance, please feel free to reach out.

---
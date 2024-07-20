# Money Lending App

This project is a backend for a money lending application similar to apps like Slice and KreditBee.

## APIs

### 1. Approve Application During Signup
- **Endpoint:** POST `/signup`
- **Functionality:** Approves or rejects the application based on user age and monthly salary, and registers the user after verification.
![image](https://github.com/user-attachments/assets/46d04f64-99e7-43c3-bcc9-8f97f7cd051a)

### 2. Login API
- **Endpoint:** POST `/login`
- **Functionality:** Allows the user to login using email and password. Uses JWT for authentication.
![image](https://github.com/user-attachments/assets/f57e43d3-1ba3-45fc-a44d-044dcf7f353b)

### 3. Show User Data
- **Endpoint:** GET `/user`
- **Functionality:** Shows user data including **Purchase Power amount(as not mentioned taken default as salary)**, phone number, email, date of user registration, DOB, and monthly salary.
![image](https://github.com/user-attachments/assets/cb084e9b-49ab-41aa-a0ef-87e570d38d78)

### 4. Borrow Money API
- **Endpoint:** POST `/borrow`
- **Functionality:** Allows the user to borrow money, updates the Purchase Power amount, calculates the tenure of repayments and the monthly repayments with an interest rate of 8%, and returns the updated Purchase Power amount and the monthly repayment amount.
![image](https://github.com/user-attachments/assets/bcff134d-195b-4781-b183-c49a0dbc1219)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sauravgr18/money-lending-app
   cd money-lending-app
   

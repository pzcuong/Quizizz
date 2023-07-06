## API Specification <!-- omit in toc -->
- [1. Register](#1-register)
- [2. Login](#2-login)
- [3. Get me](#3-get-me)
- [4. Refresh token](#4-refresh-token)
- [5. Logout](#5-logout)
- [6. Confirm email](#6-confirm-email)
- [7. Resend verification token](#7-resend-verification-token)
- [8. Forgot password](#8-forgot-password)
- [9. Reset password](#9-reset-password)


### 1. Register

```
POST /api/auth/register
```

Description: Register a new user with email, username, and password and send verification token to email registered.

Request body:

```
{
    "displayName": "Ngo Gia Phong",
    "email": "phong.ngo123@hcmut.edu.vn",
    "password": "12345678",
    "confirmPassword": "12345678"
}
```

Request body constraints:

| Field           | Type   | Constraints                              |
| --------------- | ------ | ---------------------------------------- |
| email           | string | Must be email format                     |
| password        | string | Must be between 8 and 20 characters long |
| confirmPassword | string | Must be between 8 and 20 characters long |
| displayName     | string | Must be between 3 and 20 characters long |

Optional query parameters: None

Response body:

```
{
    "statusCode": 201,
    "message": "Registered successfully, please check  verification link in your email",
    "data": null
}
```

Response codes:
| S tatus Code | Message | Description |
| ------------- | ------------------------------------------------ | ---------------------------------------------- |
| 201 | Registered successfully, please check verification link in your email | Register successfully, sent verification link to registered email |
400 | Validation failed | Validate request body with constraints and throw any errors if any |
400 | Password do not match confirm password | Password and confirm password don't match |
400 | User with this email already exists, please confirm your email | User with this email already exists and account is not activated |
400 | User with this email already exists, please login | User with this email already exists and account is activated |

### 2. Login

```
POST /api/auth/login
```

Description: Login with email and password

Request body:

```
{
    "email" : "phong.ngo123@hcmut.edu.vn",
    "password": "12345678"
}
```

Request body constraints:

| Field    | Type   | Constraints                              |
| -------- | ------ | ---------------------------------------- |
| email    | string | Must be email format                     |
| password | string | Must be between 8 and 20 characters long |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMzIxQGdtYWlsLmNvbSIsImlkIjoiY2xqcXZrMDhlMDAwMHNibDBpaHA4aTgzbCIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTE1MjYsImV4cCI6MTY4ODY1MTUzNn0.CfsH4jyZ84qr39YJoBjAYvjOqOyNxqQUPEn7weQrW80",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMzIxQGdtYWlsLmNvbSIsImlkIjoiY2xqcXZrMDhlMDAwMHNibDBpaHA4aTgzbCIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTE1MjYsImV4cCI6MTY4ODczNzkyNn0.OFZu2r3WQqaH8CTAaR9SZJxpg2yGHz7vzOSyfresoo0",
        "user": {
            "id": "cljqvk08e0000sbl0ihp8i83l",
            "email": "ngogiaphong321@gmail.com",
            "displayName": "Ngo Gia Phong",
            "avatar": "https://cdn.discordapp.com/attachments/1126321375330697278/1126337877240971304/kisspng-ninja-computer-icons-avatar-samurai-angle-5b4790f6c39891.png",
            "role": "user",
            "status": 1
        }
    }
}
```

Response codes:

| Status Code | Message                                                  | Description                                                          |
| ----------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| 200         | User logged in successfully                              | Login successfully, return access token, refresh token and user info |
| 400         | Validation failed                                        | Validate request body with constraints and throw any errors if any   |
| 400         | Your account is not activated, please confirm your email | User with this email already exists and account is not activated     |
| 400         | Invalid credentials                                      | Invalid email or password                                            |

### 3. Get me

```
GET /api/auth/me
```

Description: Get user info

Authorization: Bearer token

Request body: None

Request body constraints: None

Optional query parameters: None

Response body:

```
{
    "statusCode": 200,
    "message": "User retrieved successfully",
    "data": {
        "email": "ngogiaphong321@gmail.com",
        "id": "cljqvk08e0000sbl0ihp8i83l",
        "role": "user",
        "displayName": "Ngo Gia Phong",
        "avatar": "https://cdn.discordapp.com/attachments/1126321375330697278/1126337877240971304/kisspng-ninja-computer-icons-avatar-samurai-angle-5b4790f6c39891.png",
        "status": 1,
        "iat": 1688651526,
        "exp": 1688651536
    }
}
```

Response codes:

| Status Code | Message                     | Description                |
| ----------- | --------------------------- | -------------------------- |
| 200         | User retrieved successfully | Get user info successfully |
| 401         | Unauthorized                | Access token is expired    |
| 401         | Unauthorized                | No token is sent           |

### 4. Refresh token

```
POST /api/auth/refresh
```

Description: Refresh access token with refresh token

Request body :

```
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTIwMzMsImV4cCI6MTY4ODczODQzM30.GVJ6zjHboMBeicJUgvX86bbt43fmi15kkVKKsNv8bW8"
}
```

Request body constraints:

| Field        | Type   | Constraints       |
| ------------ | ------ | ----------------- |
| refreshToken | string | Must be not empty |

Optional query parameters: None

Response body :

```
{
    "statusCode": 201,
    "message": "Tokens refreshed successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMzIxQGdtYWlsLmNvbSIsImlkIjoiY2xqcXZrMDhlMDAwMHNibDBpaHA4aTgzbCIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTE2MzEsImV4cCI6MTY4ODY1MTY0MX0.7_N_AWEAobeoLcu3uG2E2rXZR2la8_TkvmEvYAMBawc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMzIxQGdtYWlsLmNvbSIsImlkIjoiY2xqcXZrMDhlMDAwMHNibDBpaHA4aTgzbCIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTE2MzEsImV4cCI6MTY4ODczODAzMX0.sgWLjE7sUce5_0dakY7oWs0-SXFMjFv_FPdn8GdsPCM"
    }
}
```

Response codes:

| Status Code | Message                       | Description                                                        |
| ----------- | ----------------------------- | ------------------------------------------------------------------ |
| 201         | Tokens refreshed successfully | Refresh token successfully                                         |
| 400         | Validation failed             | Validate request body with constraints and throw any errors if any |
| 400         | Invalid token                 | Refresh token is invalid                                           |

### 5. Logout

```
POST /api/auth/logout
```

Description: User logout

Authorization: Bearer token

Request body: None

Request body constraints: None

Optional query parameters: None

Response body:

```
{
    "statusCode": 200,
    "message": "User logged out successfully",
    "data": {
        "accessToken": "",
        "refreshToken": ""
    }
}
```

Response codes:

| Status Code | Message                      | Description             |
| ----------- | ---------------------------- | ----------------------- |
| 200         | User logged out successfully | Logout successfully     |
| 401         | Unauthorized                 | Access token is expired |
| 401         | Unauthorized                 | No token is sent        |

### 6. Confirm email

```
POST /api/auth/confirm
```

Description: Confirm email with verification token

Request body :

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGpyN2ExdTQwMDAwc2JudWZmYWtmcHpzIiwiaWF0IjoxNjg4NjUyMDE5LCJleHAiOjE2ODg2NTIwMzl9.1LtJvtcZPbHzsPffDbcGz66pf3cjGz98WCM9IvkLw08"
}
```

Request body constraints:

| Field | Type   | Constraints       |
| ----- | ------ | ----------------- |
| token | string | Must be not empty |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "Verify account successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTIwMzMsImV4cCI6MTY4ODY1MjA0M30.fXesrkZc8wTTVG8K0jFNw9USICbib9MZZDxTYoyNYHc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTIwMzMsImV4cCI6MTY4ODczODQzM30.GVJ6zjHboMBeicJUgvX86bbt43fmi15kkVKKsNv8bW8",
        "user": {
            "id": "cljr7a1u40000sbnuffakfpzs",
            "email": "ngogiaphong123@gmail.com",
            "displayName": "Ngo Gia Phong",
            "avatar": "https://cdn.discordapp.com/attachments/1126321375330697278/1126337877240971304/kisspng-ninja-computer-icons-avatar-samurai-angle-5b4790f6c39891.png",
            "role": "user",
            "status": 1
        }
    }
}
```

Response codes:

| Status Code | Message           | Description                                                        |
| ----------- | ----------------- | ------------------------------------------------------------------ |
| 200         | Verify account    | Verify account successfully                                        |
| 400         | Validation failed | Validate request body with constraints and throw any errors if any |
| 400         | Invalid token     | Token is invalid                                                   |

### 7. Resend verification token

```
POST /api/auth/resend-confirmation
```

Description: Resend verification token to email registered

Request body :

```
{
    "email" : "ngogiaphong13@gmail.com"
}
```

Request body constraints:

| Field | Type   | Constraints       |
| ----- | ------ | ----------------- |
| email | string | Must be not empty |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "Verification link sent successfully",
    "data": null
}
```

Response codes:

| Status Code | Message                             | Description                                                        |
| ----------- | ----------------------------------- | ------------------------------------------------------------------ |
| 200         | Verification link sent              | Verification link sent successfully                                |
| 400         | Validation failed                   | Validate request body with constraints and throw any errors if any |
| 400         | User with this email does not exist | User with this email not found                                     |
| 400         | Email already confirmed             | User with this email already exists and account is activated       |

### 8. Forgot password

```
POST /api/auth/forgot-password
```

Description: Send reset password link to email registered

Request body :

```
{
    "email": "ngogiaphon23@gmail.com"
}
```

Request body constraints:

| Field | Type   | Constraints       |
| ----- | ------ | ----------------- |
| email | string | Must be not empty |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "Reset password link sent successfully",
    "data": null
}
```

Response codes:

| Status Code | Message                                               | Description                                                        |
| ----------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| 200         | Reset password link sent                              | Reset password link sent successfully                              |
| 400         | Validation failed                                     | Validate request body with constraints and throw any errors if any |
| 400         | User with this email does not exist                   | User with this email not found                                     |
| 400         | Your account is not active, please confirm your email | User with this email already exists and account is not activated   |

### 9. Reset password

```
POST /api/auth/reset-password
```

Description: Reset password with reset password token

Request body :

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGpyN2ExdTQwMDAwc2JudWZmYWtmcHpzIiwiaWF0IjoxNjg4NjUyNzA4LCJleHAiOjE2ODg2NTI3Mjh9.hfUnu2aZIQxuje8vSs-QdPd6fZdZjlX0iA3qjRQgQj0",
    "password":"12345789",
    "confirmPassword":"123456789"
}
```

Request body constraints:

| Field           | Type   | Constraints                              |
| --------------- | ------ | ---------------------------------------- |
| token           | string | Must be not empty                        |
| password        | string | Must be between 8 and 20 characters long |
| confirmPassword | string | Must be between 8 and 20 characters long |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "Password reset successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTI2OTAsImV4cCI6MTY4ODY1MjcwMH0.HzXAg2aMLQKuupwiS8hMkbBaNJtBHjqnqRywRbDkZZw",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTI2OTAsImV4cCI6MTY4ODczOTA5MH0.vQjJSS3DJh1s9w8Se7gALSDxe6RiLFl30KUBPerD0dM",
        "user": {
            "id": "cljr7a1u40000sbnuffakfpzs",
            "email": "ngogiaphong123@gmail.com",
            "displayName": "Ngo Gia Phong",
            "avatar": "https://cdn.discordapp.com/attachments/1126321375330697278/1126337877240971304/kisspng-ninja-computer-icons-avatar-samurai-angle-5b4790f6c39891.png",
            "role": "user",
            "status": 1
        }
    }
}
```

Response codes:

| Status Code | Message                                | Description                                                        |
| ----------- | -------------------------------------- | ------------------------------------------------------------------ |
| 200         | Password reset successfully            | Password reset successfully                                        |
| 400         | Validation failed                      | Validate request body with constraints and throw any errors if any |
| 400         | Invalid token                          | Token is invalid                                                   |
| 400         | Password do not match confirm password | Password and confirm password don't match                          |

For setup Electon Server project with MongoDB follow this,

```javascript
npm install
npm init -y
npx tsc --init

```


#### And find the tsconfig file where have rootDir and outDir.set the rootDir for

```
"rootDir": "./src"

and

"outDir": "./dist"

```

connect the project with database in env file

1. your name
2. password
   3.project name

### Generate random secret key

```
node
require('crypto').randomBytes(64).toString('hex')
```
##Authentication 
### **1. User Registration**

- **Endpoint:** **` POST /auth/register**
- **Request Body:**

```json
{
  "firstName": "Mehedi",
  "lastName": "Hasan",
  "age": 25,
  "password": "123456",
  "email": "mehedihasan@gmail.com",
  "gender": "male",
  "phoneNumber": "01234567890",
  "image": "https://example.com/profile.jpg"

}

```

- **Response**:

```json
{
    "success": true,
    "message": "User Registered successfully!",
    "data": {
        "data": {
            "firstName": "Mehedi",
            "lastName": "Hasan",
            "image": "https://example.com/profile.jpg",
            "gender": "male",
            "password": "",
            "age": 25,
            "email": "mehedihasan@gmail.com",
            "phoneNumber": "01234567890",
            "description": "Describe your self...",
            "role": "user",
            "auth2": false,
            "friends": [],
            "status": "active",
            "_id": "677411ee49d605e7ce420f98",
            "createdAt": "2024-12-31T15:46:55.024Z",
            "updatedAt": "2024-12-31T15:46:55.024Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1laGVkaWhhc2FuQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwidXNlcklkIjoiNjc3NDExZWU0OWQ2MDVlN2NlNDIwZjk4IiwiaWF0IjoxNzM1NjYwMDE1LCJleHAiOjE3MzY5NTYwMTV9.AZ6G6KOkJgRpg1jG5CK5n4RNBTxKZbH_HaCvJ78E3DI",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1laGVkaWhhc2FuQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwidXNlcklkIjoiNjc3NDExZWU0OWQ2MDVlN2NlNDIwZjk4IiwiaWF0IjoxNzM1NjYwMDE1LCJleHAiOjE3MzgyNTIwMTV9.tOtLsBmEml_B1YRS_H-zUyTy6w8MLURG_FWQNZpwUeo"
    }
}

```

### **2. User Login**

- **Endpoint:** **`POST /auth/login`**
- **Request Body:**

```json
{
"password":"123456",
  "email": "mehedihasan@gmail.com"
}

```

- **Response:**

```json
{
    "success": true,
    "message": "Logged in successfully!",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1laGVkaWhhc2FuQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwidXNlcklkIjoiNjc3NDExZWU0OWQ2MDVlN2NlNDIwZjk4IiwiaWF0IjoxNzM1NjYwMDcxLCJleHAiOjE3MzY5NTYwNzF9.3vQX5BB35Se1sLl0fruifsWCGDkCIRVIHOWy8LAt_ec"
    }
}

```
- **If password mismatch**
- **Response**

```json

{
    "success": false,
    "message": "Password incorrect!",
    "errorSources": [
        {
            "path": "",
            "message": "Password incorrect!"
        }
    ],
    "err": {
        "statusCode": 401
    },
    "stack": "Error: Password incorrect!\n    at D:\\Programming\\Projects\\Electon_server\\src\\app\\modules\\auth\\auth.services.ts:29:10\n    at Generator.next (<anonymous>)\n    at fulfilled (D:\\Programming\\Projects\\Electon_server\\src\\app\\modules\\auth\\auth.services.ts:28:58)"
}

```

### **1. Forgot-Password

- **Endpoint:** **`POST /auth/forgot-password`**
- **Request Body:**

```json

{
  "email": "mehedihasan@gmail.com"
}

```
after entering the email, the email will get a verification URL

- **Response**
- 
```json
{
    "success": true,
    "message": "Check your email!"
}

```
### **1. Edit-Profile

- **Endpoint:** **`POST /user/editProfile`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "name":"Mehedi Hasan"
}
```

- **Response**
- 
```json
{
    "success": true,
    "message": "profile updated!",
    "data": {
        "id": "153bc206-166d-4509-89b4-03992dadaafb",
        "username": "abir",
        "email": "abir2@gmail.com",
        "profilePhoto": null,
        "role": "USER",
        "needPasswordChange": true,
        "status": "ACTIVE",
        "createdAt": "2024-06-23T19:17:39.266Z",
        "updatedAt": "2024-06-23T19:17:39.266Z"
    }
}

```



### **3. Block  User**

- **Endpoint:** **`POST /user/<userId>/status`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "status":"BLOCKED"
}
```
- **Response**

```json
{
    "success": true,
    "message": "Users profile status changed!",
    "data": {
        "id": "0d85b042-da8a-4356-9a0d-1bd001e01375",
        "username": "ariana",
        "email": "ariana@gmail.com",
        "password": "$2b$12$zrMjZ4phkYFg8d7vhB0fFeapNGTr441jVXU2Ux5l4RXvLZpG3C/ba",
        "profilePhoto": null,
        "role": "USER",
        "needPasswordChange": true,
        "status": "BLOCKED",
        "createdAt": "2024-05-24T22:33:23.585Z",
        "updatedAt": "2024-06-23T19:53:31.539Z"
    }
}
```

### **3. Convert  User to Admin**

- **Endpoint:** **`POST /user/<userId>/role`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "role":"ADMIN"
}
```
- **Response:**
  
```json
{
    "success": true,
    "message": "Users profile role changed!",
    "data": {
        "id": "0d85b042-da8a-4356-9a0d-1bd001e01375",
        "username": "ariana",
        "email": "ariana@gmail.com",
        "profilePhoto": null,
        "role": "ADMIN",
        "needPasswordChange": true,
        "status": "ACTIVE",
        "createdAt": "2024-05-24T22:33:23.585Z",
        "updatedAt": "2024-06-23T19:57:13.898Z"
    }
}
```

### **3. Add a Flat**

- **Endpoint:** **`POST /api/create-flat`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
  "location": "123 Main St, Springfield",
  "description": "A cozy two-bedroom apartment in the city center.",
  "rentAmount": 1200.0,
  "bedrooms": 2,
  "amenities": ["Wi-Fi", "Air Conditioning", "Heating", "Washer/Dryer"],
  
    "photos": [
      {
        "id": "c1d1e1f1-1111-1111-1111-111111111111",
        "imageUrl": "https://example.com/photo1.jpg"
      },
      {
        "id": "d2e2f2g2-2222-2222-2222-222222222222",
        "imageUrl": "https://example.com/photo2.jpg"
      }
    ]
  
}

```

- **Response:**

```json
{
    "success": true,
   "statuscode":200,
    "message": "Flat created successfully",
    "data": {
        "id": "ab19159a-5af5-45d1-ad41-49b033454942",
        "location": "123 Main St, Springfield",
        "description": "A cozy two-bedroom apartment in the city center.",
        "rentAmount": 1200,
        "bedrooms": 2,
        "amenities": [
            "Wi-Fi",
            "Air Conditioning",
            "Heating",
            "Washer/Dryer"
        ],
        "createdAt": "2024-06-23T19:29:05.097Z",
        "updatedAt": "2024-06-23T19:29:05.097Z",
        "userId": "153bc206-166d-4509-89b4-03992dadaafb",
        "photos": [
            {
                "id": "b0ed987e-aede-4eb2-9912-cd5eb876d3a9",
                "imageUrl": "https://example.com/photo1.jpg",
                "flatId": "ab19159a-5af5-45d1-ad41-49b033454942"
            },
            {
                "id": "ffce852a-cffd-4f48-bf8d-626b5fe3d5eb",
                "imageUrl": "https://example.com/photo2.jpg",
                "flatId": "ab19159a-5af5-45d1-ad41-49b033454942"
            }
        ]
    }
}
```


### **3. Update any Flat as a Admin**

- **Endpoint:** **`POST /flat/updateFLat/anyFlatID`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
  "location": "1230 Main St, Patuakhali"
}

```

- **Response:**

```json
{
    "success": true,
    "statuscode":200,
    "message": "FLat data updated!",
    "data": {
        "id": "155edef1-f393-4a17-befe-ab9c418889cb",
        "location": "1230 Main St, Patuakhali",
        "description": "A lovely two-bedroom flat in the heart of the city. It offers a spacious living area, modern kitchen, and a beautiful view of the park.",
        "rentAmount": 10,
        "bedrooms": 3,
        "amenities": [
            "wifi",
            "parking",
            "pool",
            "gym",
            "air conditioning"
        ],
        "createdAt": "2024-06-04T09:00:13.074Z",
        "updatedAt": "2024-06-23T19:59:12.402Z",
        "userId": "05c9f3ca-f9a0-4541-ad9b-e648dac0c796"
    }
}
```
### **3. Update your Flat**

- **Endpoint:** **`POST /flat/updateMyFLat/anyFlatID`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
  "location": "1230 Main St, Patuakhali"
}

```

- **Response:**

```json
{
    "success": true,
    "statuscode":200,
    "message": "FLat data updated!",
    "data": {
        "id": "155edef1-f393-4a17-befe-ab9c418889cb",
        "location": "1230 Main St, Patuakhali",
        "description": "A lovely two-bedroom flat in the heart of the city. It offers a spacious living area, modern kitchen, and a beautiful view of the park.",
        "rentAmount": 10,
        "bedrooms": 3,
        "amenities": [
            "wifi",
            "parking",
            "pool",
            "gym",
            "air conditioning"
        ],
        "createdAt": "2024-06-04T09:00:13.074Z",
        "updatedAt": "2024-06-23T19:59:12.402Z",
        "userId": "05c9f3ca-f9a0-4541-ad9b-e648dac0c796"
    }
}
```

### **3. Delete your Flat**

- **Endpoint:** **`POST /flat/deleteFlat/anyFlatID`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

```json
{
    "success": true,
    "statuscode":200,
    "message": "FLat Deleted successfully!",
    "data": {
        "count": 3
    }
}
```
### **3. get single  Flat**

- **Endpoint:** **`POST /flat/getSingleFlat/anyFlatID`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

```json
{
    "success": true,
    "statuscode":200,
    "message": "Flat retrieval successfully",
    "data": {
        "id": "1a78360f-d67e-4a0f-827b-a74f59fe4ffb",
        "location": "Dhaka",
        "description": "A modern 2-bedroom apartment located in the heart of the city. This spacious flat offers an open-plan living area with large windows that provide plenty of natural light. The fully equipped kitchen includes state-of-the-art appliances, perfect for those who love to cook. Both bedrooms feature built-in wardrobes and en-suite bathrooms. Additional amenities include a private balcony, secure underground parking, and access to a communal gym and pool.",
        "photos": [
            {
                "id": "2e678441-4094-4999-95b6-5eeaf1537282",
                "imageUrl": "https://i.ibb.co/fD1ssgJ/istockphoto-488120139-612x612.jpg",
                "flatId": "1a78360f-d67e-4a0f-827b-a74f59fe4ffb"
            },
            {
                "id": "9bec1b6a-fd2f-4896-8287-1a11b0f95dcf",
                "imageUrl": "https://i.ibb.co/HCx0Vkz/istockphoto-522540838-612x612.jpg",
                "flatId": "1a78360f-d67e-4a0f-827b-a74f59fe4ffb"
            },
            {
                "id": "250a0f61-8fcd-46fd-8599-b99c4bd05fa1",
                "imageUrl": "https://i.ibb.co/dMrLr0N/istockphoto-879931076-612x612.jpg",
                "flatId": "1a78360f-d67e-4a0f-827b-a74f59fe4ffb"
            }
        ],
        "rentAmount": 5000,
        "bedrooms": 5,
        "amenities": [
            "gym"
        ],
        "userId": "05c9f3ca-f9a0-4541-ad9b-e648dac0c796",
        "createdAt": "2024-06-04T20:01:02.015Z",
        "updatedAt": "2024-06-04T20:01:02.015Z"
    }
}
```

### **3. get All  Flats as an Admin with search query**

- **Endpoint:** **`POST /flat/get-all-flats?bedrooms=20&location=&priceMin=0&priceMax=1000000`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

```json
{
    "success": true,
    "message": "Flats retrieval successfully",
    "meta": {
        "total": 15,
        "page": 1,
        "limit": 10
    },
    "data": [
        {
            "id": "ab19159a-5af5-45d1-ad41-49b033454942",
            "location": "123 Main St, Springfield",
            "description": "A cozy two-bedroom apartment in the city center.",
            "rentAmount": 1200,
            "bedrooms": 2,
            "amenities": [
                "Wi-Fi",
                "Air Conditioning",
                "Heating",
                "Washer/Dryer"
            ],
            "createdAt": "2024-06-23T19:29:05.097Z",
            "updatedAt": "2024-06-23T19:29:05.097Z",
            "userId": "153bc206-166d-4509-89b4-03992dadaafb",
            "photos": [
                {
                    "id": "b0ed987e-aede-4eb2-9912-cd5eb876d3a9",
                    "imageUrl": "https://example.com/photo1.jpg",
                    "flatId": "ab19159a-5af5-45d1-ad41-49b033454942"
                },
                {
                    "id": "ffce852a-cffd-4f48-bf8d-626b5fe3d5eb",
                    "imageUrl": "https://example.com/photo2.jpg",
                    "flatId": "ab19159a-5af5-45d1-ad41-49b033454942"
                }
            ],
            "user": {
                "id": "153bc206-166d-4509-89b4-03992dadaafb",
                "username": "abir",
                "email": "abir2@gmail.com",
                "profilePhoto": null,
                "role": "USER",
                "needPasswordChange": true,
                "status": "ACTIVE"
            }
        }.....
```






















If you want to use my API then you might be got the error 
```json
{
    "success": false,
    "message": "Can't reach database server at `aws-0-ap-southeast-1.pooler.supabase.com`:`5432`\n\nPlease make sure your database server is running at `aws-0-ap-southeast-1.pooler.supabase.com`:`5432`.",
    "error": {
        "name": "PrismaClientInitializationError",
        "clientVersion": "5.11.0",
        "errorCode": "P1001"
    }
}
```
Because the project has deployed supabase in a free version that's why the database will be closed after 15 days. If you fetch the problem then send me an email in mmehedihasanjov@gmail.com
subject: Turn on your spare room on supabase





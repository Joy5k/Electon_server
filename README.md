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

### Two-step authentication 
- **Endpoint:** **` POST /auth/2fa/setup`**
- **Request Headers:**
      - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json

N/A
  
```

- **Response**
- 
```json
{
    "success": true,
    "message": "Scan this QR code with your authenticator app",
    "data": {
        "message": "Scan this QR code with your authenticator app",
        "qrCode": "data:image/png;base64,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",
        "secret": "MNUDA6ZQIY4WMY2VIVCVEY3SMJETS7LUGYZGCQRGPJADWM3PKFXQ"
    }
}

```

### ** Verify two-step authentication
- **Endpoint:** **` POST /auth/2fa/verify`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "token":"973650"
}

```

- **Response**
- 
```json
{
    "success": true,
    "message": "Users update successfully",
    "data": {
        "secret": {
            "ascii": "ue3lZ({vqn.zU3l*20TU:oq1Igd>nv9!",
            "hex": "7565336c5a287b76716e2e7a55336c2a323054553a6f71314967643e6e763921",
            "base32": "OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ",
            "otpauth_url": "otpauth://totp/Electon%3A%20673d763cc092d2c93364d43e?secret=OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ"
        }
}
}

```

### Verify Error
```json

{
    "data": {
        "verified": false,
        "message": "Invalid token",
        "statusCode": 400
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

```json
{
    "success": true,
    "message": "Check your email!"
}

```

## User-Management

- **Endpoint:** **`POST /user/update`**

- **Request Headers:**

- `Authorization: <Admin/superAdmin JWT_TOKEN>`

- **Request Body:**



- **Response**

```json
{
    "success": true,
    "message": "Users update successfully",
    "data": [{
        "secret": {
            "ascii": "ue3lZ({vqn.zU3l*20TU:oq1Igd>nv9!",
            "hex": "7565336c5a287b76716e2e7a55336c2a323054553a6f71314967643e6e763921",
            "base32": "OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ",
            "otpauth_url": "otpauth://totp/Electon%3A%20673d763cc092d2c93364d43e?secret=OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ"
        },
        "_id": "673d763cc092d2c93364d43e",
        "firstName": "Mehedi",
        "lastName": "Hasan",
        "gender": "male",
        "email": "mehedihasan@gmail.com",
        "description": "Describe your self...",
        "role": "super_admin",
        "auth2": false,
        "friends": [],
        "status": "active",
        "createdAt": "2024-11-20T05:40:12.512Z",
        "updatedAt": "2024-12-31T16:00:14.994Z",
        "__v": 0,
        "image": "https://i.ibb.co/k05htkr/Mehedi-Hasan.png",
        "address": {
            "district": "Patuakhali",
            "division": "Barishal",
            "subDistrict": "Patuakhali Sadar",
            "roadNo": "Tuskhali",
            "postCode": 8888,
            "_id": "67506877c3d78cd8e5557c6a"
        },
        "phoneNumber": "01601588531"
    },........
]
}

```

### **1. Edit-Profile

- **Endpoint:** **` POST /user/update`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "firstName":"Mehedi"
}
```

- **Response**
- 
```json
{
    "success": true,
    "message": "Users update successfully",
    "data": {
        "secret": {
            "ascii": "ue3lZ({vqn.zU3l*20TU:oq1Igd>nv9!",
            "hex": "7565336c5a287b76716e2e7a55336c2a323054553a6f71314967643e6e763921",
            "base32": "OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ",
            "otpauth_url": "otpauth://totp/Electon%3A%20673d763cc092d2c93364d43e?secret=OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ"
        },
        "_id": "673d763cc092d2c93364d43e",
        "firstName": "Mehedi",
        "lastName": "Hasan",
        "gender": "male",
        "email": "mehedihasan@gmail.com",
        "description": "Describe your self...",
        "role": "super_admin",
        "auth2": false,
        "friends": [],
        "status": "active",
        "createdAt": "2024-11-20T05:40:12.512Z",
        "updatedAt": "2024-12-31T16:00:14.994Z",
        "__v": 0,
        "image": "https://i.ibb.co/k05htkr/Mehedi-Hasan.png",
        "address": {
            "district": "Patuakhali",
            "division": "Barishal",
            "subDistrict": "Patuakhali Sadar",
            "roadNo": "Tuskhali",
            "postCode": 8888,
            "_id": "67506877c3d78cd8e5557c6a"
        },
        "phoneNumber": "01601588531"
    }
}

```



### **3. Convert  User to Admin**

- **Endpoint:** **`POST /user/create-admin`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "_id":"670ccf078f20dfc3********"
}
```
- **Response:**
  
```json
{
    "success": true,
    "message": "Admin created Successfully",
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```

### **3. Convert User Role**

- **Endpoint:** **`POST /user/userToSeller`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**
N/A


- **Response:**

```json
{
    "success": true,
    "message": "Role Changed successfully",
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```


### **3. Block user**

- **Endpoint:** **`POST /user/block/userId`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "status":"block"
}

```

- **Response:**

```json
{
    "success": true,
    "message": "user status has been changed",
    "data": {
        "gender": "male",
        "auth2": false,
        "_id": "67016c3b3ed9fe196110d309",
        "firstName": "Mehedi",
        "lastName": "Hasan",
        "age": 25,
        "email": "mehedi@gmail.com",
        "phoneNumber": "01601588531",
        "role": "super_admin",
        "address": {
            "district": "Barisal",
            "division": "Barisal",
            "subDistrict": "",
            "roadNo": "",
            "postCode": 8600,
            "_id": "674808dcfeeef9ec2c53698b"
        },
        "friends": [],
        "status": "blocked",
        "createdAt": "2024-10-05T16:41:31.169Z",
        "updatedAt": "2024-12-31T16:50:54.771Z",
        "__v": 0,
        "image": "https://i.ibb.co/0tzD6XY/men2.jpg",
        "description": "Describe your self..."
    }
}
```

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



### **3. Create your Product**

- **Endpoint:** **`POST /product/create-product`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
 {
    "title": "Desktop",
    "description": "A powerful Desktop for both work and gaming.",
    "image": "https://example.com/images/laptop.jpg",
    "price": 1299.99,
    "quantity": 5,
    "color": ["Silver"],
    "category":"pc",
    "rating": 4.5,
    "sellerId":"67016c3b3ed9fe196110d309"
  }

```

- **Response:**

```json
{
    "success": true,
    "message": "The Product created successfully!",
    "data": {
        "title": "Desktop",
        "description": "A powerful Desktop for both work and gaming.",
        "image": "https://example.com/images/laptop.jpg",
        "color": [
            "Silver"
        ],
        "quantity": 5,
        "category": "pc",
        "price": 1299.99,
        "rating": 4.5,
        "sellerId": "67016c3b3ed9fe196110d309",
        "_id": "677a468eeb969f85fa5934f6",
        "createdAt": "2025-01-05T08:45:02.589Z",
        "updatedAt": "2025-01-05T08:45:02.589Z",
        "__v": 0
    }
}
```

### **3. Delete your Flat**

- **Endpoint:** **`POST /product/delete-product/:product_id`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

{
    "success": true,
    "message": "The Product deleted successfully!",
    "data": {
        "acknowledged": true,
        "deletedCount": 0
    }
}

```
### **3. get single  Product**

- **Endpoint:** **`POST /product/single-product/673f481a477caee0df21c04e`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

```json
{
    "success": true,
    "message": "The Product Retrieved successfully!",
    "data": {
        "_id": "673f481a477caee0df21c04e",
        "title": "Mobile",
        "description": "A powerful Desktop for both work and gaming.",
        "image": "https://i.ibb.co/yR9bnXv/3-1.jpg",
        "color": [
            "Silver"
        ],
        "quantity": 4,
        "price": 1299.99,
        "rating": 4.5,
        "sellerId": "67016c3b3ed9fe196110d309",
        "createdAt": "2024-11-21T14:47:54.693Z",
        "updatedAt": "2024-12-04T15:01:01.133Z",
        "__v": 0,
        "category": "others"
    }
}

```

### **3. get All  Flats as an Admin with search query**

- **Endpoint:** **`POST /product/get-all-products`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

```json
{
    "success": true,
    "message": "Products Retrieved successfully!",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 13,
        "totalPage": 2
    },
    "data": [
        {
            "_id": "677a468eeb969f85fa5934f6",
            "title": "Desktop",
            "description": "A powerful Desktop for both work and gaming.",
            "image": "https://example.com/images/laptop.jpg",
            "color": [
                "Silver"
            ],
            "quantity": 5,
            "category": "pc",
            "price": 1299.99,
            "rating": 4.5,
            "sellerId": "67016c3b3ed9fe196110d309",
            "createdAt": "2025-01-05T08:45:02.589Z",
            "updatedAt": "2025-01-05T08:45:02.589Z"
        },
        {
            "_id": "677a4613eb969f85fa5934ef",
            "title": "Desktop",
            "description": "A powerful Desktop for both work and gaming.",
            "image": "https://example.com/images/laptop.jpg",
            "color": [
                "Silver"
            ],
            "quantity": 5,
            "category": "others",
            "price": 1299.99,
            "rating": 4.5,
            "sellerId": "67016c3b3ed9fe196110d309",
            "createdAt": "2025-01-05T08:43:00.004Z",
            "updatedAt": "2025-01-05T08:43:00.004Z"
        },
        {
            "_id": "67526311cd73361733204aa7",
            "title": "Sony 42' TV",
            "description": "The Sony 42-Inch Smart TV offers a stunning visual experience with its Full HD resolution and X-Reality PRO technology, ensuring vibrant colors and sharp details in every scene. Its sleek and modern design complements any living space, making it an ideal centerpiece for your entertainment needs. With built-in smart features, you can seamlessly stream your favorite shows and movies on platforms like Netflix, YouTube, and Prime Video. The TV also boasts ClearAudio+ technology, delivering immersive and dynamic sound for a captivating viewing experience. Energy-efficient and user-friendly, the Sony 42-Inch Smart TV combines style, performance, and sustainability in one exceptional package.",
            "image": "https://i.ibb.co/hXc7vxz/tv.png",
            "color": [
                "Black",
                "White"
            ],
            "quantity": 56,
            "category": "others",
            "price": 360,
            "sellerId": "673d763cc092d2c93364d43e",
            "createdAt": "2024-12-06T02:36:01.168Z",
            "updatedAt": "2024-12-06T02:36:01.168Z"
        },........
        
    ]
}
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





# **Bicycles Store Backend**

## **Features**

- **Product Management**

  - Add, update, delete, and view products.
  - Tracks inventory and availability.

- **Order Management**

  - Create orders linked to specific products.
  - Automatic inventory adjustment upon order placement.

- **Revenue Calculation**

  - Aggregates total revenue from all orders.

- **Error Handling**

  - Robust error handling for invalid requests or insufficient stock.

- **MongoDB Integration**
  - Secure and scalable database integration.

## **Technologies Used**

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing products and orders.
- **TypeScript**: Ensures type safety in the codebase.
- **Vercel**: Deployment platforms for hosting the backend.

## Installation

### Clone the Repository

Open Terminal

```https
  git clone https://github.com/your-username/bicycles-store-backend.git
```

```https
  cd bicycles-store-backend
```

### Install Dependencies

```https
  npm install
```

### Set Environment Variables

```https
 PORT=3000
 NODE_ENV=development
 MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>
```

### Run the application

```https
 npm run dev
```

## API Endpoints

### Product Management

| Method        | Endpoint             |  Description
| :------------ | :------------------- |  :------------ 
| `POST`        | `/api/products`      |  Create a new product
| `GET`         | `/api/products`      |  Retrieve all products
| `GET`         | `/api/products/:id`  |  Retrieve a single product
| `PUT`         | `/api/products/:id`  |  Update an existing product
| `DELETE`      | `/api/products/:id`  |  Delete a product



### Orders & Revenue Management

| Method        | Endpoint             |  Description
| :------------ | :------------------- |  :------------ 
| `POST`        | `/api/orders`        |  Create a new order
| `GET`         | `/api/orders/revenue`|  Calculate total revenue



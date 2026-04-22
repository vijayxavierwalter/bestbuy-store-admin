# Best Buy Store Admin

## Overview

The **Store Admin** application is the employee-facing web application for the Best Buy Cloud-Native Application.

It allows administrators to:

* View products
* Add new products
* Update existing products
* Delete products
* View order information

This frontend communicates with:

* **product-service** to manage product inventory
* **order-service** to retrieve order data

---

## Features

* Display all products
* Add products to inventory
* Update product details
* Delete products
* View store data from backend services

---

## Tech Stack

* **Vue.js**
* **JavaScript**
* **Docker**
* **Nginx**

---

## Environment Variables

The application expects backend services to be available through the configured API routes or reverse proxy.

---

## Running Locally

### Prerequisites

* Node.js
* npm

### Install dependencies

```bash
npm install
```

### Run the application

```bash
npm run serve
```

The app will run locally on:

```text
http://localhost:8081/
```

---

## Docker

### Build image

```bash
docker build -t yourdockerhub/bestbuy-store-admin .
```

### Run container

```bash
docker run -p 8081:80 yourdockerhub/bestbuy-store-admin
```

---

## Deployment

This service is:

* Containerized with Docker
* Deployed to **Azure Kubernetes Service (AKS)**
* Used as the admin UI in the Best Buy microservices application

---

## Related Services

* **product-service** – Product catalog API
* **order-service** – Order management API
* **store-front** – Customer storefront
* **makeline-service** – Background order processing

---

## Notes

This service was adapted from a lab starter project and customized for the Best Buy Cloud-Native Application final project.

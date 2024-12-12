# xcelsz-backend

# Xcelsz Backend API Documentation

This document provides an overview of the available API endpoints in the Xcelsz backend. Each endpoint is described with its HTTP method, path, and purpose.

---

## Meeting Endpoints

### **1. Create a New Meeting**

- **URL:** `/meetings`
- **Method:** `POST`
- **Description:** Creates a new meeting.
- **Request Body:**
  ```json
  {
    "title": "string",
    "date": "string (ISO 8601 format)",
    "time": "string",
    "duration": "number (in minutes)",
    "timezone": "string",
    "participants": ["number"]
  }
  ```

### **2. Get All Meetings**

- **URL:** `/meetings`
- **Method:** `GET`
- **Description:** Retrieves a list of all meetings.

### **3. Get a Meeting by ID**

- **URL:** `/meetings/:id`
- **Method:** `GET`
- **Description:** Retrieves the details of a specific meeting by its ID.
- **Path Parameters:**
  - `id`: The ID of the meeting to retrieve.

### **4. Update a Meeting**

- **URL:** `/meetings/:id`
- **Method:** `PUT`
- **Description:** Updates the details of a specific meeting.
- **Path Parameters:**
  - `id`: The ID of the meeting to update.
- **Request Body:**
  ```json
  {
    "title": "string",
    "date": "string (ISO 8601 format)",
    "time": "string",
    "duration": "number (in minutes)",
    "timezone": "string",
    "participants": ["number"]
  }
  ```

### **5. Delete a Meeting**

- **URL:** `/meetings/:id`
- **Method:** `DELETE`
- **Description:** Deletes a specific meeting by its ID.
- **Path Parameters:**
  - `id`: The ID of the meeting to delete.

---

## Meeting to User Endpoints

### **1. Get User Timezone for a Meeting**

- **URL:** `/user/:userId/meeting/:meetingID/timezone`
- **Method:** `GET`
- **Description:** Retrieves the timezone of a specific user for a given meeting.
- **Path Parameters:**
  - `userId`: The ID of the user.
  - `meetingID`: The ID of the meeting.

---

## User Endpoints

### **1. Get All Users**

- **URL:** `/users`
- **Method:** `GET`
- **Description:** Retrieves a list of all users.

### **2. Get Available Slots for a User**

- **URL:** `/users/:userId/available-slots`
- **Method:** `GET`
- **Description:** Retrieves the available slots for a specific user.
- **Path Parameters:**
  - `userId`: The ID of the user.

---

### Notes

- Ensure to replace `:id`, `:userId`, and `:meetingID` with actual IDs in the API requests.
- Authentication and authorization details (if required) are not included in this document but should be considered when integrating with the API.

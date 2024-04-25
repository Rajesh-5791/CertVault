# API Documentation

## 1. List Certs
- *Method:* GET
- *Endpoint:* /api/me/certs
- *Query Parameters:*
  - authKey: Authentication key of the user.
  - employeeId: ID of the employee.
  - sort: Sort order for the certificates (optional).
- *Request Payload:* None
- *Response Payload:* An array of JSON objects, where each object represents a certificate.

*Example:*

*Request:*
GET /api/me/certs?authKey=1938205A3G&employeeId=90128&sort=asc

*Response Payload:* 
`[
  {
    "Certificate Id": "102374",
    "Name": "Google Analytics Individual Qualification",
    "Issuing Organization": "Google",
    "Issue Date": "10-03-2024",
    "Expiration Date": "10-03-2029",
    "Credential Id": "GAIQ789012",
    "Credential Url": "analytics.google.com"
  },
  {
    "Certificate Id": "102375",
    "Name": "AWS Certified Solutions Architect - Associate",
    "Issuing Organization": "Amazon Web Services",
    "Issue Date": "15-05-2023",
    "Expiration Date": "15-05-2028",
    "Credential Id": "AWS789012",
    "Credential Url": "aws.amazon.com"
  }
]`


## 2. Edit Certs
- *Method:* PUT/PATCH
- *Endpoint:* /api/me/certs/editCert
- *Query Parameters:*
  - authKey: Authentication key of the user.
  - employeeId: ID of the employee.
  - certId: ID of the certificate being edited.
- *Request Payload:* JSON object containing the updated data for the certificate.
- *Response Payload:* A JSON object containing a response code and a message indicating the result of the edit operation.

*Example:*

*Request:*
PUT /api/me/certs/editCert?authKey=1938205A3G&employeeId=90128&certId=102374

*Request Payload:*
`{
  "Expiration Date": "15-04-2028"
}`

*Response Payload:*
`{
  "response-code": "200",
  "message": "Certificate edited successfully"
}`


## 3. Delete Certs
- *Method:* DELETE
- *Endpoint:* /api/me/certs/deleteCert
- *Query Parameters:*
  - authKey: Authentication key of the user.
  - employeeId: ID of the employee.
  - certId: ID of the certificate being deleted.
- *Request Payload:* None
- *Response Payload:* A JSON object containing a response code and a message indicating the result of the delete operation.

*Example:*

*Request:*
DELETE /api/me/certs/deleteCert?authKey=1938205A3G&employeeId=90128&certId=102374

*Response Payload:*
`{
  "response-code": "200",
  "message": "Certificate deleted successfully"
}`


## 4. Search Certs
- *Method:* GET
- *Endpoint:* /api/me/certs/searchCert
- *Query Parameters:*
  - authKey: Authentication key of the user.
  - employeeId: ID of the employee.
  - certId: ID of the certificate being searched.
- *Request Payload:* None
- *Response Payload:* A JSON object containing a certificate data.

*Example:*

*Request:*
GET /api/me/certs/searchCert?authKey=1938205A3G&employeeId=90128&certId=102374

*Response Payload:*
`{
    "Certificate Id": "102374",
    "Name": "Google Analytics Individual Qualification",
    "Issuing Organization": "Google",
    "Issue Date": "10-03-2024",
    "Expiration Date": "10-03-2029",
    "Credential Id": "GAIQ789012",
    "Credential Url": "analytics.google.com"
  }`


## 5. Insert Certs
- *Method:* POST
- *Endpoint:* /api/me/certs/insertCert
- *Query Parameters:*
  - authKey: Authentication key of the user.
  - employeeId: ID of the employee.
- *Request Payload:* None
- *Response Payload:* A JSON object containing a certificate data.

*Example:*

*Request:*
POST /api/me/certs/insertCert?authKey=1938205A3G&employeeId=90128

*Request Payload:*
`{
    "Certificate Id": "102374",
    "Name": "Google Analytics Individual Qualification",
    "Issuing Organization": "Google",
    "Issue Date": "10-03-2024",
    "Expiration Date": "10-03-2029",
    "Credential Id": "GAIQ789012",
    "Credential Url": "analytics.google.com"
  }`

*Response Payload:*
`{
  "response-code": "200",
  "message": "Certificate inserted successfully"
}`
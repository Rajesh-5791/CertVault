# API Documentation

## 1. List Certs
- *Method:* GET
- *Endpoint:* /api/:employeeId/certs
- *Query Parameters:* (Optional)
- *Request Payload:* None
- *Response Payload:* 
  - Success: An array of JSON objects, where each object represents a certificate.
  - Error: A JSON object having error details.

*Example:*

*Request:*
GET /api/235771/certs

*Response Payload:* 
- Success: `[{
    "certificateId": "102374",
    "courseName": "Google Analytics Individual Qualification",
    "issuingOrganization": "Google",
    "issueDate": "10-03-2024",
    "expirationDate": "10-03-2029",
    "credentialId": "GAIQ789012",
    "credentialUrl": "analytics.google.com"
  },
  {
    "certificateId": "102375",
      "courseName": "AWS Certified Solutions Architect - Associate",
      "issuingOrganization": "Amazon Web Services",
      "issueDate": "15-05-2023",
      "expirationDate": "15-05-2028",
      "credentialId": "AWS789012",
      "credentialUrl": "aws.amazon.com"
  }]`
- Error: `{
  "statusCode": 404,
  "message": "The requested resource was not found."
}`


## 2. Edit Cert
- *Method:* PUT/PATCH
- *Endpoint:* /api/:employeeId/certs/:certId
- *Query Parameters:* None
- *Request Payload:* A JSON object containing the updated data for the certificate.
- *Response Payload:* 
  - Success: A JSON object having newly edited cert details.
  - Error: A JSON object having error details.

*Example:*

*Request:*
PUT /api/235771/certs/102374

*Request Payload:*
`{
  "expirationDate": "15-04-2028",
  "issueDate": "13-09-2018"
}`

*Response Payload:*
- Success: `{
    "certificateId": "102374",
    "courseName": "AWS Certified Solutions Architect - Associate",
    "issuingOrganization": "Amazon Web Services",
    "issueDate": "13-09-2018",
    "expirationDate": "15-04-2028",
    "credentialId": "AWS789012",
    "credentialUrl": "aws.amazon.com"
  }`
- Error: `{
  "statusCode": 404,
  "message": "The requested resource was not found."
}`


## 3. Delete Cert
- *Method:* DELETE
- *Endpoint:* /api/:employeeId/certs/:certId
- *Query Parameters:* None
- *Request Payload:* None
- *Response Payload:* 
  - Success: A JSON object containing last deleted cert details.
  - Error: A JSON object having error details. 

*Example:*

*Request:*
DELETE /api/145602/certs/102374

*Response Payload:*
- Success: `{
  "statusCode": 200,
  "message": "Certificate deleted successfully."
}`
- Error: `{
  "statusCode": 404,
  "message": "The requested resource was not found."
}`


## 4. Search Cert
- *Method:* GET
- *Endpoint:* /api/:employeeId/certs/searchCert/:certId
- *Query Parameters:* None
- *Request Payload:* None
- *Response Payload:* 
  - Success: A JSON object containing a certificate details.
  - Error: A JSON object containg error details.

*Example:*

*Request:*
GET /api/562901/certs/searchCert/102374

*Response Payload:*
- Success: `{
    "certificateId": "102374",
    "courseName": "AWS Certified Solutions Architect - Associate",
    "issuingOrganization": "Amazon Web Services",
    "issueDate": "15-05-2023",
    "expirationDate": "15-05-2028",
    "credentialId": "AWS789012",
    "credentialUrl": "aws.amazon.com"
}`
- Error: `{
  "statusCode": 404,
  "message": "The requested resource was not found."
}`


## 5. Insert Cert
- *Method:* PUT
- *Endpoint:* /api/:employeeId/certs
- *Query Parameters:* None
- *Request Payload:* A JSON object containing the new certificate data.
- *Response Payload:* 
  - Success: A JSON object having newly inserted cert details.
  - Error: A JSON object having error details.

*Example:*

*Request:*
PUT /api/562901/certs

*Request Payload:* `{
    "certificateId": "102374",
    "courseName": "AWS Certified Solutions Architect - Associate",
    "issuingOrganization": "Amazon Web Services",
    "issueDate": "15-05-2023",
    "expirationDate": "15-05-2028",
    "credentialId": "AWS789012",
    "credentialUrl": "aws.amazon.com"
}`

*Response Payload:*
- Success: `{
    "certificateId": "102374",
    "courseName": "AWS Certified Solutions Architect - Associate",
    "issuingOrganization": "Amazon Web Services",
    "issueDate": "15-05-2023",
    "expirationDate": "15-05-2028",
    "credentialId": "AWS789012",
    "credentialUrl": "aws.amazon.com"
}`
- Error: `{
  "statusCode": 404,
  "message": "The requested resource was not found."
}`
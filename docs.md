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
- Success: `{
  "data": [{
    "CertificateId": "102374",
    "attributes": {
    "Name": "Google Analytics Individual Qualification",
    "IssuingOrganization": "Google",
    "IssueDate": "10-03-2024",
    "ExpirationDate": "10-03-2029",
    "CredentialId": "GAIQ789012",
    "CredentialUrl": "analytics.google.com"
    }
  },
  {
    "CertificateId": "102375",
    "attributes": {
      "Name": "AWS Certified Solutions Architect - Associate",
      "IssuingOrganization": "Amazon Web Services",
      "IssueDate": "15-05-2023",
      "ExpirationDate": "15-05-2028",
      "CredentialId": "AWS789012",
      "CredentialUrl": "aws.amazon.com"
    }
  }]
}`
- Error: `{
  "status": "error",
  "statusCode": 404,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found."
  }
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
  "data": {
  "Expiration Date": "15-04-2028",
  "IssueDate": "13-09-2018"
  }
}`

*Response Payload:*
- Success: `{
  "data": {
    "CertificateId": "102374",
    "attributes": {
      "Name": "AWS Certified Solutions Architect - Associate",
      "IssuingOrganization": "Amazon Web Services",
      "IssueDate": "15-05-2023",
      "ExpirationDate": "15-05-2028",
      "CredentialId": "AWS789012",
      "CredentialUrl": "aws.amazon.com"
    }
  }
}`
- Error: `{
  "status": "error",
  "statusCode": 404,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found."
  }
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
  "data": {
    "CertificateId": "102374",
    "attributes": {
      "Name": "AWS Certified Solutions Architect - Associate",
      "IssuingOrganization": "Amazon Web Services",
      "IssueDate": "15-05-2023",
      "ExpirationDate": "15-05-2028",
      "CredentialId": "AWS789012",
      "CredentialUrl": "aws.amazon.com"
    }
  }
}`
- Error: `{
  "status": "error",
  "statusCode": 404,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found."
  }
}`


## 4. Search Cert
- *Method:* GET
- *Endpoint:* /api/:employeeId/certs/:certId
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
  "data": {
    "Certificate Id": "102374",
    "attributes": {
    "Name": "Google Analytics Individual Qualification",
    "Issuing Organization": "Google",
    "Issue Date": "10-03-2024",
    "Expiration Date": "10-03-2029",
    "Credential Id": "GAIQ789012",
    "Credential Url": "analytics.google.com"
    }
  }
}`
- Error: `{
  "status": "error",
  "statusCode": 404,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found."
  }
}`


## 5. Insert Cert
- *Method:* POST
- *Endpoint:* /api/:employeeId/certs
- *Query Parameters:* None
- *Request Payload:* A JSON object containing the new certificate data.
- *Response Payload:* 
  - Success: A JSON object having newly inserted cert details.
  - Error: A JSON object having error details.

*Example:*

*Request:*
POST /api/562901/certs

*Request Payload:*
`{
    "data": {
    "Certificate Id": "102374",
    "attributes": {
      "Name": "Google Analytics Individual Qualification",
      "Issuing Organization": "Google",
      "Issue Date": "10-03-2024",
      "Expiration Date": "10-03-2029",
      "Credential Id": "GAIQ789012",
      "Credential Url": "analytics.google.com"
    }
  }
}`

*Response Payload:*
- Success: `{
    "data": {
      "Certificate Id": "102374",
      "attributes": { ... }
    }
  }`
- Error: `{
  "status": "error",
  "statusCode": 404,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found."
  }
}`
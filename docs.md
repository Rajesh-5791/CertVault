# Response code is same for all:
    HTTP status code indicating the success or failure of the request (e.g., 200 for success, 404 for not found, etc.).

# 1. List certs:
    Method: get
    Endpoint: /api/me/certs
    Query params: ?authKey=1938205A3GemployeeId=90128&sort=(desc/asc/expiryDate/issuedDate)
    Response json: [{"Certificate Id": "102374", "Name": "Google Analytics Individual Qualification", 
                    "Issuing Organization": "Google", "Issue Date": "10-03-2024", 
                    "Expiration Date": "10-03-2029", "Credential Id": "GAIQ789012", 
                    "Credential Url": "analytics.google.com"}, {...}, {...}, ...]
    Payload:
    -> Request payload: authKey, employeeId, sort.
    -> Response payload: An array of json objects, where each json object represents a certificate.

# 2. Edit certs:
    Method: put/patch
    Endpoint: /api/me/certs/editCert
    Query params: ?authKey=1938205A3GemployeeId=90128&certId=102374&expirationDate=15-04-2028 (other parameters to be edited)
    Response json: {"response-code": "message"} 
    Payload:
    -> Request payload: authKey, employeeId, certId, and the updated data for the certificate.
    -> Response payload: A json object containing a response code and a message indicating the result of the edit operation.

# 3. Delete certs:
    Method: delete
    Endpoint: /api/me/certs/deleteCert
    Query params: ?authKey=1938205A3GemployeeId=90128&certId=102374
    Response json: {"response-code": "message"} 
    Payload:
    -> Request payload: authKey, employeeId, certId.
    -> Response payload: A json object containing a response code and a message indicating the result of the deletion operation.

# 4. Search certs:
    Method: get
    Endpoint: /api/me/certs
    Query params: ?authKey=1938205A3GemployeeId=90128&certId=102374 (any primary key)
    Response json: {"Certificate Id": "102374", "Name": "Google Analytics Individual Qualification", 
                    "Issuing Organization": "Google", "Issue Date": "10-03-2024", 
                    "Expiration Date": "10-03-2029", "Credential Id": "GAIQ789012", 
                    "Credential Url": "analytics.google.com"}
    Payload:
    -> Request payload: authKey, employeeId, certId.
    -> Response payload: A json object containing data related to the certificate matching the search criteria.

# 5. Insert certs:
    Method: post
    Endpoint: /api/me/certs/insertCert
    Query params: ?authKey=1938205A3GemployeeId=90128&certId=102374&name=Google Analytics Individual Qualification
                    &issuingOrganization=Google&issueDate=10-03-2024
                    &expirationDate=10-03-2029&credentialId=GAIQ789012
                    &credentialUrl=analytics.google.com
    Response json: {"response-code": "message"}
    Payload:
    -> Request payload: authKey, employeeId, certId, name, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl.
    -> Response payload: An object containing a response code and a message indicating the result of the insertion operation.
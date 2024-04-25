// Cruds js

const insertCertificate = async () => {
    const authKey = '209G371E781';
    const employeeId = '789251GE';

    const certificateData = { "CertificateId": "102375", "CourseName": "AWS Certified Solutions Architect - Associate", "IssuingOrganization": "Amazon Web Services", "IssueDate": "15-05-2023", "ExpirationDate": "15-05-2028", "CredentialId": "AWS789012", "CredentialUrl": "aws.amazon.com" };

    try {
        const response = await fetch(`http://localhost:5791/api/me/certs/insertCert?authKey=${authKey}&employeeId=${employeeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(certificateData)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};

insertCertificate();
// Frontend js

const handleSignup = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('http://localhost:5791/api/signup', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            employeeId: formData.get('employeeId'),
            password: formData.get('password'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email')
        })
    });
    const data = await response.json();
    if (data.error) {
        console.error('Signup error:', data.error);
    } else {
        console.log('Signup successful:', data.message);
        await handleLogin(event);
    }
};

const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('http://localhost:5791/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            employeeId: formData.get('employeeId'),
            password: formData.get('password')
        })
    });
    const data = await response.json();
    localStorage.setItem('token', data.certificates);
    if (data.error) {
        console.error('Login error:', data.error);
    } else {
        console.log('Login successful:', data.message);
        window.location.href = "./employeeDashboard.html";
    }
};

const fetchCertificates = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5791/api/certs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    const data = await response.json();
    if (data.error) {
        console.error('Error fetching certificates:', data.error);
    } else {
        console.log('Certificates:', data.certificates);
    }
    showCertificates(data.certificates);
};

const getFormDetails = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const certificateData = {
        courseName: formData.get('courseName'),
        issuingOrganization: formData.get('issuingOrganization'),
        issueDate: formData.get('issueDate'),
        expirationDate: formData.get('expirationDate'),
        credentialId: formData.get('credentialId'),
        credentialUrl: formData.get('credentialUrl')
    };
    const certId = formData.get('certId');
    if (certId) {
        await updateCertificate(certId, certificateData);
    } else {
        certificateData.certId = generateCertificateId();
        await addCertificate(certificateData);
    }
    clearForm();
};

const generateCertificateId = () => Math.random().toString(36).substring(2, 10);

const addCertificate = async (formData) => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:5791/api/certs', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(formData)
    });
    await fetchCertificates();
};

const populate = (certificate) => {
    document.getElementById('courseName').value = certificate.courseName;
    document.getElementById('issuingOrganization').value = certificate.issuingOrganization;
    document.getElementById('issueDate').value = certificate.issueDate;
    document.getElementById('expirationDate').value = certificate.expirationDate;
    document.getElementById('credentialId').value = certificate.credentialId;
    document.getElementById('credentialUrl').value = certificate.credentialUrl;
};

const updateCertificate = async (certId, formData) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5791/api/certs/${certId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(formData)
    });
    await fetchCertificates();
};

const deleteCertificate = async (certId) => {
    const confirmation = confirm("Are you sure want to delete?");
    if (confirmation) {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5791/api/certs/${certId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        await fetchCertificates();
    } else {
        console.log('Deletion is stopped.');
    }
};

function logout() {
    localStorage.removeItem('token');
    window.location.href = './login.html';
}

const showCertificates = (certificates) => {
    const tableDiv = document.getElementById('certificationsTable');
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['Employee ID', 'Certificate ID', 'Course Name', 'Issuing Organization', 'Issue Date', 'Expiration Date', 'Credential ID', 'Credential URL', 'Actions'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    certificates.forEach(certificate => {
        const row = table.insertRow();
        Object.keys(certificate).forEach(key => {
            const cell = row.insertCell();
            cell.textContent = certificate[key];
        });

        const editCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => populate(certificate);
        editCell.appendChild(editButton);

        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteCertificate(certificate.certificateId);
        deleteCell.appendChild(deleteButton);
    });
    tableDiv.innerHTML = '';
    tableDiv.appendChild(table);
};

function clearForm() {
    document.getElementById('certId').value = '';
    document.getElementById('courseName').value = '';
    document.getElementById('issuingOrganization').value = '';
    document.getElementById('issueDate').value = '';
    document.getElementById('expirationDate').value = '';
    document.getElementById('credentialId').value = '';
    document.getElementById('credentialUrl').value = '';
}
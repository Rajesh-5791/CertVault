// Frontend js

const baseUrl = "http://localhost:5791/api/";
const fields = ['certId', 'courseName', 'issuingOrganization', 'issueDate', 'expirationDate', 'credentialId', 'credentialUrl']

const handleSignup = async (event) => {
    const signupUrl = baseUrl + 'signup'
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch(signupUrl, {
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
    const loginUrl = baseUrl + 'login';
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch(loginUrl, {
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
    const fetchCertsUrl = baseUrl + 'certs';
    const token = localStorage.getItem('token');
    const response = await fetch(fetchCertsUrl, {
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
        showCertificates(data.certificates);
    }
};

const getFormDetails = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const certificateData = {
        courseName: formData.get(fields[1]),
        issuingOrganization: formData.get(fields[2]),
        issueDate: formData.get(fields[3]),
        expirationDate: formData.get(fields[4]),
        credentialId: formData.get(fields[5]),
        credentialUrl: formData.get(fields[6])
    };
    const certId = formData.get(fields[0]);
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
    const addUrl = baseUrl + 'certs';
    const token = localStorage.getItem('token');
    await fetch(addUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(formData)
    });
    await fetchCertificates();
};


const updateCertificate = async (certId, formData) => {
    const updateUrl = baseUrl + `certs/${certId}`;
    const token = localStorage.getItem('token');
    await fetch(updateUrl, {
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
    const deleteUrl = baseUrl + `certs/${certId}`;
    const confirmation = confirm("Are you sure do you want to delete?");
    if (confirmation) {
        const token = localStorage.getItem('token');
        await fetch(deleteUrl, {
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

const showCertificates = (certificates) => {
    const tableDiv = document.getElementById('certificationsTable');
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['Employee ID', 'Certificate ID', 'Course Name', 'Issuing Organization', 'Issue Date', 'Expiration Date', 'Credential ID', 'Credential URL', 'Update', 'Delete'];
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

const clearForm = () => {
    for (var fieldsCounter = 0; fieldsCounter < fields.length; fieldsCounter++) {
        document.getElementById(fields[fieldsCounter]).value = '';
    }
};

const populate = (certificate) => {
    for (var fieldsCounter = 0; fieldsCounter < fields.length; fieldsCounter++) {
        if (fieldsCounter === 0) {
            document.getElementById(fields[fieldsCounter]).value = certificate.certificateId;
        } else {
            document.getElementById(fields[fieldsCounter]).value = certificate[fields[fieldsCounter]];
        }
    }
};

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = './login.html';
};
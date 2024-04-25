// Cruds APIs

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5791;
app.use(bodyParser.json());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('CertsVault.db');

const validateAuthKey = async (req, res, next) => {
    const { authKey, employeeId } = req.query;
    if (!authKey || !employeeId) {
        return res.status(400).json({ error: "Authentication key and EmployeeId are required." });
    }
    try {
        const row = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Employee WHERE EmployeeId = ? AND AuthKey = ?', [employeeId, authKey], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
        if (!row) {
            return res.status(401).json({ error: "Invalid authentication key or employee ID" });
        }
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

app.post('/api/me/certs/insertCert', validateAuthKey, async (req, res) => {
    const { employeeId } = req.query;
    const certificateData = req.body;
    if (!certificateData) {
        return res.status(400).json({ error: "Certificate data is required." });
    }
    try {
        await db.run(`INSERT INTO Certs VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [employeeId, certificateData['CertificateId'], certificateData['CourseName'], certificateData['IssuingOrganization'], certificateData['IssueDate'], certificateData['ExpirationDate'], certificateData['CredentialId'], certificateData['CredentialUrl']]);
        return res.status(200).json({ "response-code": "200", "message": "Certificate inserted successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/api/me/certs', validateAuthKey, (req, res) => {
    res.send('Get all certificates.');
});

app.get('/api/me/certs/searchCert', validateAuthKey, (req, res) => {
    res.send('Search certificate.');
});

app.put('/api/me/certs/editCert', validateAuthKey, (req, res) => {
    res.send('Edit certificate.');
});

app.delete('/api/me/certs/deleteCert', validateAuthKey, (req, res) => {
    res.send('Delete certificate.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Cruds APIs

const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
app.use(express.json());
const PORT = 5791;
let db;

(async () => {
    db = await sqlite.open({
        filename: 'D:/Training/WebDevelopment/Project/CertsProject/CertsVault.db',
        driver: sqlite3.Database
    });
})();

async function getCertificate(employeeId, certificateId) {
    const query = 'SELECT * FROM Certs WHERE employeeId = ? AND certificateId = ?';
    const certificate = await db.get(query, [employeeId, certificateId]);
    return certificate;
}

async function executeQueryAndRespond(res, query, values, employeeId, certId, successMessage, errorMessage) {
    try {
        await db.run(query, values);
        const certificate = await getCertificate(employeeId, certId);
        if (!certificate) {
            return res.status(500).json({ error: errorMessage });
        }
        return res.status(200).json({ message: successMessage, certificate });
    } catch (error) {
        return res.status(500).json({ error: errorMessage });
    }
}

app.route('/api/:employeeId/certs')
.put(async (req, res) => {
    const { employeeId } = req.params;
    const { certId, courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl } = req.body;
    const values = [employeeId, certId, courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl];
    const query = 'INSERT INTO Certs VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const errorMessage = 'Error inserting certificate';
    const successMessage = 'Certificate inserted successfully';
    await executeQueryAndRespond(res, query, values, employeeId, certId, successMessage, errorMessage);
})
.get(async (req, res) => {
    try {
        const { employeeId } = req.params;
        const query = 'SELECT * FROM Certs WHERE employeeId = ?';
        const allCertificates = await db.all(query, [employeeId]);
        return res.status(200).json({ message: 'Retrieved all certificates successfully', allCertificates });
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving certificates' });
    }
});

app.route('/api/:employeeId/certs/:certId')
.post(async (req, res) => {
    const { employeeId, certId } = req.params;
    const { courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl } = req.body;
    const query = 'UPDATE Certs SET courseName = ?, issuingOrganization = ?, issueDate = ?, expirationDate = ?, credentialId = ?, credentialUrl = ? WHERE employeeId = ? AND certificateId = ?';
    const values = [courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl, employeeId, certId];
    const errorMessage = 'Error updating certificate';
    const successMessage = 'Certificate updated successfully';
    await executeQueryAndRespond(res, query, values, employeeId, certId, successMessage, errorMessage);
})    
.delete(async (req, res) => {
    const { employeeId, certId } = req.params;
    const query = 'DELETE FROM Certs WHERE employeeId = ? AND certificateId = ?';
    try {
        await db.run(query, [employeeId, certId]);
        const certificate = await getCertificate(employeeId, certId);
        if (!certificate) {
            return res.status(200).json({ success: true, message: 'Certificate deleted successfully.'});
        }            
        return res.status(404).json({ success: false, message: 'Certificate not deleted.' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting certificate' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
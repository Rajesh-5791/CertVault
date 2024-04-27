// CRUD.js

const express = require('express');
const dbOperations = require('./dbOperations');

const app = express();
app.use(express.json());
const PORT = 5791;

const errorMessages = {
    insertCertificate: 'Error inserting certificate.',
    updateCertificate: 'Error updating certificate.',
    deleteCertificate: 'Error deleting certificate.',
    retrieve: 'Error retrieving certificates.',
};

(async () => {
    await dbOperations.openDatabase();
})();

async function handleDatabaseOperation(res, operation, successMessage, employeeId, certId) {
    const result = await operation();
    const certificate = await dbOperations.getCertificate(employeeId, certId);
    if (result > 0) {
        return res.status(200).json({ message: successMessage, certificate });
    } else {
        return res.status(500).json({ error: errorMessages[operation.name] });
    }
}

app.route('/api/:employeeId/certs/:certId')
    .post(async (req, res) => {
        const { employeeId, certId } = req.params;
        const { courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl } = req.body;
        return handleDatabaseOperation(res, () => dbOperations.updateCertificate(employeeId, certId, courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl), 'Certificate updated successfully.', employeeId, certId);
    })
    .delete(async (req, res) => {
        const { employeeId, certId } = req.params;
        return handleDatabaseOperation(res, () => dbOperations.deleteCertificate(employeeId, certId), 'Certificate deleted successfully.', employeeId, certId);
    });

app.route('/api/:employeeId/certs')
    .put(async (req, res) => {
        const { employeeId } = req.params;
        const { certId, courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl } = req.body;
        return handleDatabaseOperation(res, () => dbOperations.insertCertificate(employeeId, certId, courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl), 'Certificate inserted successfully.', employeeId, certId);
    })
    .get(async (req, res) => {
        try {
            const { employeeId } = req.params;
            let { sort, sortBy } = req.query;
            let sortOrder = 'ASC';
            if (sort && sort.toLowerCase() === 'desc') {
                sortOrder = 'DESC';
            }
            if (!sortBy) {
                sortBy = 'expirationDate';
            }
            const allCertificates = await dbOperations.getAllCertificates(employeeId, sortBy, sortOrder);
            return res.status(200).json({ message: 'Retrieved all certificates successfully', allCertificates });
        } catch (error) {
            return res.status(500).json({ error: errorMessages.retrieve });
        }
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

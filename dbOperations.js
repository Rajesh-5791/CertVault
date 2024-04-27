// Database operations

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
let db;

async function openDatabase() {
    db = await sqlite.open({
        filename: 'D:/Training/WebDevelopment/Project/CertsProject/CertsVault.db',
        driver: sqlite3.Database
    });
}

function returnRowsEffected(result) {
    return result.changes;
}

async function getCertificate(employeeId, certificateId) {
    const query = 'SELECT * FROM Certs WHERE employeeId = ? AND certificateId = ?';
    const certificate = await db.get(query, [employeeId, certificateId]);
    return certificate;
}

async function insertCertificate(employeeId, certId, courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl) {
    const query = 'INSERT INTO Certs VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [employeeId, certId, courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl];
    const result = await db.run(query, values);
    return returnRowsEffected(result);
}

async function getAllCertificates(employeeId, sortBy, sortOrder) {
    let query = 'SELECT * FROM Certs WHERE employeeId = ? ORDER BY ' + sortBy + ' ' + sortOrder;
    const allCertificates = await db.all(query, [employeeId]);
    return allCertificates;
}

async function updateCertificate(employeeId, certId, courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl) {
    const query = 'UPDATE Certs SET courseName = ?, issuingOrganization = ?, issueDate = ?, expirationDate = ?, credentialId = ?, credentialUrl = ? WHERE employeeId = ? AND certificateId = ?';
    const values = [courseName, issuingOrganization, issueDate, expirationDate, credentialId, credentialUrl, employeeId, certId];
    const result = await db.run(query, values);
    return returnRowsEffected(result);
}

async function deleteCertificate(employeeId, certId) {
    const query = 'DELETE FROM Certs WHERE employeeId = ? AND certificateId = ?';
    const result = await db.run(query, [employeeId, certId]);
    return returnRowsEffected(result);
}

module.exports = {
    openDatabase,
    getCertificate,
    insertCertificate,
    getAllCertificates,
    updateCertificate,
    deleteCertificate
};
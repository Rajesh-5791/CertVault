// CRUD database operations

import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
let db;

export async function openDatabase() {
    db = await open({
        filename: 'D:/Training/Project/CertsVault.db',
        driver: sqlite3.Database
    });
}

function returnRowsEffected(result) {
    return result.changes;
}

export async function getCertificate(employeeId, certificateId) {
    const query = 'SELECT * FROM Certs WHERE employeeId = ? AND certificateId = ?';
    const certificate = await db.get(query, [employeeId, certificateId]);
    return certificate;
}

export async function getAllCertificates({ employeeId, sortBy, sortOrder }) {
    const query = 'SELECT * FROM Certs WHERE employeeId = ? ORDER BY ' + sortBy + ' ' + sortOrder;
    const allCertificates = await db.all(query, [employeeId]);
    return allCertificates;
}

export async function insertCertificate({ ...certificateDetails }) {
    const query = 'INSERT INTO Certs VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(Object.values(certificateDetails));
    const result = await db.run(query, Object.values(certificateDetails));
    return returnRowsEffected(result);
}

export async function updateCertificate({ ...certificateDetails }) {
    const query = 'UPDATE Certs SET courseName = ?, issuingOrganization = ?, issueDate = ?, expirationDate = ?, credentialId = ?, credentialUrl = ? WHERE employeeId = ? AND certificateId = ?';
    const result = await db.run(query, Object.values(certificateDetails));
    return returnRowsEffected(result);
}

export async function deleteCertificate({ employeeId, certId }) {
    const query = 'DELETE FROM Certs WHERE employeeId = ? AND certificateId = ?';
    const result = await db.run(query, [employeeId, certId]);
    return returnRowsEffected(result);
}

// Database operations

import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
let db;

function returnRowsEffected(result) {
    return result.changes;
}

export async function openDatabase() {
    try {
        db = await open({
            filename: 'D:/Training/Project/CertsVault.db',
            driver: sqlite3.Database
        });
    } catch (error) {
        console.error("Error opening database:", error);
    }
}

export async function getCertificate(employeeId, certificateId) {
    try {
        const query = 'SELECT * FROM Certs WHERE employeeId = ? AND certificateId = ?';
        const certificate = await db.get(query, [employeeId, certificateId]);
        return certificate;
    } catch (error) {
        console.error("Error fetching certificate:", error);
        return null;
    }
}

export async function getAllCertificates({ employeeId, sortBy, sortOrder }) {
    try {
        const query = 'SELECT * FROM Certs WHERE employeeId = ? ORDER BY ' + sortBy + ' ' + sortOrder;
        const allCertificates = await db.all(query, [employeeId]);
        return allCertificates;
    } catch (error) {
        console.error("Error fetching all certificates:", error);
        return [];
    }
}

export async function insertCertificate({ ...certificateDetails }) {
    try {
        const query = 'INSERT INTO Certs VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.run(query, Object.values(certificateDetails));
        return returnRowsEffected(result);
    } catch (error) {
        console.error("Error inserting certificate:", error);
        return 0;
    }
}

export async function updateCertificate({ ...certificateDetails }) {
    try {
        const query = 'UPDATE Certs SET courseName = ?, issuingOrganization = ?, issueDate = ?, expirationDate = ?, credentialId = ?, credentialUrl = ? WHERE employeeId = ? AND certificateId = ?';
        const result = await db.run(query, Object.values(certificateDetails));
        return returnRowsEffected(result);
    } catch (error) {
        console.error("Error updating certificate:", error);
        return 0;
    }
}

export async function deleteCertificate({ employeeId, certId }) {
    try {
        const query = 'DELETE FROM Certs WHERE employeeId = ? AND certificateId = ?';
        const result = await db.run(query, [employeeId, certId]);
        return returnRowsEffected(result);
    } catch (error) {
        console.error("Error deleting certificate:", error);
        return 0;
    }
}

export async function getEmployeeDetails(employeeId, password) {
    try {
        const query = 'SELECT * FROM Employee WHERE EmployeeId = ? AND Password = ?';
        const result = await db.get(query, [employeeId, password]);
        return result;
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return null;
    }
}

export async function insertEmployee({ employeeId, password, firstName, lastName, email, token }) {
    try {
        const query = 'INSERT INTO Employee VALUES (?, ?, ?, ?, ?, ?)';
        const result = await db.run(query, [employeeId, password, firstName, lastName, email, token]);
        return returnRowsEffected(result);
    } catch (error) {
        console.error("Error inserting employee:", error);
        return 0;
    }
}

export async function updateEmployeeToken(employeeId, token) {
    try {
        const query = 'UPDATE Employee SET Token = ? WHERE EmployeeId = ?';
        const result = await db.run(query, [token, employeeId]);
        return returnRowsEffected(result);
    } catch (error) {
        console.error("Error updating employee token:", error);
        return 0;
    }
}

export async function getEmployeeIdFromToken(token) {
    try {
        const result = await db.get('SELECT EmployeeId FROM Employee WHERE Token = ?', [token]);
        return result ? result.EmployeeId : null;
    } catch (error) {
        console.error("Error fetching employee ID from token:", error);
        return null;
    }
}
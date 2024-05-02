// CRUD APIs implementation

import express from 'express';
import cors from 'cors';
import randomToken from 'random-token'
import md5 from 'md5';
import { getEmployeeIdFromToken, updateEmployeeToken, insertEmployee, openDatabase, getCertificate, insertCertificate, getAllCertificates, updateCertificate, deleteCertificate, getEmployeeDetails } from './dbOperations.js';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5791;

const messagesAndCodes = {
    verify: {
        errorMessage: 'Unauthorized', 
        successMessage: 'Token verified sucessfully.', 
        errorCode: 401, 
        successCode: 200
    },
    login: {
        errorMessage: 'Invalid credentials!', 
        successMessage: 'Logged in successfully', 
        errorCode: 401, 
        successCode: 200
    },
    signup: {
        successMessage: 'Employee registered successfully', 
        errorMessage: 'Error registering employee', 
        errorCode: 500, 
        successCode: 201
    },
    insertCertificate: {
        errorMessage: 'Error inserting certificate.', 
        successMessage: 'Certificate inserted successfully.', 
        errorCode: 400, 
        successCode: 201
    },
    updateCertificate: {
        errorMessage: 'Error updating certificate.', 
        successMessage: 'Certificate updated successfully.', 
        errorCode: 404, 
        successCode: 200
    },
    deleteCertificate: {
        errorMessage: 'Error deleting certificate.', 
        successMessage: 'Certificate deleted successfully.', 
        errorCode: 404, 
        successCode: 200
    },
    getAllCertificates: {
        errorMessage: 'Error retrieving certificates.', 
        successMessage: 'Retrieved all certificates successfully.', 
        errorCode: 500, 
        successCode: 200
    }
};

(async () => { await openDatabase() })();

const handleResponse = async (res, result, operation, certificates) => {
    const { successCode, successMessage, errorCode, errorMessage } = messagesAndCodes[operation];
    if (result > 0) {
        return res.status(successCode).json({ message: successMessage, certificates });
    } else {
        return res.status(errorCode).json({ error: errorMessage });
    }
};

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    const employeeId = await getEmployeeIdFromToken(token);
    if (!employeeId) {
        return await handleResponse(res, 0, 'verify', token);
    }
    req.employeeId = employeeId;
    next();
};

app.use('/api', (req, res, next) => {
    if (req.path !== '/login' && req.path !== '/signup') {
        verifyToken(req, res, next);
    } else {
        next();
    }
});

app.post('/api/login', async (req, res) => {
    const { employeeId, password } = req.body;
    console.log('Login attempt:', { employeeId });
    const hashedPassword = md5(password);
    let result = 0, token = null;
    const employeeDetails = await getEmployeeDetails(employeeId, hashedPassword);
    if (employeeDetails) {
        token = randomToken(14);
        result = await updateEmployeeToken(employeeId, token);
    }
    return await handleResponse(res, result, 'login', token);
});

app.put('/api/signup', async (req, res) => {
    const { employeeId, password, firstName, lastName, email } = req.body;
    const hashedPassword = md5(password);
    const token = randomToken(14);
    const result = await insertEmployee({ employeeId, password: hashedPassword, firstName, lastName, email, token });
    return await handleResponse(res, result, 'signup', token);
});

app.route('/api/certs/:certId')
    .post(async (req, res) => {
        const employeeId = req.employeeId;
        const { certId } = req.params;
        const { ...certificateDetails } = req.body;
        const values = { ...certificateDetails, employeeId, certId };
        const result = await updateCertificate(values);
        const certificate = await getCertificate(employeeId, certId);
        return await handleResponse(res, result, 'updateCertificate', certificate);
    })
    .delete(async (req, res) => {
        const employeeId = req.employeeId;
        const { certId } = req.params;
        const result = await deleteCertificate({ employeeId, certId });
        return await handleResponse(res, result, 'deleteCertificate');
    });

app.route('/api/certs')
    .put(async (req, res) => {
        const employeeId = req.employeeId;
        const { certId, ...certificateDetails } = req.body;
        const values = { employeeId, certId, ...certificateDetails };
        const result = await insertCertificate(values);
        const certificate = await getCertificate(employeeId, certId);
        return await handleResponse(res, result, 'insertCertificate', certificate);
    })
    .get(async (req, res) => {
        const employeeId = req.employeeId;
        const sortOrder = req.query.sort || "ASC";
        const sortBy = req.query.sortBy || "expirationDate";
        const values = { employeeId, sortBy, sortOrder };
        const allCertificates = await getAllCertificates(values);
        return await handleResponse(res, allCertificates.length, 'getAllCertificates', allCertificates);
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
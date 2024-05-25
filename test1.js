const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('/workspaces/Deliberately_Vulnerable_JWT/private.pem', 'utf8');
const publicKey = fs.readFileSync('/workspaces/Deliberately_Vulnerable_JWT/public.pem', 'utf8');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, privateKey, {
        algorithm: 'RS256',
        expiresIn: maxAge
    });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        return decoded;
    } catch (err) {
        console.error('Token verification failed:', err);
        return null;
    }
};

// Example usage
const token = createToken('user_id_123');
console.log('Token:', token);

const verifiedData = verifyToken(token);
console.log('Verified Data:', verifiedData);
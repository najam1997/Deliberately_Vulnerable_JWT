const jwt = require('jsonwebtoken');
const fs = require('fs');

const str_private = fs.readFileSync('/workspaces/Deliberately_Vulnerable_JWT/private.pem', 'utf8');
const publicKey = fs.readFileSync('/workspaces/Deliberately_Vulnerable_JWT/public.pem', 'utf8');


// Base64 encoding

const buffer = Buffer.from(str_private);
const enc_privateKey = buffer.toString('base64');
console.log(enc_privateKey); 

// Base64 decoding
const dec_privateKey = Buffer.from(enc_privateKey, 'base64');
const privateKey = dec_privateKey.toString();
console.log(privateKey);


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

const jwt = require('jsonwebtoken');
const fs = require('fs');

const str_privateKey = fs.readFileSync('/workspaces/Deliberately_Vulnerable_JWT/private.pem', 'utf8');
const str_publicKey = fs.readFileSync('/workspaces/Deliberately_Vulnerable_JWT/public.pem', 'utf8');

// Base64 encoding Public Key
const buffer1 = Buffer.from(str_publicKey);
const enc_publicKey = buffer1.toString('base64');
console.log(enc_publicKey); 

// Base64 decoding Public Key
const dec_publicKey = Buffer.from(enc_publicKey, 'base64');
const publicKey = dec_publicKey.toString();
console.log(publicKey);

// Base64 encoding Private Key
const buffer2 = Buffer.from(str_privateKey);
const enc_privateKey = buffer2.toString('base64');
console.log(enc_privateKey); 

// Base64 decoding Private Key
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

const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

module.exports = cors(corsOptions);

import mongoose from 'mongoose';

class Connection {
    constructor() {
        const url = process.env.MONGODB_URI || 'mongodb://mongodb:27017';

        mongoose
            .connect(url)
            // eslint-disable-next-line no-console
            .then(() => console.log('db connection success'))
            // eslint-disable-next-line no-console
            .catch(err => console.warn('db connection failed', err));
    }
}

export default new Connection();

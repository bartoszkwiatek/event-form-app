import mongoose from 'mongoose';

export class Connection {
    // mongo-memory-server does not work on linux node:alipine hence temporary test database
    private url =
        process.env.NODE_ENV === 'test' ? 'mongodb://127.0.0.1:27018' : 'mongodb://mongodb:27017';

    public async init() {
        await mongoose
            .connect(this.url)
            .then(() => console.log(`db connection success: ${this.url}`))
            .catch(err => console.warn(`db connection fail: ${this.url}`, err));
        return this;
    }

    public async drop() {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();

        return this;
    }

    public async clean() {
        const collections = await mongoose.connection.db.collections();

        for (const collection of collections) {
            await collection.drop();
        }

        return this;
    }
}

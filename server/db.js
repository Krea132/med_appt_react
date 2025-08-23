const mongoose = require('mongoose');

// local edit
// Use the environment variable, with a fallback for local development
// const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/med_appt";

// cloud edit
// Every time that you start the MongoDB service, a new password in generated. You will need to update the db.js file with the latest password.
const mongoURL =  "mongodb://root:ZB0VvGj3WNZHH3jHJzdDDtmp@172.21.13.121:27017";


const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        await mongoose.connect(mongoURL, { dbName: 'stayhealthybeta1'});
        console.info('Connected to Mongo Successfully')

        return;
    } catch (error) {
        console.error(error);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`)

        return await connectToMongo(nextRetryCount);

    }
};

module.exports = connectToMongo;
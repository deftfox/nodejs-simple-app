import { logger } from './utils/logger';
import db from './data-access/models';
import app from './index';


if (!process.env.PORT) {
    process.exit(1);
}

const PORT: string = process.env.PORT;

/**
 * Server Activation
*/

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})

process.on('uncaughtException', function(err) {
    logger.error(" UNCAUGHT EXCEPTION " + '\n' + "[Inside 'uncaughtException' event] " + err.stack || err.message );
});

process.on('unhandledRejection', function(err: Error) {
    logger.error(" UNHANDLED PROMISE REJECTION " + '\n' + "[Inside 'unhandledRejection' event] " + err.stack || err.message );
});

// @ts-ignore: Test uncaughtException handler
//THIS_FUNCTION_DOES_NOT_EXIST();
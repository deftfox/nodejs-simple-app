/**
 * Required External Modules
*/

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { loginRouter } from "./routers/login.router";
import { usersRouter } from "./routers/users.router";
import { groupsRouter } from "./routers/groups.router";
import { userGroupRouter } from "./routers/userGroup.router";
import { errorExampleRouter } from "./routers/errorExample.router";
import { authCheck } from './middleware/authCheck';
import { serviceMethodLogger } from './middleware/serviceMethodLogger';
import { unhandledErrorsHandler } from './middleware/unhandledErrorsHandler';


dotenv.config();

/**
 * App Variables
*/

const app = express();

/**
 *  App Configuration
*/

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(serviceMethodLogger);
app.use(authCheck);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/groups", groupsRouter);
app.use("/api/userGroup", userGroupRouter);
app.use("/api/error", errorExampleRouter)
app.use(unhandledErrorsHandler);

export default app;
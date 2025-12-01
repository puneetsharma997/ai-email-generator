import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import generateRoute from './routes/generateEmail.js';
import usageRoute from './routes/getUsage.js';
import passwordRoute from './routes/updatePassword.js';
import userRoute from './routes/userDetails.js';

dotenv.config();

const app = express();
app.disable("etag");
app.use(cors());
app.use(express.json());

// Register routes
app.use("/generate", generateRoute);
app.use("/usage", usageRoute);
app.use("/user", userRoute);
app.use("/password", passwordRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
})
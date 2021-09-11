import mongoose from 'mongoose';

export default async () => {
  const connString = process.env.MONGO_URI;
  const dbConn = await mongoose.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log('Connected to Database at:', connString.cyan);
  return dbConn;
};

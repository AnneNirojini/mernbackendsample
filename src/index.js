import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models';
import routes from './routes';
import { connectDb } from './models';




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.use(cors());

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch'),
  };
  next();
});
 

// app.get('/users', (req, res) => {
//   return res.send(Object.values(req.context.models.users));
// });
 
// app.get('/users/:userId', (req, res) => {
//   return res.send(req.context.models.users[req.params.userId]);
// });

// app.get('/messages', (req, res) => {
//   return res.send(Object.values(req.context.models.messages));
// });
 
// app.get('/messages/:messageId', (req, res) => {
//   return res.send(req.context.models.messages[req.params.messageId]);
// });

// app.get('/session', (req, res) => {
//   return res.send(req.context.models.users[req.context.me.id]);
// });
 
// app.post('/users', (req, res) => {
//   return res.send('Received a POST HTTP method');
// });

// app.post('/messages', (req, res) => {
//   const id = uuidv4();
//   const message = {
//     id,
//     text: req.body.text,
//     userId: req.context.me.id,
//   };
 
//   req.context.models.messages[id] = message;
 
//   return res.send(message);
// });
 
// app.put('/users/:userId', (req, res) => {
//   return res.send(
//     `PUT HTTP method on user/${req.params.userId} resource`,
//     );
// });
 
// app.delete('/users/userID', (req, res) => {
//   return res.send(
//     `DELETE HTTP method on user/${req.params.userId} resource`,
//     );
// });

// app.delete('/messages/:messageId', (req, res) => {
//   const {
//     [req.params.messageId]: message,
//     ...otherMessages
//   } = req.context.models.messages;
 
//   req.context.models.messages = otherMessages;
 
//   return res.send(message);
// });
 
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
    ]);

    createUsersWithMessages();
  }
 
  app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'rwieruch',
  });

  const user2 = new models.User({
    username: 'ddavids',
  });

  const message1 = new models.Message({
    text: 'Published the Road to learn React',
    user: user1.id,
  });

  const message2 = new models.Message({
    text: 'Happy to release ...',
    user: user2.id,
  });
 
  const message3 = new models.Message({
    text: 'Published a complete ...',
    user: user2.id,
  });
 
  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};


//console.log('Hello ever running Node.js project.');
//console.log(process.env.MY_SECRET);
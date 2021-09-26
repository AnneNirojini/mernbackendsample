import { Router } from 'express';
 
const router = Router();
 
router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});
 
router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});

// userSchema.pre('remove', function(next) {
//   this.model('Message').deleteMany({ user: this._id }, next);
// });
 
export default router;
import { getAllUsers } from '../../../../src/controllers/userController'
import { verifyAPIToken } from '../../../../src/middlewares/authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    await getAllUsers(req, res);
    return
  } else {
    return res.status(405).json({ error: 'Method not allowed' });    
  }
}

export default verifyAPIToken(handler);

import { getAllUsers } from '../../../../src/controllers/userController'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await getAllUsers(req, res);
    return
  } else {
    return res.status(405).json({ error: 'Method not allowed' });    
  }
}

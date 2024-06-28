import { login } from '../../../../src/controllers/authController'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await login(req, res);
    return 
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
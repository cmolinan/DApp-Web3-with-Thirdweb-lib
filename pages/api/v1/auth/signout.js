import { signout } from '../../../../src/controllers/authController'

export default async function handler(req, res) {
  if (req.method === 'POST') {    
    await signout(req, res);    
  } else {
    res.status(405).json({ error: 'Method not allowed' });
    return
  }
}
import { getTransactions } from '../../../../../src/controllers/dappController'
import { verifyAPIToken } from '../../../../../src/middlewares/authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { mode } = req.query;  //'swaps', 'transfers', ('all' is not ready yet)
    await getTransactions(req, res, mode);
    return
  } else {
    return res.status(405).json({ error: 'Method not allowed' });    
  }
}

export default verifyAPIToken(handler);

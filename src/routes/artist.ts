import { Router, Response, Request } from 'express';
import { getArtists } from '../services/artist';

const router = Router();

router.get('/search', async (req: Request, res: Response) : Promise<void> => {
  const filters = req.query;
  if (filters.name) {
    const searchText = String(filters.name);
    if (searchText) {
      await getArtists(searchText, res);
    }
  } else {
    res.status(204).json({
      message: 'Not Found!'
    });
  }
});

const artistRouter = router;

export default artistRouter;

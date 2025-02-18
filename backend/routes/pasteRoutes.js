import express from 'express'
const router = express.Router()
import checkAuth from '../middlewares/authentication.js'; 
import { handleCreatePaste, getAllPastes ,handleUpdatePaste , getPaste, deletePaste} from '../controllers/pasteControllers.js';

router.get('/',checkAuth,getAllPastes);
router.post('/createPaste',checkAuth,handleCreatePaste);
router.put('/updatePaste',checkAuth,handleUpdatePaste);
router.get('/getPaste',checkAuth,getPaste);
router.delete('/deletePaste',checkAuth,deletePaste);

export default router;

import express from 'express'
const router = express.Router()
import checkAuth from '../middlewares/authentication.js'; 
import { handleCreatePaste, getAllPastes ,handleUpdatePaste , getPaste, deletePaste} from '../controllers/pasteControllers.js';

router.get('/',checkAuth,getAllPastes);
router.post('/createPaste',checkAuth,handleCreatePaste);
router.post('/updatePaste',checkAuth,handleUpdatePaste);
router.post('/getPaste',checkAuth,getPaste);
router.post('/deletePaste',checkAuth,deletePaste);

export default router;

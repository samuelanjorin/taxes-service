import { Router } from 'express'
import controller from '../controllers/tax'
import authenticate from '../middlewares/authenticate'

const router = Router()

router.get('/', authenticate.verifyUser, controller.getTaxes())
router.get('/:tax_id', authenticate.verifyUser, controller.getTaxById())


export default router

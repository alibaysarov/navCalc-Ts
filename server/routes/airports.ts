import Router,{Express,Request,Response} from 'express';
import { AirportController } from '../Controllers';

const router:Express=Router()

router.get('/',(req:Request,res:Response)=>{
    res.send("Airports")
})
router.get('/all',AirportController.getAll);
router.get('/:name',AirportController.findByNameOrCode)

export default router;
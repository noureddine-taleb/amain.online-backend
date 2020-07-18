import { Router } from 'express'
import { Bill } from '../controllers/Bill.controllers'
import { Project } from '../controllers/Project.controllers'
import { Payment } from '../controllers/Payment.controllers'
import { User } from '../controllers/User.controllers'

const router = Router()

// -------------------------------------------project CRUD-------------------------------------------
router.get("/projects", Project.getAll)
router.post("/projects", Project.create)

// -------------------------------------------user CRUD-------------------------------------------
router.get("/users", User.getAll)

// -------------------------------------------payment CRUD-------------------------------------------
router.get("/payments", Payment.getAll)
router.post("/payments", Payment.create)

// -------------------------------------------bill CRUD-------------------------------------------
router.get("/bills", Bill.getAll)
router.get("/bills/:id", Bill.getOne)
router.post("/bills", Bill.create)

export default router;
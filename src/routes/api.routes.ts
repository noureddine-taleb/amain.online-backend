import { Router } from 'express'
import { CBill } from '../controllers/Bill.controllers'
import { CProject } from '../controllers/Project.controllers'
import { CPayment } from '../controllers/Payment.controllers'
import { CUser } from '../controllers/User.controllers'
import { userAuth } from '../middlewares/user.middleware'
import { adminAuth } from '../middlewares/admin.middleware'
import { renameUploadedFile } from '../helpers/helpers.helpers'
import { CTreasury } from '../controllers/Treasury.controllers'
import { CReport } from '../controllers/Report.controllers'

const router = Router()

// -------------------------------------------project CRUD-------------------------------------------
router.get("/projects",  userAuth, CProject.getAll)
router.post("/projects",  adminAuth, CProject.create)

// -------------------------------------------user CRUD-------------------------------------------
router.post("/users/session", CUser.login)
router.get("/users/self",  userAuth, CUser.self)
router.post("/users", CUser.create)
router.get("/users",  adminAuth, CUser.getAll)
router.get("/users/:userID/bills",  adminAuth, CUser.bills)
router.get("/users/bills",  userAuth, CUser.bills)
router.post("/users/image", CUser.upload, renameUploadedFile)

// -------------------------------------------payment CRUD-------------------------------------------
router.get("/payments",  adminAuth, CPayment.getAll)
router.post("/payments",  adminAuth, CPayment.create)

// -------------------------------------------bill CRUD-------------------------------------------
router.get("/bills",  adminAuth, CBill.getAll)
router.post("/bills",  adminAuth, CBill.create)

// -------------------------------------------Treasury CRUD-------------------------------------------
router.post("/treasuries", adminAuth, CTreasury.create)

// -------------------------------------------Report CRUD-------------------------------------------
router.get("/reports", userAuth, CReport.getAll)


export default router 
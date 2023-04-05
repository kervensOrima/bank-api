import { Router } from "express";
import { accountsController, customersController, deleteCustomerController, findByCodeCustomerController, getAccountController, saveCurrentAccountController, saveCustomerController, saveSavingAccountController, updateCustomerController } from "./customer.controller";
import { saveSavingAccount } from "./customer.service";

export const router = Router()


/**  save a customer to the database */
router.post('', saveCustomerController)


/** get all customer */
router.get('', customersController)


/** get single record customer */
router.get('/:code/', findByCodeCustomerController)


/** delete one customer by pk */
router.delete('/:pk/', deleteCustomerController)


/** update customer information */
router.put('/:code/', updateCustomerController)


/** create an account of type saving */
router.post('/:code/current/', saveCurrentAccountController)


/** create an account of type saving */
router.post('/:code/saving/', saveSavingAccountController)


/** get list of accounts by page or size */
router.get('/accounts/page/', accountsController)


/**  get an account and some operation by id */
router.get('/accounts/page/:account/', getAccountController)
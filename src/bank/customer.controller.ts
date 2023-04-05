import { Request, Response, } from "express";
import { AccountStatus, AccountType, OperationType } from "@prisma/client"
import { accounts, countAccount, customers, deleteCustomer, findByCode, findByEmailOrCin, findCustomer, getAccount, saveCurrentAccount, saveCustomer, totlaCustomer, updateCustomer } from "./customer.service";
import { apiResponseError, apiResponseSuccess } from "../response/response";
import { saveSavingAccount } from "./customer.service";



export const saveCustomerController = async (req: Request, resp: Response) => {
    const { account, date_of_birth, ...customer } = req.body

    const c = await findByEmailOrCin(customer.cin, customer.email)

    if (c) {
        const message = `${customer.cin} or ${customer.email} already exist!!! try with another`
        return resp.status(402).json(
            apiResponseError(message, false, "cin or email address must be unique!!")
        )
    }
    customer.date_of_birth = new Date(date_of_birth)
    saveCustomer(customer)
        .then(data => {
            console.log(data)
            const message = `${customer.email} has been successfully save in the database`
            return resp.status(201).json(
                apiResponseSuccess(message, true, data)
            )
        })
        .catch(err => {
            const message = `Error occuring while saving customers!!`
            return resp.status(500).json(
                apiResponseError(message, false, err)
            )
        })
}

export const customersController = async (req: Request, resp: Response) => {
    const page = req.query.page ?? 1
    const size = req.query.size ?? 18

    /** get total customer in the datababse */
    const total = await totlaCustomer()

    return customers(Number(page), Number(size))
        .then(customers => {
            const message = `page ${page} of customer has been loading successfully`
            console.dir(customers, { depth: null })
            return resp.status(200).json({
                message: message,
                success: true,
                data: customers,
                pageInfo: {
                    page: page,
                    size: size,
                    total: total
                }
            })
        })
        .catch(err => {
            const message = `Error occuring loading customers!!`
            return resp.status(500).json(
                apiResponseError(message, false, err)
            )
        })

}


export const deleteCustomerController = async (req: Request, resp: Response) => {
    const pk: string = req.params.pk
    /** check the customer exist in the database before deleting */
    findByCode(pk)
        .then(customer => {

            if (!customer) {
                const message = `Customer with ${pk} not found!!!`
                return resp.status(404).json(
                    apiResponseError(message, false, 'customer not found!!!')
                )
            }
            return deleteCustomer(pk)
                .then(() => {
                    const message = `customer with ${pk} has been delete successfully!!`
                    return resp.status(204).json(apiResponseSuccess(message, true, customer))
                })

        })
        .catch(err => {
            const message = `Error occuring deleting customers!!`
            return resp.status(500).json(
                apiResponseError(message, false, err)
            )
        })

}


export const updateCustomerController = async (req: Request, resp: Response) => {
    const code: string = req.params.code
    const { account, ...requestDTO } = req.body

    const customer = await findByCode(code)

    if (customer === null) {
        const message = `Customer with ${code} not found!!!`
        return resp.status(404).json(
            apiResponseError(message, false, 'customer not found!!!')
        )
    }
    /** update the customer if he / she exists */
    updateCustomer(requestDTO, code)
        .then(customer => {
            const message = `customer with ${code} has been update successfully!!`
            return resp.status(200).json(apiResponseSuccess(message, true, customer))
        })
        .catch(err => {
            const message = `Error occuring updating customer!!`
            return resp.status(500).json(
                apiResponseError(message, false, err)
            )
        })

}


export const findByCodeCustomerController = (req: Request, resp: Response) => {
    const code: string = req.params.code
    const page = req.query.page ?? 1
    const size = req.query.size ?? 5

    findCustomer(code, Number(page), Number(size)).then(customer => {
        if (!customer) {
            const message = `Customer with ${code} not found!!!`
            return resp.status(404).json(
                apiResponseError(message, false, 'customer not found!!!')
            )
        }
        const message = `customer with ${code} has been update successfully!!`
        return resp.status(200).json(apiResponseSuccess(message, true, customer))
    })
        .catch(err => {
            const message = `Error occuring loading customer with pk : ${code}!!`
            return resp.status(500).json(
                apiResponseError(message, false, err)
            )
        })

}


export const saveCurrentAccountController = async (req: Request, resp: Response) => {
    const customer_pk: string = req.params.code
    const requestDTO = req.body

    requestDTO.account_type = AccountType.CURRENT

    const customer = await findByCode(customer_pk)

    if (customer === null) {
        const message = `Customer with ${customer_pk} not found!!!`
        return resp.status(404).json(
            apiResponseError(message, false, 'customer not found!!!')
        )
    }
    /** create account saving */
    saveCurrentAccount(requestDTO)
        .then(account => {
            const message = `customer with ${customer_pk} has been create an  current account successfully!!`
            return resp.status(200).json(apiResponseSuccess(message, true, account))
        })
        .catch(err => {
            const message = `Error occuring saving current acoount for customer with pk : ${customer_pk}!!`
            return resp.status(500).json(
                apiResponseError(message, false, err)
            )
        })
}


export const saveSavingAccountController = async (req: Request, resp: Response) => {
    const customer_pk: string = req.params.code
    const requestDTO = req.body

    requestDTO.account_type = AccountType.SAVING

    const customer = await findByCode(customer_pk)

    if (customer === null) {
        const message = `Customer with ${customer_pk} not found!!!`
        return resp.status(404).json(
            apiResponseError(message, false, 'customer not found!!!')
        )
    }

    saveSavingAccount(requestDTO)
        .then(account => {
            const message = `customer with ${customer_pk} has been create an  saving account successfully!!`
            return resp.status(200).json(apiResponseSuccess(message, true, account))
        })
        .catch(err => {
            const message = `Error occuring saving saving account for customer with pk : ${customer_pk}!!`
            return resp.status(500).json(
                apiResponseError(message, false, err)
            )
        })

}


export const accountsController = async (req: Request, resp: Response) => {
    const page = req.query.page ?? 1
    const size = req.query.size ?? 18

    /** get total account */
    const totalAccount = await countAccount()

    accounts(Number(page), Number(size))
        .then(accounts => {
            const message = `List of account has been loading successfully`
            return resp.status(200).json({
                message: message,
                success: true,
                data: accounts,
                pageInfo: {
                    page: page,
                    size: size,
                    total: totalAccount
                }
            })
        })
        .catch(err => {
            const message = `Error while loading account list`
            return resp.status(500).json(
                apiResponseError(message, false, err)
            )
        })

}


export const getAccountController = async (req: Request, resp: Response) => {
    const account_pk: string = req.params.account
    const page = req.query.page ?? 1
    const size = req.query.size ?? 18

    getAccount(account_pk, Number(page), Number(size))
        .then(account => {
            const message = `account with ${account_pk} has been loading successfully`
            return resp.status(200).json({
                message: message,
                success: true,
                data: account,
                pageInfo: {
                    page: page,
                    size: size,
                }
            })
        })
        .catch(err => {
            const message = `Error while loading account list`
            return resp.status(500).json(
                apiResponseError(message, false, err)
            )
        })
}
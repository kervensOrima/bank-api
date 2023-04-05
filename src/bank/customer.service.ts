
import { prisma } from '../config/app.config'


export const saveCustomer = (requestDTO: any) => {
    // requestDTO.email = requestDTO.email.toLowerCase()

    return prisma.customer.create({
        data: requestDTO,
        include: {
            accounts: true,
            _count: true
        }
    })
        .catch(err => {
            console.dir(err, { depth: null })
        })
}

export const findByEmailOrCin = (cin: string, email: string) => {
    // email = email.toLowerCase()
    return prisma.customer.findFirst({
        where: {
            OR: [
                { cin: cin },
                { email: email }
            ]
        }
    })
}

export const findByCode = (code: string) => {
    return prisma.customer.findFirst({
        where: {
            code: code
        }
    })
}

export const updateCustomer = (requestDTO: any, code: string) => {
    return prisma.customer.update({
        where: { code: code },
        data: requestDTO,
        include: {
            accounts: true
        }
    })
}


export const deleteCustomer = (id: string): any => {
    return prisma.customer.delete({
        where: {
            code: id
        }
    })
}

export const findCustomer = (id: string, page: number, size: number = 5) => {
    return prisma.customer.findUnique({
        where: {
            code: id
        },
        include: {
            accounts: {
                skip: page,
                take: size,
                orderBy: {
                    balance: 'asc'
                }
            },
            _count: true
        }

    })
}

export const saveCurrentAccount = (reqDTO: any) => {
    return prisma.account.create({
        select: {
            id: true,
            account_type: true,
            balance: true,
            created_at: true,
            updated_at: true,
            over_draft: true,
            status: true,
            owner: true,
            operations: {
                skip: 1,
                take: 10,
                orderBy: {
                    type: 'asc'
                }
            }
        },
        data: reqDTO,
    })
        .catch(err => {

            console.log(err)
        })
}

export const saveSavingAccount = (reqDTO: any) => {
    return prisma.account.create({
        select: {
            id: true,
            account_type: true,
            balance: true,
            created_at: true,
            updated_at: true,
            interested_rate: true,
            status: true,
            owner: true,
            operations: {
                skip: 1,
                take: 10,
                orderBy: {
                    type: 'asc'
                }
            }
        },
        data: reqDTO,
    })
        .catch(err => {

            console.log(err)
        })
}

export const totlaCustomer = (): Promise<number> => {
    return prisma.customer.count()
}

export const customers = (page: number, size: number = 18) => {
    return prisma.customer.findMany({
        orderBy: {
            date_of_birth: 'asc'
        },
        include: {
            accounts: true,
        },
        skip: page,
        take: size
    })
        .then(customers => {
            return customers
        })
        .catch(err => {
            return err
        })

}

export const accounts = (page: number, size: number = 18) => {
    return prisma.account.findMany({
        skip: page,
        take: size,
        include: {
            owner: true,
            _count: true
        }
    })
}

export const countAccount = () => {
    return prisma.account.count()
}

export const getAccount = (account_pk: string, page: number, size: number = 18) => {
    return prisma.account.findUnique({
        where: { id: account_pk },
        select: {
            id: true,
            created_at: true,
            updated_at: true,
            interested_rate: true,
            over_draft: true,
            status: true,
            account_type: true,
            balance: true,
            _count: true,
            operations: {
                skip: page,
                take: size,
                orderBy: {
                    amount: 'desc'
                }
            },
        }
    })
}



export const debit = () => {

}

export const credit = () => {

}

export const transfert = () => {

}

export const accountHistory = (page: number, size: number) => {

}



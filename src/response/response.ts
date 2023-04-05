

export const apiResponseError = (message: string, success: boolean, error: any) => {
    return {
        message,
        success,
        error,
        timestamp: new Date()
    }
}


export const apiResponseSuccess = (message: string, success: boolean, data: any) => {
    return {
        message,
        success,
        data,
        timestamp: new Date()
    }

}



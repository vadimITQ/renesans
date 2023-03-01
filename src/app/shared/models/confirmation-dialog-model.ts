

export interface ConfirmationDialogModel {
    message: string,
    header: string,
    accept: {
        label: string,
        handler?: () => any,
    },
    reject: {
        label: string,
        handler?: () => any,
    }
};
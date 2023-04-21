
export interface ErrorMesssagesList {
    [key: string]: string;
}

export const messages = {
    formControlMessages: {
        global: {
            required: "Поле обязательно к заполнению",
            email: "Email введён некорректно"
        },
        peInput: {

        }
    },
    formGroupMessages: {
        global: {
            required: "Заполните обязательные поля"
        }
    }
};
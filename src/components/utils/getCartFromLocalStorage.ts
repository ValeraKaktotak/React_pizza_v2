//парсим и отправляем данные с локалсторедж в редакс картстейт
export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('pizzaCart')
    if(data){
        const json = JSON.parse(data)
        return json
    }
    return []
} 
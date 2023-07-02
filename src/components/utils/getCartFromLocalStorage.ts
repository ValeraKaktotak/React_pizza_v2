//парсим и отправляем данные с локалсторедж в редакс картстейт
export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('pizzaCart')
    if(data){
        const json = JSON.parse(data)
        return json.items
    }
    return []
} 
export const  getTotalCostFromLocalStorage = () => {
    const data = localStorage.getItem('pizzaCart')
    if(data){
        const json = JSON.parse(data)
        return json.totalCoast
    }
    return 0
}
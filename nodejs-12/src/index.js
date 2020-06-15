const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK']

function getShoppingCart(ids, productsList) {
	const productsFilter = productsList.filter(product => ids.includes(product.id))

    const products = productsFilter.map(product => {return {name: product.name, category: product.category}})

    const categories = productsFilter.map(product => product.category)  
    
    const countedCategories = categories.reduce((allCategories, category) => { 
        if (category in allCategories) {
            allCategories[category]++
        } else {
            allCategories[category] = 1
        }
        return allCategories
    }, {})

    const countedCategoriesLength = Object.keys(countedCategories).length
    
    const promotion = promotions[countedCategoriesLength -1] 

    const regularPrice = (productsFilter.map(product => product.regularPrice).reduce((ac, cv) => ac + cv)).toFixed(2)
    
    const price = []
    const total = (productsFilter.map((product, i) => {
        
        product.promotions.forEach(promo => {
            if(promo.looks.includes(promotion)) return price.push(promo.price)
        })

        if (price.length < i +1 ) price.push(product.regularPrice)

    }))
    
    const totalPrice = price.reduce((ac, cv) => ac + cv).toFixed(2)

    const discountValue = (regularPrice - totalPrice).toFixed(2) 

    const discount = ((discountValue / regularPrice) * 100).toFixed(2) + '%'    

    return {products, promotion, totalPrice, discountValue,  discount}
}

module.exports = { getShoppingCart }

interface TotalPrice {
	price: number;
	discount?: number;
	isInstallment?: boolean;
	months?: number;
}

// для типизации используем интерфейс TotalPrice
const totalPrice = ({
	price,
	discount = 0,
	isInstallment,
	months = 12,
}: TotalPrice): number => {
	// если дисконт есть, то приводим к десятичному числу, удобному для дальнейшего расчета
	if (discount > 1) {
		discount = discount / 100;
	}

	// считаем дисконтированный прайс
	const discountedPrice = price - price * discount;

	// в зависимости есть ли флага рассрочки возвращаем либо итоговый прайс с рассрочкой иначе дисконтированный прайс
	return isInstallment ? discountedPrice / months : discountedPrice;
};

const price = totalPrice({
	price: 100000,
	discount: 25,
	isInstallment: true,
	months: 12,
});
console.log(price); // 6250

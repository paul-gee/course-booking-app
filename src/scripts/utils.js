
export function formatPrice (price) {
	return price.toLocaleString(undefined, { style: 'currency', currency: 'PHP' });
}

const dateFormat = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

export const formatDate = (isoDate) => {
	return new Date(isoDate).toLocaleString('en-PH', dateFormat);
}
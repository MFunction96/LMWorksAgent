export function formatNumber(num: number, length: number): string {
	const tmp = num.toString();
	if (tmp.length >= length) return tmp;
	const zero = length - tmp.length;
	let str = "";
	for (let i = 0; i < zero; ++i) {
		str += "0";
	}
	str += tmp;
	return str;
}

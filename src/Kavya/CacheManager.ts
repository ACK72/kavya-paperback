export class CacheManager {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	private cachedData: { [key: string]: { time: Date, data: any } };

	constructor() {
		this.cachedData = {};
	}

	getHash(str: string) {
		let hash = 0
		let chr;

		for (let i = 0;i < str.length;i++) {
			chr = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		
		return hash;
	}

	getCachedData(str: string) {
		const time = new Date();
		const key = this.getHash(str);

		this.cachedData = Object.fromEntries(
  			Object.entries(this.cachedData).filter(
				([key, value]) => 0 < (time.getTime() - value.time.getTime()) && (time.getTime() - value.time.getTime()) < 180 * 1000
			)
		);

		return this.cachedData[key]?.data;
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	setCachedData(str: string, data: any) {
		this.cachedData[this.getHash(str)] = { time: new Date(), data: data };
	}
}
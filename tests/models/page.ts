export default class Page {
    /**
     * Open
     * @param {string} path
     * @return {Promise<void>}
     */
    async open(path: string): Promise<void> {
        const _path = (process.env.ENV === 'production') ?
        `https://weather-app-pro-v3mp.onrender.com/${path}` :
        `http://localhost:3000/${path}`

        const currUrl = await browser.getUrl();

        if (currUrl === _path) return;

        await browser.url(_path)
    }
}

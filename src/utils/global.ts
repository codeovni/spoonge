/**
 * Global utils class
 *
 * @export
 * @class Global
 */
export default class Global {
    /**
     * Genera un número aleatorio
     *
     * @param {number} length
     * @returns {number}
     * @memberof Global
     */
    randomNumber(length:number) {
        var result           = '';
        var characters       = '123456789';
        var charactersLength = characters.length;
        for(var i=0;i<length;i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return parseInt(result);
    }
}
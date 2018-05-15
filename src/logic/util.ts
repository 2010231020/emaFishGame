// TypeScript file

class Util {
    public constructor() {
    }
    public static getUrlParams(name: string): string {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        return r != null ? r[2] : null;
    }
    public static getCookie(name: string): string {
        let cookie_name = name + "=";
        let cookie_length = document.cookie.length;
        let cookie_begin = 0;
        while (cookie_begin < cookie_length) {
            let value_begin = cookie_begin + cookie_name.length;
            if (document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
                var value_end = document.cookie.indexOf(";", value_begin);
                if (value_end == -1) {
                    value_end = cookie_length;
                }
                return decodeURIComponent(decodeURIComponent(document.cookie.substring(value_begin, value_end)));
            }
            cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1;
            if (cookie_begin == 0) {
                break;
            }
        }
        return null;
    }


    public static getImg(gene: string): string {
        //缩略图图片服务器
        let returnStr = '';
        let process_json = RES.getRes('process_json');
        let imgHost = process_json[process_json["env"]]["imgHost"];
        let geneDictionary = {
            "1": "FP",
            "2": "FG",
            "3": "FB",
            "4": "FW",
            "5": "FY",
            "6": "FR"
        };
        if (gene) {
            let geneArray = gene.split(',');
            returnStr = `${imgHost}/${geneDictionary[geneArray[0]]}-ba_${geneArray[2]}-bo_${geneArray[1]}-e_1-s_${geneArray[4]}-t_${geneArray[5]}-w_${geneArray[3]}.png`;
        }
        return returnStr;
    }

    public static DEC = { D1: 5, D2: 8, D3: 11 };
}
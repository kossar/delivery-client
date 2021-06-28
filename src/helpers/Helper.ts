import jwtDecode from "jwt-decode";

export class Helper {
    static getUserIdFromToken(token: string): string | undefined{
        const tokenMap = new Map<string, string>(
            Object.entries(jwtDecode(token))
        );
        const userId: string | undefined = tokenMap.get(
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        );
        if (userId !== undefined) {
            return userId;
        }
        return undefined;
    }

    static formatDateTime(time?: string): string{
        console.log(time);
        if(time === null || time === undefined){
            return "---";
        }

        if(time != null && time.includes('T')){
            return time.split("T")[0] + " " + time.split("T")[1];
        }
        
        return time;
        
    }
}
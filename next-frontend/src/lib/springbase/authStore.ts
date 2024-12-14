import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default class AuthStore {
    public token: string | undefined;
    public model: any | undefined;
    public isValid: boolean = false;
    public isAdmin: boolean = false;

    constructor() {
        this.token = ""
        this.model = {}
        this.isValid = false;
        this.isAdmin = false;
    }

    loadFromStorage() {
        const springbase_auth = localStorage.getItem('springbase_auth');
        if (springbase_auth) {
            this.token = springbase_auth;
            const model: any = jwtDecode(this.token as string);
            this.model = {
                id: model.id,
                email: model.email,
                name: model.name,
                avatar: model.avatar,
                username: model.sub
            }
            this.isValid = this.checkTokenValidity();
            this.isAdmin = this.model?.roles?.includes('ROLES_ADMIN');
        }
        else{
            this.token = undefined;
            this.model = undefined;
            this.isValid = false;
            this.isAdmin = false;
        }
    }

    loadFromToken(token: string) {
        if(!token) return;
        this.token = token;
        try {
            this.isValid = this.checkTokenValidity();
            if(!this.isValid) throw new Error("JWT invalid");
            const model: any = jwtDecode(this.token as string);
            this.model = {
                id: model.id,
                email: model.email,
                name: model.name,
                avatar: model.avatar,
                username: model.sub
            }
        } catch (e) {
            console.error('Invalid token or decoding failed', e);
            this.isValid = false;
            this.model = undefined;
            this.isAdmin = false;
        }
    }

    private checkTokenValidity(): boolean {
        const decoded = jwtDecode(this.token as string);
        if (!decoded) return false;
        const exp = decoded.exp ? new Date(decoded.exp * 1000) : new Date(0);
        return exp > new Date();
    }

    exportToCookie(options?: {
        expires?: string,
        path?: string,
        domain?: string,
        secure?: boolean,
        httpOnly?: boolean,
        maxAge?: number,
        sameSite?: string
    }) {
        if (!this.token) return;

        let cookie = `token=${this.token};`;

        if (options) {
            if (options.expires) {
                cookie += ` expires=${options.expires};`;
            }
            if (options.path) {
                cookie += ` path=${options.path};`;
            }
            if (options.domain) {
                cookie += ` domain=${options.domain};`;
            }
            if (options.secure) {
                cookie += ` secure;`;
            }
            if (options.httpOnly) {
                cookie += ` HttpOnly;`;
            }
            if (options.maxAge) {
                cookie += ` max-age=${options.maxAge};`;
            }
            if (options.sameSite) {
                cookie += ` SameSite=${options.sameSite};`;
            }
        }
        return cookie;
    }

    save(expires?: number) {
        Cookies.set("token", this.token ? this.token : "", {
            expires: expires ? expires : 30
         });
    }

    clear() {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        this.token = undefined;
        this.model = undefined;
        this.isValid = false;
        this.isAdmin = false;
        localStorage.removeItem('springbase_auth');
    }
}

import Cookies from 'universal-cookie';


const cookies = new Cookies();

class AppContext {

    

    getLoginInfo() {
        const userName =cookies.get('userName');
        const userId =cookies.get('userId');
        const accessToken =cookies.get('accessToken');
        if(userName==null || userId==null || accessToken==null){
            return null;       
        }
        return {userName,userId,accessToken};
    }

    clearLoginInfo(){
        cookies.remove('userName');
        cookies.remove('accessToken');
        cookies.remove('userId');
    }

    saveLoginInfo(loginInfo) {
        const { userName, userId, accessToken } = loginInfo;
        this._saveItem('userName',userName);
        this._saveItem('accessToken',accessToken);
        this._saveItem('userId',userId);
    }

    _saveItem(name, value, expireHours = 24) {
        if (cookies.get(name) == null) {
            let expires = new Date();
           // expires.setHours(expires.getHours() + expireHours); //过期处理没必要放在客户端验证，而应该是服务端
            cookies.set(name, value, { path: '/' });
        }
    }


}

export const appContext = new AppContext();
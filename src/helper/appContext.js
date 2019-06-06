import Cookies from 'universal-cookie';


const cookies = new Cookies();

class AppContext {

    

    getLoginInfo() {
        const userName =cookies.get('userName');
        const userId =cookies.get('userId');
        const accessToken =cookies.get('accessToken');
        if(userName==null || userId==null || accessToken==null){
            console.log('faile');
            return null;       
        }
     console.log(accessToken+'dddd');
        return {userName,userId,accessToken};
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
            expires.setHours(expires.getHours() + expireHours);
            cookies.set(name, value, { path: '/', expires });
        }
    }


}

export const appContext = new AppContext();
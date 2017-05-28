/**
 * Created by ben on 2017/5/28.
 */
module.exports = app => {
     class HomeService extends app.Service {
        * find(userId) {
            const user = yield app.mysql.get('blog_user', {
                id: userId
            });
            return {user};
        }
    }
    return HomeService;
}
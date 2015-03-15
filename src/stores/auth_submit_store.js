import Reflux from 'reflux';
import AuthActions from 'actions/auth_actions';

export default Reflux.createStore({
  listenables: AuthActions,

  init: function () {
    this.message = '';
  },

  onSubmitError: function (resp) {
    console.log(resp);
    var body = resp.entity;
    this.message = 'This is embarasing... Looks like we are having technical difficulties, try again later.';
    if (typeof body === 'object' && body.reason) {
      this.message = body.reason;
    }
    this.trigger(this.message);
  }
});

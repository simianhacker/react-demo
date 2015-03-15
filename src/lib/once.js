export default function (action, method, ...args) {
  return new Promise(function (resolve, reject) {

    var unsubCompleted = action[method].completed.listen(function (resp) {
      unsubCompleted();
      unsubFailed();
      resolve(resp);
    });

    var unsubFailed = action[method].failed.listen(function (resp) {
      unsubCompleted();
      unsubFailed();
      reject(resp);
    });

    action[method].apply(action, args);
     
  });
}
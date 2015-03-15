class TransitionError extends Error {
  constructor (route) {
    super('Transition rejected, redirected to ' + route);
    this.route = route;
  }
}

export default TransitionError;

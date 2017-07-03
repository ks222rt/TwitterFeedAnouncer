const tweetReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TWEETS':
      return [
        ...state,
        ...action.tweets
      ];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default tweetReducer;
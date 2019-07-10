import { get } from 'micro-dash';

export const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export const getUsername = user => {
  const { profile } = user;
  if (!profile) {
    return '';
  }
  let name;
  name = get(profile, ['given_name'])
    ? profile.given_name
    : get(profile, 'name');
  return name;
};

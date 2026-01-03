const { User, Profile } = require('../../../../database/models');

// Get logged-in user's profile
exports.getMyProfile = async (userId) => {
  const profile = await Profile.findOne({
    where: { userId },
    include: {
      model: User,
      attributes: ['id', 'employeeId', 'name', 'email', 'role']
    }
  });

  return profile;
};

// Update logged-in user's profile
exports.updateMyProfile = async (userId, data) => {
  const profile = await Profile.findOne({ where: { userId } });

  if (!profile) {
    throw new Error('PROFILE_NOT_FOUND');
  }

  await profile.update(data);
  return profile;
};

// Admin get any employee profile by userId
exports.getProfileByUserId = async (userId) => {
  const profile = await Profile.findOne({
    where: { userId },
    include: {
      model: User,
      attributes: ['id', 'employeeId', 'name', 'email', 'role']
    }
  });

  if (!profile) {
    throw new Error('PROFILE_NOT_FOUND');
  }

  return profile;
};

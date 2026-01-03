const profileService = require('../services/profileServices');

// Employee able view own profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await profileService.getMyProfile(req.user.id);
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

// Employee able update own profile
exports.updateMyProfile = async (req, res) => {
  try {
    const profile = await profileService.updateMyProfile(req.user.id, req.body);
    return res.status(200).json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (err) {
    if (err.message === 'PROFILE_NOT_FOUND') {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.status(500).json({ message: 'Profile update failed' });
  }
};

// Admin able view any employee profile
exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.params.userId);
    return res.status(200).json(profile);
  } catch (err) {
    if (err.message === 'PROFILE_NOT_FOUND') {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

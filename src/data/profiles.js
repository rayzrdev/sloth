const PouchDB = require('pouchdb');
const db = new PouchDB('http://127.0.0.1:5984/profiles');

const createProfile = async (id, options = {}) => {
    const profileOptions = Object.assign({
        _id: id,
        money: 0,
        xp: 0,
        friends: []
    }, options);

    console.log('Created...');
    const response = await db.put(profileOptions);
    console.log('Response: ' + response);
    if (response.ok) {
        return profileOptions;
    }
};

const getProfile = async id => {
    try {
        return await db.get(id);
    } catch (err) {
        // Just return undefined if the profile isn't found
        if (err.status !== 404) {
            throw err;
        }
    }
};

const getOrCreateProfile = async (id, options = {}) => {
    let profile = await getProfile(id);
    if (!profile) {
        profile = await createProfile(id, options);
    }
    return profile;
};

const updateProfile = async (id, changes) => {
    const profile = await getOrCreateProfile(id);

    const updateData = Object.assign({
        _id: id,
        _rev: profile._rev
    }, changes);

    return await db.put(updateData);
};

module.exports = { createProfile, getProfile, getOrCreateProfile, updateProfile };

const { Markers } = require('../models');

module.exports = {
  /**
   * Create new marker
   * @param {string} markerName
   * @returns {Promise}
   */
  createMarker: (markerName) => {
    return Markers.create({ name: markerName });
  },

  /**
   * Get a marker by name
   * @param {string} markerName
   * @returns {Promise}
   */
  getMarkerByName: (markerName) => {
    return Markers.findOne({ name: new RegExp(markerName, 'ig') });
  },

  getAllMarkers: () => {
    return Markers.find()
      .select({ __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']]);
  },

  /**
   * Get marker by markerId
   * @param {string} markerId
   * @returns {Promise}
   */
  getMarkerById: (markerId) => {
    return Markers.findById(markerId).select({ __v: 0, updatedAt: 0 });
  },

  /**
   * Update marker
   * @param {string} markerId
   * @param {any} changes
   * @returns {Promise}
   */
  updateMarker: (markerId, changes) => {
    return Markers.findByIdAndUpdate(markerId, changes, { new: true }).select({
      __v: 0,
      updatedAt: 0,
    });
  },

  /**
   * Update marker
   * @param {string} markerId
   * @returns {Promise}
   */
  deleteMarker: (markerId) => {
    return Markers.deleteOne({ _id: markerId });
  },
};

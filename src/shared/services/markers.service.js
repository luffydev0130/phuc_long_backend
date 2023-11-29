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
    return Markers.find().sort([['createdAt', 'desc']]);
  },
};
